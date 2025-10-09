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
                src: 'https://d1qwl4ymp6qhug.cloudfront.net/gstatic/googletagmanager/G-YBPN499XZQ.js',
                integrity: "sha384-xFvEp2+r78Ydxkh3Su0qUM+hJRbJ0VmLIj6qrHvpWs8PEUTeH3y3x0uekIaB1j6L",
                crossorigin: "anonymous"
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
