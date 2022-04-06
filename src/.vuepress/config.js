module.exports = {
    title: 'FlippingBook Public APIs documentation',
    description: 'Welcome to the FlippingBook Public APIs documentation',
    dest: 'docs',
    plugins:[
      ['@vuepress/google-analytics',{'ga':'UA-344175-32'}]  
    ],
    theme: 'theme',
    themeConfig: {
        sidebarDepth: 5,
        sidebar: [
            '/',                        
        ],
        logo: 'https://d1qwl4ymp6qhug.cloudfront.net/Release/R236/icons/common/logo-full-white.svg',
    },
    extendMarkdown: md => {
      md.use(require('markdown-it-include'))
    }
};
