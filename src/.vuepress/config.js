module.exports = {
    title: 'FlippingBook Public APIs documentation',
    description: 'Welcome to the FlippingBook Public APIs documentation',
    dest: 'docs',
    plugins:[
      ['@vuepress/google-analytics',{'ga':'UA-344175-32'}]  
    ],
    themeConfig: {
        sidebarDepth: 1,
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
                    '/fbonline/publications',
                    '/fbonline/sources',
                    '/fbonline/tracked-links',
                    '/fbonline/triggers'
                ]
            }
        ]
    }
};