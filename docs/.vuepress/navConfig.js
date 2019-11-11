module.exports = [
    { text: 'Home', link: '/' },
    { text: 'Guide', link: '/guide/', target:'_blank'},
    {
        text: 'knowledge',
        items: [
            { text: 'css', items: [
                    { text: 'css1', link: '/css/css1' },
                    { text: 'css2', link: '/css/css2' },
                ]
            },
            { text: 'javaScript', items: [
                    { text: 'javaScript1', link: '/javaScript/javaScript1' },
                    { text: 'javaScript2', link: '/javaScript/javaScript2' },
                ]
            },
        ]
    },
    {
        text: 'Languages',
        link: '/language/',
        ariaLabel: 'Language Menu',
        items: [
            { text: 'Chinese', link: '/language/chinese/' },
            { text: 'Japanese', link: '/language/japanese/' },
        ]
    },
    { text: 'about', link: '/about/', target:'_self', rel:'' },
    { text: 'External', link: 'www.baidu.com'},
]
