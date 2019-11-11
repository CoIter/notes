module.exports = [
    { text: '主页', link: '/' },
    { text: 'markdown语法', link: '/02_guide/', target:'_blank'},
    {
        text: '练习项目',
        items: [
            {text: 'SpringBoot集成MyBatisPlus', link: '/01_proj/springboot_mybatisplus'},
        ]
    },
    {
        text: '学习笔记', items: [
            {
                text: '后端笔记', items: [
                    {text: 'java', link: '/04_java/'},
                    {text: 'spring', link: '/06_spring/'},
                    {text: 'springboot', link: '/07_springboot/'}
                ]
            }, {
                text: 'Linux',
                items: [{text: 'linux', link: '/05_linux/'}]
            }
        ]
    },
    { text: 'about', link: '/03_about/', target:'_self', rel:'' },
    { text: 'Gitee', link: 'https://gitee.com/'},
]
