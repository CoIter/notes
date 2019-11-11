const plugin = require('./pluginConfig');
const nav = require('./navConfig');
const sider = require('./siderbarConfig');

module.exports = {
    title: 'MAXSH NOTES',
    description: 'Maxsh的笔记',
    base: '/prj_book/',
    locales: {
        '/': {
            lang: 'zh-CN',
        }
    },
    head: [
        ['link', { rel: 'icon', href: '/img/favicon.ico' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
    ],
    plugins: plugin,
    themeConfig: {
        logo: '/img/logo.png',
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
