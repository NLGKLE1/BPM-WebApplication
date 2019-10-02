define(function () {

  return {
    MainRouter: function () {
      const routerConfig = {

        // PR
        'productCatalogue': {
          label: 'Product Catalogue',
          isDefault: true,
          value: 'pr/productCatalogue'
        },
        'attributeSearch': {
          label: 'Attribute',
          value: 'pr/attribute/search'
        },
        'productClassSearch': {
          label: 'Product Class',
          value: 'pr/productclass/search'
        },
        'masterProductSearch': {
          label: 'Master Product',
          value: 'pr/masterproduct/search'
        },
        'localProductSearch': {
          label: 'Local Product',
          value: 'pr/localproduct/search'
        },

        // RK 
        'riskManagementTaskListMyTasks': {
          label: 'TL - My Tasks',
          value: 'rk/tasklist/individual'
        },
        'riskManagementTaskListGroupTasks': {
          label: 'TL - Group Tasks',
          value: 'rk/tasklist/group'
        },
        // REFERENCE DATA
        'refDataManage': {
          label: 'RD - Region Manage',
          value: 'rd/manage'
        },
        'refDataSearch': {
          label: 'RD - Search',
          value: 'rd/search'
        },
        // COMMON
        'helpCenterSearch': {
          label: 'Help Center - Search',
          value: 'common/help/search'
        },
        'auditBackend': {
          label: 'AUDIT - BACKEND',
          value: 'common/audit/backend'
        },
        'login': {
          label: 'LOGIN',
          value: 'common/login'
        },
        /////////////////////////////////////////////////
        /////////////////////////////////////////////////
        // NEEDS SORTING
        /////////////////////////////////////////////////
        /////////////////////////////////////////////////
        // PRODUCT 
        'productActivities': {
          label: 'PRODUCT - Activities',
          value: 'pr/activities'
        },
        'productAttributes': {
          label: 'PRODUCT - Attributes',
          value: 'pr/attributes'
        },
        'productComments': {
          label: 'PRODUCT - Comments',
          value: 'pr/comments'
        },
        'productDocuments': {
          label: 'PRODUCT - Documents',
          value: 'pr/documents'
        },

        // ATTRIBUTE
        'attributeDetails': {
          label: 'ATTR - DETAILS',
          value: 'pr/attribute/details'
        },
        'attributeQuery': {
          label: 'Attribute Query',
          value: 'pr/attribute/query'
        },
        'attributeCreate': {
          label: 'Attribute Create',
          value: 'pr/attribute/create'
        },
        'attributeModify': {
          label: 'Attribute Modify',
          value: 'pr/attribute/modify'
        },
        'attributeComments': {
          label: 'Attribute Comments',
          value: 'pr/attribute/comments'
        },
        'attributeActivity': {
          label: 'Attribute Activity',
          value: 'pr/attribute/activity'
        },
        'attributeLocalization': {
          label: 'Attribute Localization',
          value: 'pr/attribute/localization/view'
        },
        'attributeLocalizationCreate': {
          label: 'Attribute Localization Create',
          value: 'pr/attribute/localization/create'
        },
        // PRODUCT CLASS

        'productClassAttributes': {
          label: 'Product Class Attributes',
          value: 'pr/productclass/attributes'
        },
        'productClassComments': {
          label: 'Product Class Comments',
          value: 'pr/productclass/comments'
        },
        'productClassDocuments': {
          label: 'Product Class Documents',
          value: 'pr/productclass/documents'
        },
        'productClassQuery': {
          label: 'Product Class Query',
          value: 'pr/productclass/query'
        },
        'productClassCreate': {
          label: 'Product Class Create',
          value: 'pr/productclass/create'
        },
        'productClassModify': {
          label: 'Product Class Modify',
          value: 'pr/productclass/modify'
        },
        'productClassActivity': {
          label: 'Product Class Activity',
          value: 'pr/productclass/activity'
        },
        'productClassDetails': {
          label: 'PC - DETAILS',
          value: 'pr/productclass/details'
        },
        // MASTER PRODUCT 

        'masterProductActivity': {
          label: 'Master Product Activity',
          value: 'pr/masterproduct/activity'
        },
        'masterProductAttributes': {
          label: 'Master Product Attributes',
          value: 'pr/masterproduct/attributes'
        },
        'masterProductComments': {
          label: 'Master Product Comments',
          value: 'pr/masterproduct/comments'
        },
        'masterProductDocuments': {
          label: 'Master Product Documents',
          value: 'pr/masterproduct/documents'
        },
        'masterProductQuery': {
          label: 'Master Product Query',
          value: 'pr/masterproduct/query'
        },
        'masterProductCreate': {
          label: 'Master Product Create',
          value: 'pr/masterproduct/create'
        },
        'masterProductDetails': {
          label: 'MP - DETAILS',
          value: 'pr/masterproduct/details'
        },
        'masterProductModify': {
          label: 'MP - Modify',
          value: 'pr/masterproduct/modify'
        },
        'masterProductCreateDetails': {
          label: 'MP - Create Details',
          value: 'pr/masterproduct/createDetails'
        },
        
        // LOCAL PRODUCT 
        'localProductDetails': {
          label: 'LP - DETAILS',
          value: 'pr/localproduct/details'
        },
        'localProductComments': {
          label: 'Local Product Comments',
          value: 'pr/localproduct/comments'
        },
        'localProductDocuments': {
          label: 'Local Product Documents',
          value: 'pr/localproduct/documents'
        },
        'localProductQuery': {
          label: 'Local Product Query',
          value: 'pr/localproduct/query'
        },
        'localProductCreate': {
          label: 'Local Product Create',
          value: 'pr/localproduct/create'
        },
        'localProductModify': {
          label: 'Local Product Modify',
          value: 'pr/localproduct/modify'
        },
        'localProductText': {
          label: 'Local Product Text',
          value: 'pr/localproduct/text'
        },
        'localProductActivity': {
          label: 'Local Product Activity',
          value: 'pr/localproduct/activity'
        },
        'localProductLegislation': {
          label: 'Local Product Legislation',
          value: 'pr/localproduct/legislation'
        },


        // RISK MANAGEMENT
        'riskManagementRequestDetails': {
          label: 'RC - Request Details',
          value: 'rk/request/summary'
        },
        'riskManagementCustomers': {
          label: 'RC - Customers',
          value: 'rk/request/customer'
        },
        'riskManagementDocuments': {
          label: 'SC - Documents',
          value: 'rk/request/documents'
        },
        'riskManagementAnalysis': {
          label: 'SC - Analysis',
          value: 'rk/request/analysis'
        },
        'riskManagementRequestRisk': {
          label: 'SC - Request Risk',
          value: 'rk/request/risk'
        },
        // REFERENCE DATA
        'refDataLocalizationEdit': {
          label: 'RD - Localization Edit',
          value: 'rd/localization/edit'
        },
        'refDataLocalizationNew': {
          label: 'RD - Localization New',
          value: 'rd/localization/new'
        },
        'refDataLocalizationView': {
          label: 'RD - Localization View',
          value: 'rd/localization/view'
        },
        'refDataRegionEdit': {
          label: 'RD - Region Edit',
          value: 'rd/Region/edit'
        },
        'refDataRegionNew': {
          label: 'RD - Region New',
          value: 'rd/Region/new'
        },
        'refDataRegionView': {
          label: 'RD - Region View',
          value: 'rd/Region/view'
        },
        'refDataAddValue': {
          label: 'RD - AddValue',
          value: 'rd/addValue'
        },
        // COMMON
        'helpCenterCreate': {
          label: 'Help Center - Create',
          value: 'common/help/create'
        },
        'helpCenterQuery': {
          label: 'Help Center - Query',
          value: 'common/help/query'
        },
        'helpCenterEdit': {
          label: 'Help Center - Edit',
          value: 'common/help/edit'
        }

      }
      return routerConfig;
    },

    SubNavRouter: function () {
      const subNavRouter =

        {
          'empty': {
            label: 'Empty',
            value: 'common/empty',
            isDefault: true
          },
          // PRODUCT 
          'productActivities': {
            label: 'PRODUCT - Activities',
            value: 'pr/activities'
          },
          'productAttributes': {
            label: 'PRODUCT - Attributes',
            value: 'pr/attributes'
          },
          'productComments': {
            label: 'PRODUCT - Comments',
            value: 'pr/comments'
          },
          'productDocuments': {
            label: 'PRODUCT - Documents',
            value: 'pr/documents'
          },

          // ATTRIBUTE
          'attributeDetails': {
            label: 'ATTR - DETAILS',
            value: 'pr/attribute/details'
          },
          'attributeQuery': {
            label: 'Attribute Query',
            value: 'pr/attribute/query'
          },
          'attributeCreate': {
            label: 'Attribute Create',
            value: 'pr/attribute/create'
          },
          'attributeModify': {
            label: 'Attribute Modify',
            value: 'pr/attribute/modify'
          },
          'attributeComments': {
            label: 'Attribute Comments',
            value: 'pr/attribute/comments'
          },
          'attributeActivity': {
            label: 'Attribute Activity',
            value: 'pr/attribute/activity'
          },
          'attributeLocalization': {
            label: 'Attribute Localization',
            value: 'pr/attribute/localization/view'
          },
          'attributeLocalizationCreate': {
            label: 'Attribute Localization Create',
            value: 'pr/attribute/localization/create'
          },
          // PRODUCT CLASS

          'productClassAttributes': {
            label: 'Product Class Attributes',
            value: 'pr/productclass/attributes'
          },
          'productClassComments': {
            label: 'Product Class Comments',
            value: 'pr/productclass/comments'
          },
          'productClassDocuments': {
            label: 'Product Class Documents',
            value: 'pr/productclass/documents'
          },
          'productClassQuery': {
            label: 'Product Class Query',
            value: 'pr/productclass/query'
          },
          'productClassCreate': {
            label: 'Product Class Create',
            value: 'pr/productclass/create'
          },
          'productClassModify': {
            label: 'Product Class Modify',
            value: 'pr/productclass/modify'
          },
          'productClassActivity': {
            label: 'Product Class Activity',
            value: 'pr/productclass/activity'
          },
          'productClassDetails': {
            label: 'PC - DETAILS',
            value: 'pr/productclass/details'
          },
          'productClassDetailsForm': {
            label: 'PC - DETAILS FORM',
            value: 'pr/productclass/productClassDetailsForm'
          },
          // MASTER PRODUCT 

          'masterProductActivity': {
            label: 'Master Product Activity',
            value: 'pr/masterproduct/activity'
          },
          'masterProductAttributes': {
            label: 'Master Product Attributes',
            value: 'pr/masterproduct/attributes'
          },
          'masterProductComments': {
            label: 'Master Product Comments',
            value: 'pr/masterproduct/comments'
          },
          'masterProductDocuments': {
            label: 'Master Product Documents',
            value: 'pr/masterproduct/documents'
          },
          'masterProductQuery': {
            label: 'Master Product Query',
            value: 'pr/masterproduct/query'
          },
          'masterProductCreate': {
            label: 'Master Product Create',
            value: 'pr/masterproduct/create'
          },
          'masterProductDetails': {
            label: 'MP - DETAILS',
            value: 'pr/masterproduct/details'
          },
          'masterProductModify': {
            label: 'MP - Modify',
            value: 'pr/masterproduct/modify'
          },
          'masterProductCreateDetails': {
            label: 'MP - Create Details',
            value: 'pr/masterproduct/createDetails'
          },
          // LOCAL PRODUCT 
          'localProductDetails': {
            label: 'LP - DETAILS',
            value: 'pr/localproduct/details'
          },
          'localProductComments': {
            label: 'Local Product Comments',
            value: 'pr/localproduct/comments'
          },
          'localProductDocuments': {
            label: 'Local Product Documents',
            value: 'pr/localproduct/documents'
          },
          'localProductQuery': {
            label: 'Local Product Query',
            value: 'pr/localproduct/query'
          },
          'localProductCreate': {
            label: 'Local Product Create',
            value: 'pr/localproduct/create'
          },
          'localProductModify': {
            label: 'Local Product Modify',
            value: 'pr/localproduct/modify'
          },
          'localProductText': {
            label: 'Local Product Text',
            value: 'pr/localproduct/text'
          },
          'localProductActivity': {
            label: 'Local Product Activity',
            value: 'pr/localproduct/activity'
          },
          'localProductLegislation': {
            label: 'Local Product Legislation',
            value: 'pr/localproduct/legislation'
          },


          // RISK MANAGEMENT
          'riskManagementRequestDetails': {
            label: 'RC - Request Details',
            value: 'rk/request/summary'
          },
          'riskManagementCustomers': {
            label: 'RC - Customers',
            value: 'rk/request/customer'
          },
          'riskManagementDocuments': {
            label: 'SC - Documents',
            value: 'rk/request/documents'
          },
          'riskManagementAnalysis': {
            label: 'SC - Analysis',
            value: 'rk/request/analysis'
          },
          'riskManagementRequestRisk': {
            label: 'SC - Request Risk',
            value: 'rk/request/risk'
          },
          // REFERENCE DATA
          'refDataLocalizationEdit': {
            label: 'RD - Localization Edit',
            value: 'rd/localization/edit'
          },
          'refDataLocalizationNew': {
            label: 'RD - Localization New',
            value: 'rd/localization/new'
          },
          'refDataLocalizationView': {
            label: 'RD - Localization View',
            value: 'rd/localization/view'
          },
          'refDataRegionEdit': {
            label: 'RD - Region Edit',
            value: 'rd/Region/edit'
          },
          'refDataRegionNew': {
            label: 'RD - Region New',
            value: 'rd/Region/new'
          },
          'refDataRegionView': {
            label: 'RD - Region View',
            value: 'rd/Region/view'
          },
          'refDataAddValue': {
            label: 'RD - AddValue',
            value: 'rd/addValue'
          },
          // COMMON
          'helpCenterCreate': {
            label: 'Help Center - Create',
            value: 'common/help/create'
          },
          'helpCenterQuery': {
            label: 'Help Center - Query',
            value: 'common/help/query'
          },
          'helpCenterEdit': {
            label: 'Help Center - Edit',
            value: 'common/help/edit'
          }
        }
      return subNavRouter;
    }
  };

});