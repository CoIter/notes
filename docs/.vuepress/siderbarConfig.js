module.exports = {
    '/01_proj/': [
        ['', '简介'],
        'springboot_mybatisplus',
    ],

    '/02_guide/': [
        ['', '简介'],
    ],

    '/03_about/': [
        '',
    ],

    '/04_java/': [
        ['', '简介'],
        ['java1', 'java常用工具类'],
    ],

    '/05_linux/': [
        ['', '简介'],
    ],

    '/06_spring/': [
        ['', '简介'],
    ],

    '/07_springboot/': [
        {
            title: 'Spring Boot',
            collapsable: false,
            children: [
                ['', '介绍'],
                ['01_HelloWorld', 'SpringBoot Hello World'],
                ['02_Test', 'SpringBoot中单元测试'],
                ['02_Web', 'SpringBootDemo'],
                ['03_Jsp', 'SpringBoot中使用Jsp'],
            ]
        }
    ]
}
