---

description: SpringBoot构建RESTful Web服务
---

# SpringBoot构建RESTful Web服务



## REST和RESTful的概念

- **表现层状态转换**（REST，英文：**Representational State Transfer**）是Roy Thomas Fielding博士于2000年在他的博士论文中提出来的，目的是便于不同软件/程序在网络（例如互联网）中互相传递信息， 如果一个架构符合 REST 原则，则称它为 RESTful 架构。 

-  **[资源]表现层状态转换**（REST，英文：**[Resource] Representational State Transfer**），通俗翻译为：资源在网络中以某种表现形式进行状态转移。 

>  Resource：资源，即数据（网络的核心），比如 goods，fruits等；
>  Representational：某种表现形式，比如用JSON，XML，JPEG等；
>  State Transfer：状态变化，通过HTTP动词实现。

## SpringBoot对RESTful的支持

Spring Boot 提供了一些组合注解。这些注解来帮助简化常用的 HTTP 方法的映射，并更好地表达被注解方法的语义。 

- @GetMapping，处理 Get 请求
- @PostMapping，处理 Post 请求
- @PutMapping，用于更新资源
- @DeleteMapping，处理删除请求
- @PatchMapping，用于更新部分资源

其实这些组合注解就是我们使用的 @RequestMapping 的简写版本，下面是 Java 类中的使用示例： 

| 组合注解                     | 原始注解                                                     |
| :--------------------------- | ------------------------------------------------------------ |
| @GetMapping(value="/xxx")    | @RequestMapping(value = "/xxx",method = RequestMethod.GET)   |
| @PostMapping(value="/xxx")   | @RequestMapping(value = "/xxx",method = RequestMethod.POST)  |
| @PutMapping(value="/xxx")    | @RequestMapping(value = "/xxx",method = RequestMethod.PUT)   |
| @DeleteMapping(value="/xxx") | @RequestMapping(value = "/xxx",method = RequestMethod.DELETE) |
| @PatchMapping(value="/xxx")  | @RequestMapping(value = "/xxx",method = RequestMethod.PATCH) |

 按照 RESTful 的思想我们来设计一组对用户操作的 RESTful API： 
<style> table {width: 100%;} table th:nth-of-type(3) { width: 100%; } </style>
| <div style="width:80px;">请求</div> | <div style="width:120px;">url</div> | 说明           |
| :----------------------------------: | :---------------------------------- | :-------------- |
|                 get                  | /users                              | 获取所有用户   |
|                 post                 | /user                               | 创建一个用户   |
|                 put                  | /user                               | 修改用户       |
|                patch                 | /user/name                          | 修改用户的name |
|                 get                  | /user/id                            | 根据id获取用户 |
|                delete                | /user/id                            | 根据id删除用户 |

> put 方法主要是用来更新整个资源的，而 patch 方法主要表示更新部分字段。 



## 快速上手



定义一个 User 对象： 

```java
public class User {
    private String id;
    private String name;
    private String password;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
```



编写对应的Repository：

```java
public interface UserRepository {
    List<User> findAll();
    User save(User user);
    User update(User user);
    User UpdateName(User user);
    User findUser(String id);
    void deleteUser(String id);
}
```



 我们使用 ConcurrentHashMap 来模拟存储 User对象的增删改查， UUID模拟id来实现UserRepository。

```java
@Service
public class UserRepositoryImpl implements UserRepository {
    private final ConcurrentMap<String, User> users = new ConcurrentHashMap<>();

    @Override
    public List<User> findAll() {
        List<User> users = new ArrayList<>(this.users.values());
        return users;
    }
    
    @Override
    public User save(User user) {
        String id = UUID.randomUUID().toString();
        user.setId(id);
        this.users.put(id, user);
        return user;
    }

    @Override
    public User update(User user) {
        this.users.put(user.getId(),user);
        return user;
    }

    @Override
    public User UpdateName(User user) {
        User user1 = this.users.get(user.getId());
        user1.setName(user.getName());
        this.users.put(user1.getId(), user1);
        return user1;
    }

    @Override
    public User findUser(String id) {
        return this.users.get(id);
    }

    @Override
    public void deleteUser(String id) {
        this.users.remove(id);
    }
}
```



封装 RESTful , 将上面封装好的 UserRepositoryImpl注入到 Controller 中 。

```java
@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    /**
     * 获取所有用户
     * @return
     */
    @GetMapping("/users")
    public List<User> list() {
        return userRepository.findAll();
    }

    /**
     * 创建一个用户
     * @param user
     * @return
     */
    @PostMapping("/user")
    public User create(User user) {
        return userRepository.save(user);
    }

    /**
     * 修改用户
     * @param user
     * @return
     */
    @PutMapping("/user")
    public User modify(User user) {
        return userRepository.update(user);
    }

    /**
     * 更新user中的name字段
     * @param user
     * @return
     */
    @PatchMapping("/user/name")
    public User patch(User user) {
        return userRepository.UpdateName(user);
    }

    /**
     * 根据id查询用户
     * @param id
     * @return
     */
    @GetMapping("/user/{id}")
    public User getUser(@PathVariable String id) {
        return userRepository.findUser(id);
    }

    /**
     * 删除用户
     * @param id
     */
    @DeleteMapping("/user/{id}")
    public void delete(@PathVariable String id) {
        userRepository.deleteUser(id);
    }
}
```





## 进行测试

使用MockMvc进行测试：

```java
@SpringBootTest
@AutoConfigureMockMvc
@DisplayName("测试UserController")
class RestfulApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() throws Exception {
        saveUsers();
    }

    @Test
    @DisplayName("保存用户")
    public void saveUsers() throws Exception {
        for (int i = 0; i < 10; i++) {
            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("name", "name"+i);
            params.add("password", "password" + i);
            String ret =
                    mockMvc.perform(MockMvcRequestBuilders.post("/user").params(params)).andReturn().getResponse().getContentAsString();
            System.out.println("添加----->" + ret);
        }
    }

    @Test
    @DisplayName("查询所有用户")
    public void getAllUsers() throws Exception {
        String mvcResult= mockMvc.perform(MockMvcRequestBuilders.get("/users"))
                .andReturn().getResponse().getContentAsString();
        System.out.println("Result----->"+mvcResult);
    }

    @Test
    @DisplayName("根据id查询用户")
    public void getUser() throws Exception {
        String mvcResult= mockMvc.perform(MockMvcRequestBuilders.get("/user/6"))
                .andReturn().getResponse().getContentAsString();
        System.out.println("Result----->"+mvcResult);
    }

    @Test
    @DisplayName("修改用户")
    public void modifyUser() throws Exception {
        final MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("id", "6");
        params.add("name", "jack");
        params.add("password", "jack123");
        String mvcResult= mockMvc.perform(MockMvcRequestBuilders.put("/user").params(params))
                .andReturn().getResponse().getContentAsString();
        System.out.println("Result----->"+mvcResult);
    }

    @Test
    @DisplayName("修改用户名")
    public void patchUser() throws Exception {
        final MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("id", "6");
        params.add("name", "nnnn");
        String mvcResult= mockMvc.perform(MockMvcRequestBuilders.patch("/user/name").params(params))
                .andReturn().getResponse().getContentAsString();
        System.out.println("Result----->"+mvcResult);
    }

    @Test
    @DisplayName("删除用户")
    public void deleteMessage() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/user/6"))
                .andReturn();
        String mvcResult= mockMvc.perform(MockMvcRequestBuilders.get("/users"))
                .andReturn().getResponse().getContentAsString();
        System.out.println("Result----->"+mvcResult);
    }
}
```

::: tip 源码 
[源码链接](  https://github.com/maxsh-io/proj_springboot_case/tree/master/restful   ) 
:::