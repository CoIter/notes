module.exports = {
    '@vuepress/pwa': {
        serviceWorker: true,
        updatePopup: {
            message: "发现新内容可用.",
            buttonText: "刷新"
        }
    },
    '@vuepress/back-to-top': true,
    '@vuepress/medium-zoom': {
        selector: '.theme-default-content:not(.custom) img',
        // medium-zoom options here
        // See: https://github.com/francoischalifour/medium-zoom#options
        options: {
            margin: 16
        }
    }
}
