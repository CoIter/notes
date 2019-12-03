---
description: SpringBoot中使用JDBC

---

# SpringBoot中使用JDBC操作数据库

JDBC（Java Data Base Connectivity，Java 数据库连接）是一种用于执行 SQL 语句的 Java API，可以为多种关系数据库提供统一访问，它由一组用 Java 语言编写的类和接口组成。 

直接在 Java 程序中使用 JDBC 比较复杂，需要 7 步才能完成数据库的操作： 

1.  加载数据库驱动 
2.  建立数据库连接 
3.  创建数据库操作对象 
4.  定义操作的 SQL 语句 
5.  执行数据库操作 
6.  获取并操作结果集 
7.  关闭对象，回收资源 

关键代码如下：

```java
try {
    // 1、加载数据库驱动
    Class.forName(driver);
    // 2、获取数据库连接
    conn = DriverManager.getConnection(url, username, password);
    // 3、获取数据库操作对象
    stmt = conn.createStatement();
    // 4、定义操作的 SQL 语句
    String sql = "select * from user where id = 6";
    // 5、执行数据库操作
    rs = stmt.executeQuery(sql);
    // 6、获取并操作结果集
    while (rs.next()) {
    // 解析结果集
    }
} catch (Exception e) {
    // 日志信息
} finally {
    // 7、关闭资源
}
```

 通过上面的示例可以看出直接使用 JDBC 来操作数据库比较复杂 , Spring Boot 针对 JDBC 的使用提供了对应的 Starter 包：spring-boot-starter-jdbc，它其实就是在 Spring JDBC 上做了进一步的封装 。

## 添加依赖

添加依赖包：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
```



## 设计创建表

创建表，作为项目演示使用。 

```mysql
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  `age` int(11) DEFAULT NULL COMMENT '年龄',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```



## 配置数据源

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/test?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8&useSSL=true
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```



:::  danger 注意 
 在 Spring Boot 2.1.0 中，com.mysql.jdbc.Driver 已经过期，推荐使用 com.mysql.cj.jdbc.Driver。 
:::

## 演示项目

创建表对应的实体类User：

```java
public class User {
    private long id;
    private String name;
    private String password;
    private int age;

    public long getId() {
        return id;
    }

    public void setId(long id) {
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

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

  创建 UserRepository 定义我们常用的增删改查接口 :

```java
public interface UserRepository {
    int save(User user);
    int update(User user);
    int delete(long id);
    List<User> findALL();
    User findById(long id);
}
```

 创建 UserRepositoryImpl 类实现 UserRepository 类接口 ，类上使用 @Repository 注解用于标注数据访问组件，同时在类中注入 JdbcTemplate，其是 Spring 操作 JDBC 提供的工具类。 

```java
@Repository
public class UserRepositoryImpl implements UserRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public int save(User user) {
        return jdbcTemplate.update("INSERT INTO user(name, password, age) values(?, ?, ?)",
                user.getName(), user.getPassword(), user.getAge());
    }

    @Override
    public int update(User user) {
        return jdbcTemplate.update("UPDATE user SET name = ? , password = ? , age = ? WHERE id=?",
                user.getName(), user.getPassword(), user.getAge(), user.getId());
    }

    @Override
    public int delete(long id) {
        return jdbcTemplate.update("DELETE FROM user where id = ? ",id);
    }

    @Override
    public List<User> findALL() {
        return jdbcTemplate.query("SELECT * FROM user", new UserRowMapper());
    }

    @Override
    public User findById(long id) {
        return jdbcTemplate.queryForObject("SELECT * FROM user WHERE id=?", new Object[] { id }, new BeanPropertyRowMapper<User>(User.class));
    }
}

```

`new BeanPropertyRowMapper(User.class)` 对返回的数据进行封装，它可自动将一行数据映射到指定类的实例中，首先将这个类实例化，然后通过名称匹配的方式，映射到属性中去。 

UserRowMapper 继承了 `RowMapper`，RowMapper 可以将数据中的每一行数据封装成用户定义的类，实现 RowMapper 接口覆盖 mapRow 方法，在 mapRow 方法封装对数据的返回处理。通过下面代码可以看出 UserRowMapper 循环遍历了查询返回的结果集，遍历的同时按照属性进行赋值。这样在查询使用时只需要传入 new UserRowMapper() 即可自动解析返回数据。

```java
public class UserRowMapper implements RowMapper<User> {
    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();
        user.setId(rs.getLong("id"));
        user.setName(rs.getString("name"));
        user.setPassword(rs.getString("password"));
        user.setAge(rs.getInt("age"));
        return user;
    }
}
```

 

## 测试

在测试类中直接注入 UserRepository  进行测试。

```java
@SpringBootTest
@DisplayName("测试UserRepository")
class JdbcApplicationTests {
    @Autowired
    private UserRepository userRepository;

    @Test
    @DisplayName("增")
    public void testSave() {
        User user =new User();
        user.setName("maxsh");
        user.setPassword("maxsh123");
        user.setAge(28);
        userRepository.save(user);
    }

    @Test
    @DisplayName("改")
    public void testUpdate() {
        User user =new User();
        user.setName("maxsh");
        user.setPassword("maxsh123");
        user.setAge(18);
        user.setId(1L);
        userRepository.update(user);
    }

    @Test
    @DisplayName("查询")
    public void testQueryOne()  {
        User user=userRepository.findById(1L);
        System.out.println("user--->"+user.toString());
    }

    @Test
    @DisplayName("查询全部")
    public void testQueryAll()  {
        List<User> users =userRepository.findALL();
        for (User user:users){
            System.out.println("user---> "+user.toString());
        }
    }

    @Test
    @DisplayName("删除")
    public void testDetele() {
        userRepository.delete(1L);
    }
}
```

# 多数据源的使用

## 配置文件

```properties
spring.datasource.primary.jdbc-url=jdbc:mysql://localhost:3306/test1?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8&useSSL=true
spring.datasource.primary.username=root
spring.datasource.primary.password=root
spring.datasource.primary.driver-class-name=com.mysql.cj.jdbc.Driver

spring.datasource.secondary.jdbc-url=jdbc:mysql://localhost:3306/test2?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8&useSSL=true
spring.datasource.secondary.username=root
spring.datasource.secondary.password=root
spring.datasource.secondary.driver-class-name=com.mysql.cj.jdbc.Driver
```

:::  danger 注意 
  这里使用的是 spring.datasource.*.jdbc-url，因为默认连接池 HikariCP 读取的是 jdbc-url。 
:::

## 配置数据源并初始化JDBC

```java
@Configuration
public class DataSourceConfig {
    @Primary
    @Bean(name = "primaryDataSource")
    @Qualifier("primaryDataSource")
    @ConfigurationProperties(prefix="spring.datasource.primary")
    public DataSource primaryDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "secondaryDataSource")
    @Qualifier("secondaryDataSource")
    @ConfigurationProperties(prefix="spring.datasource.secondary")
    public DataSource secondaryDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name="primaryJdbcTemplate")
    public JdbcTemplate primaryJdbcTemplate (
            @Qualifier("primaryDataSource")  DataSource dataSource ) {
        return new JdbcTemplate(dataSource);
    }

    @Bean(name="secondaryJdbcTemplate")
    public JdbcTemplate  secondaryJdbcTemplate(
            @Qualifier("secondaryDataSource") DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}
```





对UserRepository 中的所有方法进行改造，增加一个参数为 JdbcTemplate，如果方法中传输了 JdbcTemplate，方法内就会使用传递的 JdbcTemplate 进行操作，如果传递的 JdbcTemplate 为空，使用默认的 JdbcTemplate 连接操作。 

```java
@Autowired
private JdbcTemplate primaryJdbcTemplate;

@Override
public int save(User user,JdbcTemplate jdbcTemplate) {
    if(jdbcTemplate == null){
        jdbcTemplate= primaryJdbcTemplate;
    }
    return jdbcTemplate.update("INSERT INTO users(name, password, age) values(?, ?, ?)",
                               user.getName(), user.getPassword(), user.getAge());
}
```



## 测试

```java
@SpringBootTest
@DisplayName("测试多数据源")
class JdbMultiDatasourceApplicationTests {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JdbcTemplate   primaryJdbcTemplate;
    @Autowired
    private JdbcTemplate   secondaryJdbcTemplate;

    @Test
    public void testSave() {
        User user =new User();
        user.setName("maxsh");
        user.setPassword("maxsh123");
        user.setAge(28);
        userRepository.save(user,primaryJdbcTemplate);
        userRepository.save(user,secondaryJdbcTemplate);
    }
}
```

> :smiley: [jdbc源码]( https://github.com/maxsh-io/proj_springboot_case/tree/master/jdbc )
>
> :smiley: [jdbc-multi-datasource源码](  https://github.com/maxsh-io/proj_springboot_case/tree/master/jdb-multi-datasource  )
