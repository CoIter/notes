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
        ['link', { rel: 'apple-touch-icon',  href: '/images/icons/icon-152x152.png' }],
        ['link', { rel: 'icon', type:"image/png",  href: '/images/icons/icon-192x192.png' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { rel: 'theme-color', content:'#ffffff' }],
        ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['meta', { name: 'apple-mobile-web-app-title', content: 'Notes' }],
        ['link', { rel: 'mask-icon', href: '/images/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/images/icons/ms-icon-144x144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#ffffff' }]
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
