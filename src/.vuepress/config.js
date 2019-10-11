module.exports = {
    title: 'FlippingBook Public APIs documentation',
    description: 'Welcome to the FlippingBook Public APIs documentation',
    dest: 'docs',
    themeConfig: {
        sidebarDepth: 2,
        sidebar: [
            '/',
            {
                title: 'General Information',
                path: '/general/',
                children: [
                    '/general/authentication',
                    '/general/error-handling',
                    '/general/limitations',
                    '/general/change-policy'
                ]
            },
            {
                title: 'Key Management',
                path: '/auth/',
                children: [
                    '/auth/keys'
                ]
            },
            {
                title: 'FlippinBook Online API',
                path: '/fbonline/',
                children: [
                    '/fbonline/concepts',
                    '/fbonline/publications',
                    '/fbonline/sources',
                    '/fbonline/trackedlinks',
                    '/fbonline/triggers',
                    '/fbonline/webhooks'
                ]
            }
        ]
    }
};