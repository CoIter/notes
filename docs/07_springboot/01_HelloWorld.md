---
description: springboot Hello World
---

# SpringBoot Hello World
1. 在idea中利用Spring Initializr 新建Hello World工程

<img src="/screenshot/springboot/01/01.png" style="zoom:80%">

2.勾选Spring Web的starter

<img src="/screenshot/springboot/01/02.png" style="zoom:80%">



3.在com.maxsh.helloworld.web 包下创建HelloWorldController

```java
@RestController
public class HelloWorldController {
    @RequestMapping("/hello")
    public String hello() {
        return "hello world";
    }
}
```



4.项目结构如下

<img src="/screenshot/springboot/01/03.png">

4.启动主程序

右键单击项目中的 HelloWorldApplication| run 命令，就可以启动项目了，若出现以下内容表示启动成功：

    2019-11-21 16:59:21.065  INFO 32148 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'
    2019-11-21 16:59:21.074  INFO 32148 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 9 ms

启动成功后，打开浏览器输入网址：http://localhost:8080/hello，就可以看到以下内容了：

    hello world
