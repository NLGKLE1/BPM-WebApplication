define([
    'resources/dataControls/pr', 
    'resources/dataControls/rk', 
    'resources/dataControls/rd', 
    'resources/dataControls/common',
    'resources/dataControls/tm', 
    'resources/dataControls/pl', 
    'resources/dataControls/bd', 
    'resources/dataControls/sc',
    'resources/dataControls/scv2', 
    'resources/dataControls/bd_pl', 
    'resources/dataControls/ae',
    'resources/dataControls/cb'
],
    function (pr, rk, rd, common, tm, pl, bd, sc, scv2, bd_pl, ae, cb) {
        return {
            pr: function () {
                return pr;
            },
            rk: function () {
                return rk;
            },
            rd: function () {
                return rd;
            },
            common: function () {
                return common;
            },
            tm: function () {
                return tm;
            },
            pl: function () {
                return pl;
            },
            bd: function () {
                return bd;
            },
            sc: function () {
                return sc;
            },
            scv2: function () {
                return scv2;
            },
            bd_pl: function () {
                return bd_pl;
            },
            ae: function () {
                return ae;
            },
            cb: function() {
                return cb;
            }
        };
    });
