define(function () {

    return {
        getInternalMenu: function () {

            //Main Navigation
            const navData = [
                {
                    'attr': {
                        name: 'Data owner',
                        id: 'data-owner'
                    },
                    'children': [{
                        'attr': {
                            name: 'Data dashboard',
                            id: 'data'
                        }
                    },
                    {
                        'attr': {
                            name: 'About',
                            id: 'about'
                        }
                    }
                    ]
                }
            ];

            return navData;
        }
    }
});