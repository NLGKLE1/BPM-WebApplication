/**
 * ojMapper
 * 
 * An mapping mechanism for Knockout Models
 * 
 * @author PTALIM1
 */
define([
    'ojet',
    'jquery',
    'knockout'
], function(ojet, $, ko) {
    /**
     * Define maps for each observable one
     */
    ko.observable.fn.mapper = function(options, secondOption) {
        if(isString(options)) {
            this._mapper_ = {
                in: options, out: options, defaultIn: secondOption, defaultOut: secondOption
            }
        } else {
            this._mapper_ = ko.utils.extend({
                in: null, out: null, defaultIn: null, defaultOut: null
            }, options);
        }

        return this;
    }

    /**
     * Check if it's a string
     * @param {*} str 
     */
    function isString(str) {
        return typeof str === 'string' || str instanceof String; 
    }
    
    /**
     * Check if it's undefined
     * @param {*} obj 
     */
    function isUndefined(obj) {
        return typeof obj === 'undefined'; 
    }

    /**
     * Throws an error if property doesn't exist, but if it exists, 
     * it will return its value
     * 
     * @param {*} obj 
     * @param {String} key 
     */
    function getAndCheckPropertyExist(obj, key) {
        if(key in obj) {
            let value = obj[key];
            return value;
        } else {
            console.warn("The property your trying to map doesn't exist. In the object:", obj, " the key <", key, "> could not be found");
        }
    }

    /**
     * Mapper
     * 
     * @param {*} mappingConfig 
     */
    function Mapper(mappingConfig) {
        this.map = function(target, data) {
            for(let key in  target) {
                let info = target[key]._mapper_ || {};

                let observable = target[key];
                let value = undefined;
    
                if(isString(info.in)) {
                    value = getAndCheckPropertyExist(data, info.in);
                    observable(value || info.defaultIn);
                } else if($.isFunction(info.in)) {
                    value = info.in(data, key) ;
                    observable(value || info.defaultIn);
                }
            }
    
            return target;
        }
    
        this.unmap = function(source, optionalData) {
            let data = optionalData || {};
            for(let key in source) {
                let info = source[key]._mapper_ || {};
    
                let property = { key: '', value: undefined };
    
                if(isString(info.out)) {
                    property.key = info.out;
                    property.value = ko.unwrap(source[key]);

                    data[property.key] = property.value || info.defaultOut;
                } else if($.isFunction(info.out)) {
                    property = info.out(ko.unwrap(source[key]), source, key);

                    data[property.key] = property.value || info.defaultOut;
                }
            }
            return data;
        }
    }
    
    /**
     * Mapper Factory
     */
    ojet.createMapper = function(config) {
        let finalConfig = ko.utils.extend(ojet.createMapper.defaultConfig, config);
        return new Mapper(finalConfig);
    }

    /** Global Defaults */
    ojet.createMapper.defaultConfig = {
        unmap: {},
        map: {}
    }

    /** Global Mapper Instance */
    ojet.mapper = ojet.createMapper();
});