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
        ['link', { rel: 'apple-touch-icon',  sizes:"180x180", href: '/images/icons/apple-touch-icon.png' }],
        ['link', { rel: 'icon', type:"image/png",  sizes:"32x32", href: '/images/icons/favicon-32x32.png' }],
        ['link', { rel: 'icon', type:"image/png",  sizes:"16x16", href: '/images/icons/favicon-16x16.png' }],
        ['link', { rel: 'manifest', href:'/manifest.json' }],
        ['link', { rel: 'mask-icon', href: '/images/icons/safari-pinned-tab.svg', color:'#5bbad5' }],
        ['meta', { name: 'msapplication-TileColor', content: '#ffc40d' }],
        ['meta', { rel: 'theme-color', content:'#ffffff' }]
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
