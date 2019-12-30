---


description: Redis 实现Session共享


---

# Redis 实现Session共享

**什么是 Session**

由于 HTTP 协议是无状态的协议，因而服务端需要记录用户的状态时，就需要用某种机制来识具体的用户。Session 是另一种记录客户状态的机制，不同的是 Cookie 保存在客户端浏览器中，而 Session 保存在服务器上。客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上，这就是 Session。客户端浏览器再次访问时只需要从该 Session 中查找该客户的状态就可以了。



在分布式或者微服务架构中，往往由多个服务共同支撑前端请求，如果涉及到用户状态就需要考虑分布式 Session 管理问题，比如用户登录请求分发在服务器 A，用户购买请求分发到了服务器 B， 那么服务器就必须可以获取到用户的登录信息，否则就会影响正常交易。因此，在分布式架构或微服务架构下，必须保证一个应用服务器上保存 Session 后，其他应用服务器可以同步或共享这个 Session。

目前主流的分布式 Session 管理有两种方案。

- [x] **Session 复制**

部分 Web 服务器能够支持 Session 复制功能，如 Tomcat。用户可以通过修改 Web 服务器的配置文件，让 Web 服务器进行 Session 复制，保持每一个服务器节点的 Session 数据都能达到一致。

这种方案的实现依赖于 Web 服务器，需要 Web 服务器有 Session 复制功能。当 Web 应用中 Session 数量较多的时候，每个服务器节点都需要有一部分内存用来存放 Session，将会占用大量内存资源。同时大量的 Session 对象通过网络传输进行复制，不但占用了网络资源，还会因为复制同步出现延迟，导致程序运行错误。

- [x] **Session 集中存储**

在单独的服务器或服务器集群上使用缓存技术，如 Redis 存储 Session 数据，集中管理所有的 Session，所有的 Web 服务器都从这个存储介质中存取对应的 Session，实现 Session 共享。将 Session 信息从应用中剥离出来后，其实就达到了服务的无状态化，这样就方便在业务极速发展时水平扩充。

Spring 官方针对 Session 管理这个问题，提供了专门的组件 Spring Session，使用 Spring Session 在项目中集成分布式 Session 非常方便。

## Spring Session

Spring Session 提供了一套创建和管理 Servlet HttpSession 的方案。Spring Session 提供了集群 Session（Clustered Sessions）功能，默认采用外置的 Redis 来存储 Session 数据，以此来解决 Session 共享的问题。

Spring Session 为企业级 Java 应用的 Session 管理带来了革新，使得以下的功能更加容易实现：

- API 和用于管理用户会话的实现；
- HttpSession，允许以应用程序容器（即 Tomcat）中性的方式替换 HttpSession；
- 将 Session 所保存的状态卸载到特定的外部 Session 存储中，如 Redis 或 Apache Geode 中，它们能够以独立于应用服务器的方式提供高质量的集群；
- 支持每个浏览器上使用多个 Session，从而能够很容易地构建更加丰富的终端用户体验；
- 控制 Session ID 如何在客户端和服务器之间进行交换，这样的话就能很容易地编写 Restful API，因为它可以从 HTTP 头信息中获取 Session ID，而不必再依赖于 cookie；
- 当用户使用 WebSocket 发送请求的时候，能够保持 HttpSession 处于活跃状态。

需要说明的很重要的一点就是，Spring Session 的核心项目并不依赖于 Spring 框架，因此，我们甚至能够将其应用于不使用 Spring 框架的项目中。Spring 为 Spring Session 和 Redis 的集成提供了组件：spring-session-data-redis。

## 工程实战

添加依赖

```xml
<dependency>
    <groupId>org.springframework.session</groupId>
    <artifactId>spring-session-data-redis</artifactId>
</dependency>
```

配置文件

```yaml
spring:
  # 数据库配置
  datasource:
    url: jdbc:mysql://localhost:3306/test?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8&useSSL=true
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver
  # Redis 配置
  redis:
    database: 0 # Redis 数据库索引（默认为 0）
    host: localhost # Redis 服务器地址
    port: 6379 # Redis 服务器连接端口
    password: # Redis 服务器连接密码（默认为空）
    lettuce:
      pool:
        max-active: 8 # Redis 服务器连接密码（默认为空）
        max-wait: -1 # 连接池最大阻塞等待时间（使用负值表示没有限制） 默认 -1
        max-idle: 8 # 连接池中的最大空闲连接 默认 8
        min-idle: 0 # 连接池中的最小空闲连接 默认 0
  # JPA 配置
  jpa:
    properties:
      hibernate:
        hbm2ddl:
          auto: create
        dialect: org.hibernate.dialect.MySQL5InnoDBDialect
    show-sql: true
```



session配置

```java
@Configuration
@EnableRedisHttpSession(maxInactiveIntervalInSeconds = 86400*30)
public class SessionConfig {
}
```



::: warning 注意

maxInactiveIntervalInSeconds: 设置 Session 失效时间，使用 Redis Session 之后，原 Spring Boot 中的 server.session.timeout 属性不再生效。

:::