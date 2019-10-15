module.exports = {
    title: 'FlippingBook Public APIs documentation',
    description: 'Welcome to the FlippingBook Public APIs documentation',
    dest: 'docs',
    plugins:[
      ['@vuepress/google-analytics',{'ga':'UA-344175-32'}]  
    ],
    themeConfig: {
        sidebarDepth: 3,
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
            }
            
        ]
    }
};
