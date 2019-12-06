---


description: SpringBoot集成Mybatis注解版


---

# SpringBoot集成Mybatis（使用注解）

因为最初设计时，MyBatis 是一个 XML 驱动的框架。配置信息是基于 XML 的，而且映射语句也是定义在 XML 中的。而到了 MyBatis 3，就有新选择了。MyBatis 3 构建在全面且强大的基于 Java 语言的配置 API 之上。这个配置 API 是基于 XML 的 MyBatis 配置的基础，也是新的基于注解配置的基础。注解提供了一种简单的方式来实现简单映射语句，而不会引入大量的开销。

> [mybatis3官方介绍](https://mybatis.org/mybatis-3/zh/java-api.html)

## Properties配置

注解版在 application.properties 只需要指明实体类的包路径即可，其他保持不变：

```properties
mybatis.type-aliases-package=com.maxsh.model

spring.datasource.url=jdbc:mysql://localhost:3306/test?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8&useSSL=true
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```



## 传参方式

### 直接使用

在 SQL 中使用 #{id} 来接收同名参数

```java
@Delete("DELETE FROM user WHERE id =#{id}")
void delete(Long id);
```

### 使用 @Param

如果你的映射方法的形参有多个，这个注解使用在映射方法的参数上就能为它们取自定义名字。若不给出自定义名字，多参数则先以 "param" 作前缀，再加上它们的参数位置作为参数别名。例如，#{param1}、#{param2}，这个是默认值。如果注解是 @Param("person")，那么参数就会被命名为 #{person}。

```java
@Select("SELECT * FROM user WHERE sex = #{userSex}")
List<User> getListByUserSex(@Param("userSex") String userSex);
```

### 使用Map

需要传送多个参数时，可以考虑使用 Map：

```java
@Select("SELECT * FROM user WHERE name=#{name} AND sex = #{userSex}")
List<User> getListByNameAndSex(Map<String, Object> map);
```

使用时将参数依次加入到 Map 中即可：

```java
Map param=  new HashMap();
param.put("name","aa");
param.put("userSex","MAN");
List<User> users = userMapper.getListByNameAndSex(param);
```

### 使用对象

最常用的使用方式是直接使用对象：

```java
@Insert("INSERT INTO users(name,password,sex) VALUES(#{name}, #{password}, #{sex})")
void insert(User user);
```



## 注解介绍

**注解版最大的特点是具体的 SQL 文件需要写在 Mapper 类中，取消了 Mapper 的 XML 配置**。

### @Select 注解

@Select 主要在查询的时候使用，查询类的注解，所有的查询均使用这个

```java
@Select("SELECT * FROM user WHERE sex = #{userSex}")
List<User> getListByUserSex(@Param("userSex") String userSex);
```

### @Insert 注解

@Insert，插入数据库时使用，直接传入实体类会自动解析属性到对应的值，

```java
@Insert("INSERT INTO users(name,password,sex) VALUES(#{name}, #{password}, #{sex})")
void insert(User user);
```

### @Update 注解

@Update，所有的更新操作 SQL 都可以使用 @Update。

```java
@Update("UPDATE user SET name=#{name} WHERE id =#{id}")
void update(UserEntity user);
```

### @Delete 注解

@Delete 处理数据删除。

```java
@Delete("DELETE FROM user WHERE id =#{id}")
void delete(Long id);
```

### @Results 和 @Result 注解

这两个注解配合来使用，主要作用是将数据库中查询到的数值转化为具体的字段，修饰返回的结果集，关联实体类属性和数据库字段一一对应，如果实体类属性和数据库属性名保持一致，就不需要这个属性来修饰。

```java
@Select("SELECT * FROM user")
@Results({
    @Result(property = "userSex",  column = "user_sex", javaType = UserSexEnum.class),
    @Result(property = "nickName", column = "nick_name")
})
List<UserEntity> getAll();
```



::: danger  使用` #` 符号和 `$` 符号的不同

使用 # 会对 SQL 进行预处理，使用 `$` 时拼接 SQL，建议使用 `#`，使用 `$` 有 SQL 注入的可能性。

:::



## 动态 SQL

```java
@SelectProvider(type = UserSqlProvider.class, method = "getList")
List<UserEntity> getList(UserParam userParam);
```

```java
class UserSqlProvider{
    private static final Logger log = LoggerFactory.getLogger(UserSqlProvider.class);
    private final String USER = "user";
    public String getList(UserParam userParam) {
        SQL sql = new SQL().SELECT("*").FROM(USER).WHERE(" 1=1 ");
        if (userParam != null) {
            if (!StringUtils.isEmpty(userParam.getName())) {
                sql.AND().WHERE(" name= #{name}");
            }
            if (!StringUtils.isEmpty(userParam.getSex())) {
                sql.AND().WHERE(" sex = #{sex}");
            }
        }
        return sql.toString();
    }

    public String getCount(UserParam userParam) {
        String sql= new SQL(){{
            SELECT("count(1)");
            FROM(USER);
            if (!StringUtils.isEmpty(userParam.getName())) {
                WHERE("name = #{name}");
            }
            if (!StringUtils.isEmpty(userParam.getSex())) {
                WHERE("sex = #{sex}");
            }
            //从这个toString可以看出，其内部使用高效的StringBuilder实现SQL拼接
        }}.toString();

        log.info("getCount sql is :" +sql);
        return sql;
    }
}
```

- type：动态生成 SQL 的类
- method：类中具体的方法名

其中拼接sql可以使用StringBuilder自行拼接，也可以使用mybatis提供的结构化的SQL。

> 更多结构化的 SQL 语法请参考 [SQL 语句构建器类](http://www.mybatis.org/mybatis-3/zh/statement-builders.html)。