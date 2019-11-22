---
description: springboot Hello World
---

# SpringBoot单元测试

单元测试在日常开发中必不可少，如果我们只想运行一个 hello world，只需要一个 @Test 注解就可以了。

```java
@Test
public void hello(){
    System.out.println("hello world");
}
```

如果需要测试 Web 层的请求呢？下面我们看下 Spring Boot 对单元测试又做了哪些支持？

    在 Spring Boot 体系中，Spring 给出了一个简单的解决方案，使用 MockMVC 进行 Web 测试，MockMVC 内置了很多工具类和方法，可以模拟 post、get 请求，并且判断返回的结果是否正确等，也可以利用 print() 打印执行结果。


::: warning 注意
在使用2.2.1.RELEASE版本默认的Test，右键Run as--> Junit Test  ，执行报错 no tests found with test runner 'Junit5'。JUnit Platform是提供了运行（测试框架）环境的平台，JUnit Jupiter 是新的Junit5（子项目提供了一个基于平台测试运行Jupiter的测试引擎），JUnit Vintage提供了Junit3/4的测试引擎（应该是向前兼容的意思）

参考：[解决办法](https://www.concretepage.com/questions/564)
:::



在pom.xml中加入如下依赖

```xml
<dependency>
    <groupId>org.junit.platform</groupId>
    <artifactId>junit-platform-launcher</artifactId>
</dependency>
```

再次执行，成功！



`JUnit 5`（JUnit Jupiter）已经存在了相当长的一段时间，并且配备了许多功能，从Spring Boot 2.2开始，`JUnit 5`它是默认的测试库依赖项。



## 在随机端口上运行Web服务器的Spring Boot测试

在下面的测试中，将使用随机端口创建Web环境。然后将该端口注入带注释的字段中@LocalServerPort。在这种模式下，应用程序是使用嵌入式服务器执行的。

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class Test1 {
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void hello() {
        // act
        String str = restTemplate.getForObject("http://localhost:" + port + "/hello?name=小明", String.class);
        // assert
        assertThat(str).isEqualTo("hello 小明");
    }
}
```

## 带有模拟MVC层的Spring Boot测试
使用完全配置的嵌入式服务器启动Spring Boot应用程序可能很耗时，并且对于集成测试而言，它并非始终是最佳选择。如果您在测试中不需要完整的服务器功能，则可以使用模拟的MVC层（MockMvc）。可以通过添加到来@AutoConfigureMockMvc完成@SpringBootTest。

```java
@SpringBootTest
@AutoConfigureMockMvc
class HelloWorldApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void hello(){
        System.out.println("hello world");
    }

    @Test
    public void hello2() throws Exception {
        ResultActions resultActions =mockMvc.perform(post("/hello?name=小明")
                .accept(MediaType.ALL))
                .andExpect(status().isOk())
                .andExpect(content().string("hello 小明"))
                .andDo(print());
        resultActions.andReturn();
    }
}
```

