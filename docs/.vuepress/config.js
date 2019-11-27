const plugin = require('./pluginConfig');
const nav = require('./navConfig');
const sider = require('./siderbarConfig');

module.exports = {
    title: 'MAXSH NOTES',
    description: 'Maxsh的笔记',
    dest: './dist',//默认在.vuepress下
    base: '/notes/',
    port: 8088,
    locales: {
        '/': {
            lang: 'zh-CN',
        }
    },
    head: [
        ['link', { rel: 'apple-touch-icon', href: '/images/apple-touch-icon.png' }],
        ['link', { rel: 'icon', href: '/images/favicon.ico' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { rel: 'theme-color', content:'#ffffff' }],
        ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: '/images/apple-touch-icon.png' }],
        ['link', { rel: 'mask-icon', href: '/images/safari-pinned-tab.svg', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/images/mstile-150x150.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    plugins: plugin,
    themeConfig: {
        logo: '/images/logo.png',
        sidebarDepth: 2,
        lastUpdated: '上次更新',
        repo: 'maxsh-io/notes',
        editLinks: true,
        editLinkText: '修改文档！',
        docsDir: 'docs',
        nav: nav,
        sidebar: sider
    }
}
