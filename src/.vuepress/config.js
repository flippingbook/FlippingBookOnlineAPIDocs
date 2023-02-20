module.exports = {
    title: 'FlippingBook Public APIs documentation',
    description: 'Welcome to the FlippingBook Public APIs documentation',
    dest: 'docs',
    plugins:[
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
    },
    head: [
        [
            'script',
            {
                async: true,
                src: 'https://www.googletagmanager.com/gtag/js?id=G-YBPN499XZQ',
            },
        ],
        [
            'script',
            {},
            [
                "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-YBPN499XZQ');",
            ],
        ],
    ],
};
