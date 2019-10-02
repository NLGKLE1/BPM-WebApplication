define(function () {

  const navData = [{
      'attr': {
        name: 'Login',
        id: 'login'
      }
    },
    {
      'attr': {
        name: 'Product Catalogue',
        id: 'productCatalogue'
      },
      'children': [{
          'attr': {
            name: 'Attributes',
            id: 'attributeSearch'
          }
        },
        {
          'attr': {
            name: 'Product Class',
            id: 'productClassSearch'
          }
        },
        {
          'attr': {
            name: 'Master Product',
            id: 'masterProductSearch'
          }
        },
        {
          'attr': {
            name: 'Local Product',
            id: 'localProductSearch'
          }
        }
      ]
    },

    {
      'attr': {
        name: 'Risk Management',
        id: 'riskManagement'
      },
      'children': [{
          'attr': {
            name: 'My Tasks',
            id: 'riskManagementTaskListMyTasks'
          }
        },
        {
          'attr': {
            name: 'Group Tasks',
            id: 'riskManagementTaskListGroupTasks'
          }
        }
      ]
    },

    {
      'attr': {
        name: 'Reference Data',
        id: 'refDataSearch'
      }
    },


    {
      'attr': {
        name: 'Help Center',
        id: 'helpCenterSearch'
      }
    },

    {
      'attr': {
        name: 'Auditing',
        id: 'auditBackend'
      }
    }


  ];

  return navData;
});