---
description: springboot 开发一个web应用
---

# SpringBoot Demo

## 编写应用及测试
用idea新建工程demo,在项目根路径下新建 model 包，在包下新建一个实体类 User，User 信息如下：

```java
public class User {
    private String name;
    private int age;
    private String pass;
    //setter、getter省略
}
```



在项目中新建 web 包，并在 web 包下新建一个类 UserController，在类中创建一个方法返回 User，如下：

```java
@RestController
public class UserController {

    @GetMapping("/getUser")
    public User getUser() {
        User user=new User();
        user.setName("小明");
        user.setAge(12);
        user.setPass("123456");
        return user;
    }
}

```







> - @RestController 注解相当于 @ResponseBody ＋ @Controller 合在一起的作用，如果 Web 层的类上使用了 @RestController 注解，就代表这个类中所有的方法都会以 JSON 的形式返回结果，也相当于 JSON 的一种快捷使用方式；
> - @GetMappings是@RequestMapping(name="/getUser", method= RequestMethod.GET)的缩写方式，以 /getUser 的方式去请求，method= RequestMethod.GET 是指只可以使用 Get 的方式去请求，如果使用 Post 的方式去请求的话，则会报 405 不允许访问的错误。
>







在工程生成的DemoApplicationTests中编写 getUser() 方法对UserController的 @GetMapping("/getUser")进行测试。

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class DemoApplicationTests {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void getUser() {
        ResponseEntity<User> entity = restTemplate.getForEntity("http://localhost:" + port + "/getUser", User.class);
        User user = entity.getBody();
        assertThat(user).extracting(User::getName, User::getAge, User::getPass).containsExactly("小明", 12, "123456");
    }

}
```



## 参数校验

在很多时候，当我们要处理一个应用程序的业务逻辑时，数据校验是必须要考虑和面对的事情。应用程序必须通过某种手段来确保输入进来的数据从语义上来讲是正确的。在 Java 应用程序中，必须要对输入进来的数据从语义上分析是有效的，也就是数据校验。

::: tip 说明

在 Spring MVC 中有两种方式可以验证输入：一种是 Spring 自带的验证框架，另外一种是利用 JSR 实现。

JSR 是一个规范文档，指定了一整套 API，通过标注给对象属性添加约束。Hibernate Validator 就是 JSR 规范的具体实现，Hibernate Validator 提供了 JSR 规范中所有内置约束注解的实现，以及一些附加的约束注解，除此之外用户还可以自定义约束注解。



Spring Boot 的参数校验依赖于 hibernate-validator 来进行。使用 Hibernate Validator 校验数据，需要定义一个接收的数据模型，使用注解的形式描述字段校验的规则。

:::

首先在UserController中新建saveUser方法，参数为User。

```java
@PostMapping("/saveUser")
public void saveUser(@Valid User user, BindingResult result) {
    System.out.println("user:"+user);
    if(result.hasErrors()) {
        List<ObjectError> list = result.getAllErrors();
        for (ObjectError error : list) {
            System.out.println(error.getCode()+ "-" + error.getDefaultMessage());
        }
    }
}
```

> - @Valid 参数前面添加 @Valid 注解，代表此对象使用了参数校验；
> - BindingResult 参数校验的结果会存储在此对象中，可以根据属性判断是否校验通过，校验不通过可以将错误信息打印出来。

接下来在 User 中给需要校验的参数添加对应的注解，对不同的属性，按照规则添加不同的校验内容。

```java
@NotEmpty(message="姓名不能为空")
private String name;
@Max(value = 100, message = "年龄不能大于100岁")
@Min(value= 18 ,message= "必须年满18岁！" )
private int age;
@NotEmpty(message="密码不能为空")
@Length(min=6,message="密码长度不能小于6位")
private String pass;
```

添加测试方法，对属性校验进行测试：

```java
@Test
public void saveUser() {
    Map map = new HashMap();
    map.put("name","多练练");
    map.put("age","17");
    map.put("pass","123457");
    restTemplate.postForObject("/saveUser", map, String.class);
}
```

返回结果

    user:User[name='null', age=0, pass='null']
    NotEmpty-密码不能为空
    Min-必须年满18岁！
    NotEmpty-姓名不能为空



Hibernate Validator 基本上包含了常用的数据校验，包括校验属性是否为空、长度、大小、特定格式等。

| **注解**                        | **应用目标**                                      | **运行时检查**                                               | **Hibernate 元数据影响** |
| ------------------------------- | ------------------------------------------------- | ------------------------------------------------------------ | ------------------------ |
| @Length(min=, max=)             | 属性（String）                                    | 检查字符串长度是否符合范围                                   | 列长度会被设到最大值     |
| @Max(value=)                    | 属性（以 numeric 或者 string 类型来表示一个数字） | 检查值是否小于或等于最大值                                   | 对列增加一个检查约束     |
| @Min(value=)                    | 属性（以 numeric 或者 string 类型来表示一个数字） | 检查值是否大于或等于最小值                                   | 对列增加一个检查约束     |
| @NotNull                        | 属性                                              | 检查值是否非空（not null）                                   | 列不为空                 |
| @Past                           | 属性（date 或 calendar）                          | 检查日期是否是过去时                                         | 对列增加一个检查约束     |
| @Future                         | 属性（date 或 calendar）                          | 检查日期是否是将来时                                         | 无                       |
| @Pattern(regex="regexp", flag=) | 属性（string）                                    | 检查属性是否与给定匹配标志的正则表达式相匹配（见` java.util.regex.Pattern `） | 无                       |
| @Range(min=, max=)              | 属性（以 numeric 或者 string 类型来表示一个数字） | 检查值是否在最小和最大值之间（包括临界值）                   | 对列增加一个检查约束     |
| @Size(min=, max=)               | 属性（array，collection，map）                    | 检查元素大小是否在最小和最大值之间（包括临界值）             | 无                       |
| @AssertFalse                    | 属性                                              | 检查方法的演算结果是否为 false（对以代码方式而不是注解表示的约束很有用） | 无                       |
| @AssertTrue                     | 属性                                              | 检查方法的演算结果是否为 true（对以代码方式而不是注解表示的约束很有用） | 无                       |
| @Valid                          | 属性（object）                                    | 对关联对象递归进行验证。如果对象是集合或数组，就递归地验证其元素；如果对象是 Map，则递归验证其值元素 | 无                       |
| @Email                          | 属性（String）                                    | 检查字符串是否符合有效的 email 地址规范                      | 无                       |



## 自定义 Filter

Filter可以对 Web 服务器管理的所有 Web 资源，例如 JSP、Servlet、静态图片文件或静态 HTML 文件等进行拦截，从而实现一些特殊的功能。例如，实现 URL 级别的权限访问控制、过滤敏感词汇、排除有 XSS 威胁的字符、记录请求日志等一些高级功能。

自定义 Filter 有两种实现方式，第一种是使用 @WebFilter，第二种是使用 FilterRegistrationBean

使用方式1自定义 Filter，新建MyFilter1，

```java
@WebFilter(filterName="myFilter1",urlPatterns="/*")
public class MyFilter1 implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        System.out.println("this is @WebFilter MyFilter1,url :"+request.getRequestURI());
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {

    }
}
```

使用@WebFilter时需要在springboot启动类上添加@ServletComponentScan注解

```java
@ServletComponentScan
@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

添加完后启动项目，在浏览器中输入地址：http://localhost:8080/getUser，就会看到控制台打印如下信息：

    this is @WebFilter MyFilter1,url :/getUser

::: warning 注意

经过实践之后发现使用 @WebFilter 自定义的过滤器优先级顺序不能生效，即使加上@Order注解

所以推荐第二种

:::

将自定义 Filter 加入过滤链，当有多个过滤器时可以通过设置 Order 属性来决定它们的执行顺序，Order 值越小优先级越高

```java
@Configuration
public class WebConfiguration {

    @Bean
    public FilterRegistrationBean testFilterRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(new MyFilter1());
        registration.addUrlPatterns("/*");
        registration.setName("MyFilter");
        registration.setOrder(6);
        return registration;
    }
    @Bean
    public FilterRegistrationBean test2FilterRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(new MyFilter2());
        registration.addUrlPatterns("/*");
        registration.setName("MyFilter2");
        registration.setOrder(1);
        return registration;
    }
}

```

可以看到将 MyFilter 的 Order 属性设置为 6，将 MyFilter2 的 Order 属性设置为 1，项目重启后，在浏览器中输入地址：http://localhost:8080/getUser，就会看到控制台打印如下信息：

    this is @WebFilter MyFilter2,url :/getUser
    this is @WebFilter MyFilter1,url :/getUser

可以发现过滤器 MyFilter2 因为 Order 值设置得低，会优先被执行。



## 配置文件

在 application.properties 中配置：

    maxsh.title=hello
    maxsh.description=hello,world
在application.yml 文件中配置：

```
maxsh：
   title： hello
   description： hello,world
```

::: warning 注意

同时存在 application.yml 和 application.properties，并且里面配置相同，application.properties 的配置会覆盖 application.yml。

:::

### 读取单个配置项

 当需要从配置文件加载单个配置内容时，只需要使用 `@Value` 属性即可，新建 PropertiesTest 测试类进行测试。 

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PropertiesTest {
    @Value("${maxsh.title}")
    private String title;

    @Test
    public void testSingle() {
        assertThat(title).isEqualTo("hello");

    }
}
```





### 读取多个配置

 通常在项目中使用配置文件时，往往需要加载多个配置项，比如数据库连接参数等，通常会定义一个对象来接收多个配置项，方便在项目中使用。比如定义一个 AppProperties对象，来接收所有以 maxsh 开头的配置内容。 

```java
@Component
@ConfigurationProperties(prefix="maxsh")
public class AppProperties {
    private String title;
    private String description;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
```



此时idea会提示Spring Boot Configuration Annotaion Processor not found in classpath，所以需要加入spring-boot-configuration-processor依赖来处理配置文件。

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```



 写单元测试进行验证，使用属性时直接将 AppProperties对象注入即可。 

```java
@Resource
private AppProperties properties;

@Test
public void testMore() throws Exception {
    System.out.println("title:"+properties.getTitle());
    System.out.println("description:"+properties.getDescription());
}
```



 运行 test 后输出结果： 

```
title:hello
description:hello,world
```





###  自定义配置文件

 有时候需要自定义配置文件，以便和系统使用的 application.properties 文件区分开，避免混淆。 在 resources 目录下创建一个 ma.properties 文件，内容如下： 

```
ma.title=ma
ma.desc=ma,world
```

 对比上面读取多个配置示例，多了一个注解来指明配置文件地址：@PropertySource("classpath:other.properties")，同样创建一个测试方法，检测是否正确加载了外部配置文件。 



```java
@Resource
private MaProperties maProperties;

@Test
public void testMa() throws Exception {
    System.out.println("title:"+maProperties.getTitle());
    System.out.println("desc:"+maProperties.getDesc());
}
```



 运行 test 后输出结果： 

```
title:ma
desc:ma,world
```

 说明自定义配置文件加载成功。 