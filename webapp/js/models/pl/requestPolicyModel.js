define(['models/pl/requestPolicyMapping', 'models/pl/requestPolicyAPI'], function (Mapper, API) {

    function Intermediary() {
        const self = this;
        self.commissionRate = ojet.createInput(Number());
        self.partyRole = ojet.createInput('INT')
        self.party = ojet.createInput(new Party);
        self.isDeleted = ojet.createInput(false);
        self.isNew = ojet.createInput(true);
    }

    Intermediary.prototype.map =  function(data){
        const self = this;
        // self.id(data.party_id);
        self.party(new Party);
        self.party().partyId(data.party_id);
        self.partyRole(data.party_role)
        self.commissionRate(data.comission_rate);
    }

    Intermediary.prototype.unmap = function(){
        const self = this;
        const data = {}
        data.party_id = self.party().partyId()
        data.commission_rate = self.commissionRate();
        data.party_role = self.partyRole();

        return data;
    }

    function PartyCompanyInfo() {
        const self = this;
        self.status = ojet.createInput(String());
        self.country = ojet.createInput(String());
        self.roles = ojet.createInput(String());
        self.nace = ojet.createInput(String());
        self.legacy = ojet.createInput(String());
    }

    function PartyAddress() {
        const self = this;
        self.mainAddress = ojet.createInput(String());
    }

    function PartyContacts() {
        const self = this;
        self.phone = ojet.createInput(String());
        self.email = ojet.createInput(String());
        self.website = ojet.createInput(String());
    }

    function PartyPolicy() {
        const self = this;
        self.policyId = ojet.createInput(Number());
        self.policyStatus = ojet.createInput(String());
    }

    function PartyExternalIdentificationCodes() {
        const self = this;
        self.fiscalCode = ojet.createInput(Number());
        self.companyRegistrationNumber = ojet.createInput(Number());
    }

    function Party() {
        const self = this;
        self.name = ojet.createInput(String());
        self.partyId = ojet.createInput(Number());
        self.rating = ojet.createInput(Number());
        self.risk = ojet.createInput(Number());

        self.companyInfo = new PartyCompanyInfo();
        self.externalIdentificationCodes = new PartyExternalIdentificationCodes();
        self.address = new PartyAddress();
        self.contacts = new PartyContacts();
        self.policy = new PartyPolicy();
    }

    function Bond() {
        const self = this;
        self.bondType = ojet.createInput(String());
        self.amount = ojet.createInput(Number());
        self.amountCurrency = ojet.createInput(Number());
    }

    function ReferenceDataCurrency() {
        const self = this;
        self.currencyCode = ojet.createInput(String());
        self.languageCode = ojet.createInput(String());
    }

    function RequestModel() {
        const self = this;
        //----- ON SCOPE -----
        self.organizationId = ojet.createInput(Number());
        self.requestId = ojet.createInput(String());
        self.taskId = ojet.createInput(String());

        self.expiryDate = ojet.createInput(String());
        self.requestType = ojet.createInput(String());

        self.salesPersonId = ojet.createInput(String());
        self.requestedById = ojet.createInput(String());
        self.descriptionOfNeed = ojet.createInput(String());
        self.amount = ojet.createInput(Number());
        self.amountCurrency = ojet.createInput(Number());
        self.salesChannel = ojet.createInput(String());
        self.salesPersonId = ojet.createInput(String());
        //---------------------
        self.amountCurrencyOptions = ojet.createArray();
        //---------------------

        /**
         * The next fields goes out of scope FD 2.5
         */
        self.bondList = ojet.createArray([new Bond()]);
        self.addNewBond = function () {
            self.bondList.push(new Bond());
        }
        self.removeBond = function (bond) {
            self.bondList.remove(bond);
        }
        self.removeAllBonds = function () {
            self.bondList.removeAll();
        }

        self.party = new Party();
        self.requestedAmounts = ojet.createArray();
        self.type = ojet.createInput(String());

        self.isPublicSector = ojet.createInput(Boolean());
        self.isPrivateSector = ojet.createInput(Boolean());
        self.isDomesticSector = ojet.createInput(Boolean());
        self.isForeignSector = ojet.createInput(Boolean());

        self.additionalComments = ojet.createInput(String());

        /**
         * 
         * @param {*} request
         * @param {RequestModel} model
         */
        function mapRequest(request, model) {
            model.organizationId(request.organization_id);
            model.salesPersonId(request.sales_person_id);
            model.requestedById(request.requested_by_id);
            model.descriptionOfNeed(request.description);
            model.amount(Number(request.amount));
            model.salesChannel(request.sales_channel);
            model.salesPersonId(request.sales_person_id);
            model.expiryDate(new Date(request.expiry_date));
            model.amountCurrency(request.currency_code);
            model.requestType(request.request_type);

            return model;
        }

        /**
         * 
         * @param {RequestModel} model
         * @param {*} target
         */
        function unmapRequest(model, target) {
            target = target || {};
            
            target.organization_id = Number(model.organizationId());
            target.requested_by_id = String(model.requestedById() || ojet.getUserContext().loggedInUserName);
            target.description = String(model.descriptionOfNeed());
            target.amount = Number(model.amount());
            target.sales_channel = String(model.salesChannel() || "INT");
            target.sales_person_id = String(model.salesPersonId() || ojet.getUserContext().loggedInUserName);
            target.expiry_date = String((model.expiryDate() || new Date()).toISOString());
            target.currency_code = String(model.amountCurrency());
            target.request_type = String(model.requestType() || "POLICYREQUEST");

            return target;
        }

        let lastLoaded = null;

        self.loadData = function (id) {
            return new Promise(function (resolve, reject) {
                API.getRequest(id).then(function (data) {
                    let requests = data.data.results.Requests || [];
                    let request = requests[0];

                    if (!request) throw new Error("[Atradius] No request object was retrieved from server to load RequestModel");

                    mapRequest(request, self);

                    resolve();
                });
            });
        }

        self.load = function (id) {
            return Promise.all([self.loadData(id)]);
        }

        self.reject = function () {
            return new Promise(function (resolve, reject) {
                API.actionReject(self.requestId, self.taskId).then(function (data) {
                    alert("[TODO] Do redirect...");
                    resolve();
                });
            });
        }

        self.create = function () {
            if (self.organizationId()) {
                return new Promise(function (resolve, reject) {
                    API.createRequest(unmapRequest(self)).then(function (data) {
                        var context = ojet.getSessionContext() || {};
                        context.requestId = self.organizationId();
                        ojet.setSessionContext(context);

                        ojet.goTo("homeTasksInternal");
                        resolve();
                    });
                });
            }
        }
    }


    return {
        Bond: Bond,
        Party: Party,
        PartyExternalIdentificationCodes: PartyExternalIdentificationCodes,
        PartyContacts: PartyContacts,
        PartyAddress: PartyAddress,
        PartyCompanyInfo: PartyCompanyInfo,
        RequestModel: RequestModel,
        ReferenceDataCurrency: ReferenceDataCurrency,
        Intermediary: Intermediary
    }

});