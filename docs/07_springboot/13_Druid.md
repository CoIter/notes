---


description: Spring Boot 集成 Druid 监控数据源


---

# Spring Boot 集成 Druid 监控数据源

## Druid 是什么

Druid 是 Java 语言中的数据库连接池，Druid 能够提供强大的监控和扩展功能。

- 替换其他 Java 连接池，Druid 提供了一个高效、功能强大、可扩展性好的数据库连接池。

- 可以监控数据库访问性能， Druid 内置提供了一个功能强大的StatFilter插件，能够详细统计 SQL 的执行性能，这对于线上分析数据库访问性能有帮助。

- 数据库密码加密。直接把数据库密码写在配置文件中，这是不好的行为，容易导致安全问题。 DruidDruiver 和 DruidDataSource 都支持 PasswordCallback 。

- SQL 执行日志， Druid 提供了不同的 LogFilter ，能够支持 Common-Logging 、 Log4j 和 JdkLog ，你可以按需要选择相应的 LogFilter ，监控你应用的数据库访问情况。

- 扩展 JDBC ，如果你要对 JDBC 层有编程的需求，可以通过 Druid 提供的 Filter 机制，很方便编写 JDBC 层的扩展插件。

## Spring Boot 中如何使用

目前 Druid 官方为我们提供了两种使用依赖方式，一种是基于传统 Java 工程提供的依赖包

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.1.20</version>
</dependency>
```

还有一种是基于 Spring Boot 提供的依赖包

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.1.20</version>
</dependency>
```

下面的这种依赖包除了包含了上面的那种 Druid 基础包，还包含了 Spring Boot 自动配置的依赖包以及 sl4j-api ，我们在 Spring Boot 中使用 Druid ,当然是使用第二种方式引入依赖。

## 工程实战

### 创建工程druid

pom.xml 如下

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.2.2.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.maxsh</groupId>
    <artifactId>durid</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <java.version>1.8</java.version>
        <druid.version>1.1.20</druid.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>${druid.version}</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

### application 配置

```yaml
server:
  port: 8080
spring:
  application:
    name: druid
  profiles:
    active: pass
  jpa:
    database: mysql
    show-sql: true
    generate-ddl: true
    database-platform: org.hibernate.dialect.MySQL5InnoDBDialect
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        format_sql: true
```

### 数据库密码不加密的配置文件

```yaml
spring:
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    url: jdbc:mysql://localhost:3306/test?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=UTF-8&useSSL=false
    username: root
    password: 123456
    driverClassName: com.mysql.cj.jdbc.Driver
    druid:
      # 连接池的配置信息
      # 初始化时建立物理连接的个数
      initial-size: 3
      # 连接池最小连接数
      min-idle: 3
      # 连接池最大连接数
      max-active: 20
      # 获取连接时最大等待时间，单位毫秒
      max-wait: 60000
      # 申请连接的时候检测，如果空闲时间大于timeBetweenEvictionRunsMillis，执行validationQuery检测连接是否有效。
      test-while-idle: true
      # 既作为检测的间隔时间又作为testWhileIdel执行的依据
      time-between-connect-error-millis: 60000
      # 销毁线程时检测当前连接的最后活动时间和当前时间差大于该值时，关闭当前连接
      min-evictable-idle-time-millis: 30000
      # 用来检测连接是否有效的sql 必须是一个查询语句
      # mysql中为 select 'x'
      # oracle中为 select 1 from dual
      validation-query: select 'x'
      # 申请连接时会执行validationQuery检测连接是否有效,开启会降低性能,默认为true
      test-on-borrow: false
      # 归还连接时会执行validationQuery检测连接是否有效,开启会降低性能,默认为true
      test-on-return: false
      # 是否缓存preparedStatement,mysql5.5+建议开启
      pool-prepared-statements: true
      # 当值大于0时poolPreparedStatements会自动修改为true
      max-pool-prepared-statement-per-connection-size: 20
      # 合并多个DruidDataSource的监控数据
      use-global-data-source-stat: false
      # 配置扩展插件
      filters: stat,wall,slf4j
      # 通过connectProperties属性来打开mergeSql功能；慢SQL记录
      connect-properties: druid.stat.mergeSql=true;druid.stat.slowSqlMillis=5000
      # 定时输出统计信息到日志中，并每次输出日志会导致清零（reset）连接池相关的计数器。
      time-between-log-stats-millis: 300000
      # 配置DruidStatFilter
      web-stat-filter:
        enabled: true
        url-pattern: '/*'
        exclusions: '*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico,/druid/*'
      # 配置DruidStatViewServlet
      stat-view-servlet:
        # 是否启用StatViewServlet（监控页面）默认值为false（考虑到安全问题默认并未启动，如需启用建议设置密码或白名单以保障安全）
        enabled: true
        url-pattern: '/druid/*'
        # IP白名单(没有配置或者为空，则允许所有访问)
        allow: 127.0.0.1,192.168.0.1
        # IP黑名单 (存在共同时，deny优先于allow)
        deny: 192.168.0.128
        # 禁用HTML页面上的“Reset All”功能
        reset-enable: false
        # 登录名
        login-username: admin
        # 登录密码
        login-password: admin
```



### 数据库密码加密的配置文件(默认)

在生产环境中，直接在配置文件中暴露明文密码是一件非常危险的事情，出于两点考虑：对外，即使应用服务被入侵，数据库还是安全的；对内，生产环境的数据库密码理论上应该只有 dba 知道，但是代码都是在代码仓库中放着的，如果密码没有加密，每次发布前 dba 都需要手动修改配置文件后再进行打包编译。

首先，我们需要通过com.alibaba.druid.filter.config.ConfigTools生成数据库密码的密文。在com\alibaba\druid\1.1.20目录下执行如下命令。

```
java -cp druid-1.1.10.jar com.alibaba.druid.filter.config.ConfigTools 123456
```

![项目结构](../screenshot/springboot/01/druid3.png)

这里我们需要将生成的公钥 `publicKey` 和密码 `password` 加入配置文件中， `application-decrypt.yml` 如下：

```yaml
spring:
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    url: jdbc:mysql://localhost:3306/test?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=UTF-8&useSSL=false
    username: root
    # 加密后密文，原密码为 123456
    password: LZ2Wy3ywIqls3hT3vE2lHfmXLjJACo9Kb/PvZT76mrT8X6d1maCx2fCmYfwgy+9DL6qLmoCdgTk35yg+900RZA==
    driverClassName: com.mysql.cj.jdbc.Driver
    druid:
      filter:
        config:
          enabled: true
      connection-properties: config.decrypt=true;config.decrypt.key=MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJZzjIVworfJbos1V+pBJ99fjHoenIjv428+bZiXDZJGVscxiczssS8Lc0TQIW84zmmgTz+OGDIRQ5ImVAhID7cCAwEAAQ==
      # 连接池的配置信息
      # 初始化时建立物理连接的个数
      initial-size: 3
      # 连接池最小连接数
      min-idle: 3
      # 连接池最大连接数
      max-active: 20
      # 获取连接时最大等待时间，单位毫秒
      max-wait: 60000
      # 申请连接的时候检测，如果空闲时间大于timeBetweenEvictionRunsMillis，执行validationQuery检测连接是否有效。
      test-while-idle: true
      # 既作为检测的间隔时间又作为testWhileIdel执行的依据
      time-between-connect-error-millis: 60000
      # 销毁线程时检测当前连接的最后活动时间和当前时间差大于该值时，关闭当前连接
      min-evictable-idle-time-millis: 30000
      # 用来检测连接是否有效的sql 必须是一个查询语句
      # mysql中为 select 'x'
      # oracle中为 select 1 from dual
      validation-query: select 'x'
      # 申请连接时会执行validationQuery检测连接是否有效,开启会降低性能,默认为true
      test-on-borrow: false
      # 归还连接时会执行validationQuery检测连接是否有效,开启会降低性能,默认为true
      test-on-return: false
      # 是否缓存preparedStatement,mysql5.5+建议开启
      pool-prepared-statements: true
      # 当值大于0时poolPreparedStatements会自动修改为true
      max-pool-prepared-statement-per-connection-size: 20
      # 合并多个DruidDataSource的监控数据
      use-global-data-source-stat: false
      # 配置扩展插件
      filters: stat,wall,slf4j
      # 通过connectProperties属性来打开mergeSql功能；慢SQL记录
      connect-properties: druid.stat.mergeSql=true;druid.stat.slowSqlMillis=5000
      # 定时输出统计信息到日志中，并每次输出日志会导致清零（reset）连接池相关的计数器。
      time-between-log-stats-millis: 300000
      # 配置DruidStatFilter
      web-stat-filter:
        enabled: true
        url-pattern: '/*'
        exclusions: '*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico,/druid/*'
      # 配置DruidStatViewServlet
      stat-view-servlet:
        # 是否启用StatViewServlet（监控页面）默认值为false（考虑到安全问题默认并未启动，如需启用建议设置密码或白名单以保障安全）
        enabled: true
        url-pattern: '/druid/*'
        # IP白名单(没有配置或者为空，则允许所有访问)
        allow: 127.0.0.1,192.168.0.1
        # IP黑名单 (存在共同时，deny优先于allow)
        deny: 192.168.0.128
        # 禁用HTML页面上的“Reset All”功能
        reset-enable: false
        # 登录名
        login-username: admin
        # 登录密码
        login-password: admin
```

查看源代码可以看出，ConfigTools加密和解密使用了默认的公钥和私钥

![项目结构](../screenshot/springboot/01/druid4.png)

也可以自己定义加解密规则，通过DruidPasswordCallback完成揭秘验证。

### 数据库密码加密的配置文件(自定义)

> [参考链接](https://blog.csdn.net/Big_Blogger/article/details/79485861)

新建自定义秘钥生成类

```java
public class RSAUtils {

    private static final String ALGORITHM = "RSA";
    private static final String PUBLIC_KEY = "public_key";
    private static final String PRIVATE_KEY = "private_key";
    private static final Map<String, Object> keyMap = new HashMap<String, Object>(2);
    /**
     * 初始化密钥
     *
     * @return
     * @throws Exception
     */
    public static Map<String, Object> initKey() throws Exception {
        KeyPairGenerator keyPairGen = KeyPairGenerator.getInstance(ALGORITHM);
        keyPairGen.initialize(1024);
        KeyPair             keyPair    = keyPairGen.generateKeyPair();
        RSAPublicKey        publicKey  = (RSAPublicKey) keyPair.getPublic();    // 公钥
        RSAPrivateKey       privateKey = (RSAPrivateKey) keyPair.getPrivate();     // 私钥
        keyMap.put(PUBLIC_KEY, publicKey);
        keyMap.put(PRIVATE_KEY, privateKey);
        return keyMap;
    }

    private static String encrypt(String pwd) throws Exception {
        RSAPrivateKey       privateKey = (RSAPrivateKey) keyMap.get(PRIVATE_KEY);
        String privateKeyStr = Base64.byteArrayToBase64(privateKey.getEncoded());
        //加密
        String code = ConfigTools.encrypt(privateKeyStr, pwd);
        return code;
    }

    public static void main(String[] args) throws Exception {
        Map<String, Object> init = initKey();
        System.out.println("public_key--->" + Base64.byteArrayToBase64(((RSAPublicKey) keyMap.get(PUBLIC_KEY)).getEncoded()));
        System.out.println("private_key--->" + Base64.byteArrayToBase64(((RSAPrivateKey) keyMap.get(PRIVATE_KEY)).getEncoded()));
        String encrypt = encrypt("123456");
        System.out.println("encrypt_password--->" + encrypt);
    }
}
```

继承DruidPasswordCallback处理密码

```java
public class DBPasswordCallback extends DruidPasswordCallback {
    private static final String PUBLICKEY = "publicKey";
    private static final String PASSWORD = "password";

    @Override
    public void setProperties(Properties properties) {
        super.setProperties(properties);
        //获取配置文件中加密后的密码，和xml中的connectionProperties属性配置相关
        String publicKey = (String) properties.get(PUBLICKEY);
        String password = (String) properties.get(PASSWORD);
        try {
            //解密过程，ConfigTools为druid自带，提供一些好用的函数
            String dbpassword= ConfigTools.decrypt(publicKey, password);
            //设置密码
            setPassword(dbpassword.toCharArray());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

配置文件修改如下

```properties
spring:
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    url: jdbc:mysql://localhost:3306/test?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=UTF-8&useSSL=false
    username: root
    publicKey: MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgJv/tMSH8NzFqw/6BfQxNTUlwTBjh4rBSMfWJ8hhTmnpDr+Calloj9HHMxEJGyUUmy0/Rl0+snW2k5VZP/7syVQ0VdUbLzcQNi8h7PiK80QRGBc4fp8MiY+HePM7xlt9jjPLaDr3hgzn/tN/pYzXcVPB1K5btaVEpIk/yx0cHawIDAQAB
    driverClassName: com.mysql.cj.jdbc.Driver
    druid:
      filter:
        config:
          enabled: true
      connection-properties: publicKey=${spring.datasource.publicKey};password=B8tmo2+GByNV7vVH2rlO8aetyEqsh8MveoNn6FDCtGy99JHDVo2y3WpsxdRZMZjUuBJ5CluKGh/QB2fOxK07ifeRvGCGLpiR2fVoe4D9Jkpi10bUlUpBJf2nHjKXpf6mrVbd3iMe8T5+AmW6e9EUWaEkcjng+OOepwymUkq5GOg=
      password-callback-class-name: com.maxsh.util.DBPasswordCallback
      # 连接池的配置信息
      # 初始化时建立物理连接的个数
      initial-size: 3
      # 连接池最小连接数
      min-idle: 3
      # 连接池最大连接数
      max-active: 20
      # 获取连接时最大等待时间，单位毫秒
      max-wait: 60000
      # 申请连接的时候检测，如果空闲时间大于timeBetweenEvictionRunsMillis，执行validationQuery检测连接是否有效。
      test-while-idle: true
      # 既作为检测的间隔时间又作为testWhileIdel执行的依据
      time-between-connect-error-millis: 60000
      # 销毁线程时检测当前连接的最后活动时间和当前时间差大于该值时，关闭当前连接
      min-evictable-idle-time-millis: 30000
      # 用来检测连接是否有效的sql 必须是一个查询语句
      # mysql中为 select 'x'
      # oracle中为 select 1 from dual
      validation-query: select 'x'
      # 申请连接时会执行validationQuery检测连接是否有效,开启会降低性能,默认为true
      test-on-borrow: false
      # 归还连接时会执行validationQuery检测连接是否有效,开启会降低性能,默认为true
      test-on-return: false
      # 是否缓存preparedStatement,mysql5.5+建议开启
      pool-prepared-statements: true
      # 当值大于0时poolPreparedStatements会自动修改为true
      max-pool-prepared-statement-per-connection-size: 20
      # 合并多个DruidDataSource的监控数据
      use-global-data-source-stat: false
      # 配置扩展插件
      filters: stat,wall,slf4j
      # 通过connectProperties属性来打开mergeSql功能；慢SQL记录
      connect-properties: druid.stat.mergeSql=true;druid.stat.slowSqlMillis=5000
      # 定时输出统计信息到日志中，并每次输出日志会导致清零（reset）连接池相关的计数器。
      time-between-log-stats-millis: 300000
      # 配置DruidStatFilter
      web-stat-filter:
        enabled: true
        url-pattern: '/*'
        exclusions: '*.js,*.gif,*.jpg,*.bmp,*.png,*.css,*.ico,/druid/*'
      # 配置DruidStatViewServlet
      stat-view-servlet:
        # 是否启用StatViewServlet（监控页面）默认值为false（考虑到安全问题默认并未启动，如需启用建议设置密码或白名单以保障安全）
        enabled: true
        url-pattern: '/druid/*'
        # IP白名单(没有配置或者为空，则允许所有访问)
        allow: 127.0.0.1,192.168.0.1
        # IP黑名单 (存在共同时，deny优先于allow)
        deny: 192.168.0.128
        # 禁用HTML页面上的“Reset All”功能
        reset-enable: false
        # 登录名
        login-username: admin
        # 登录密码
        login-password: admin
```

配置完成后，直接启动项目访问地址：http://localhost:8080/druid，就会出现 Druid 监控后台的登录页面

![项目结构](../screenshot/springboot/01/druid1.png)

输入账户和密码后，就会进入首页，首页会展示项目使用的 JDK 版本、数据库驱动、JVM 相关统计信息。

![项目结构](../screenshot/springboot/01/druid2.png)