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
                ['04_Upload', 'SpringBoot和Freemarker文件上传'],
                ['05_FastDFS', '使用SpringBoot上传文件到FastDFS'],
                ['06_RESTful', 'SpringBoot构建RESTful Web服务'],
                ['07_Swagger', '使用Swagger 2 构建API文档'],
                ['08_WebSocket', 'SpringBoot WebSocket创建聊天室'],
                ['09_Jdbc', 'SpringBoot使用JDBC操作数据库'],
                ['10_MybatisXML', 'SpringBoot集成Mybatis XML 配置版'],
                ['11_MybatisAnnotation', 'SpringBoot集成Mybatis 注解版'],
                ['12_SpringDataJPA', 'Spring Data JPA的使用'],
            ]
        }
    ]
}
