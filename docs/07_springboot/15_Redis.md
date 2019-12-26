---


description: Spring Boot 集成 Redis


---

# Spring Boot 集成 Redis

Redis 是一个速度非常快的非关系数据库（Non-Relational Database），它可以存储键（Key）与 5 种不同类型的值（Value）之间的映射（Mapping），可以将存储在内存的键值对数据持久化到硬盘，可以使用复制特性来扩展读性能，还可以使用客户端分片来扩展写性能。

为了满足高性能，Redis 采用内存（in-memory）数据集（Dataset），根据使用场景，可以通过每隔一段时间转储数据集到磁盘，或者追加每条命令到日志来持久化。持久化也可以被禁用，如果你只是需要一个功能丰富、网络化的内存缓存。

## Redis的数据种类

Redis 数据模型不仅与关系数据库管理系统（RDBMS）不同，也不同于任何简单的 NoSQL 键-值数据存储。Redis 数据类型类似于编程语言的基础数据类型，因此开发人员感觉很自然，每个数据类型都支持适用于其类型的操作，受支持的数据类型包括：

- String（字符串）
- Hash（哈希）
- List（列表）
- Set（集合）
- Zset（Sorted Set：有序集合）



## Redis 的优点

Redis 的优势包括它的速度、对富数据类型的支持、操作的原子性，以及通用性：

- 性能极高，它每秒可执行约 100,000 个 Set 以及约 100,000 个 Get 操作；
- 丰富的数据类型，Redis 对大多数开发人员已知的大多数数据类型提供了原生支持，这使得各种问题得以轻松解决；
- 原子性，因为所有 Redis 操作都是原子性的，所以多个客户端会并发地访问一个 Redis 服务器，获取相同的更新值；
- 丰富的特性，Redis 是一个多效用工具，有非常多的应用场景，包括缓存、消息队列（Redis 原生支持发布/订阅）、短期应用程序数据（比如 Web 会话、Web 页面命中计数）等。



## 快速开始

Spring Boot 1.0 默认使用的是 Jedis 客户端，2.0 替换成了 Lettuce，但如果你从 Spring Boot 1.5.X 切换过来，几乎感受不大差异，这是因为 spring-boot-starter-data-redis 为我们隔离了其中的差异性。

- Lettuce：是一个可伸缩线程安全的 Redis 客户端，多个线程可以共享同一个 RedisConnection，它利用优秀 Netty NIO 框架来高效地管理多个连接。
- Spring Data：是 Spring 框架中的一个主要项目，目的是为了简化构建基于 Spring 框架应用的数据访问，包括非关系数据库、Map-Reduce 框架、云数据服务等，另外也包含对关系数据库的访问支持。
- Spring Data Redis：是 Spring Data 项目中的一个主要模块，实现了对 Redis 客户端 API 的高度封装，使对 Redis 的操作更加便捷。

### 引入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
```

引入 commons-pool 2 是因为 Lettuce 需要使用 commons-pool 2 创建 Redis 连接池。

### application配置

```yaml
spring:
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
```



### 测试一下

在单元测试中，注入 RedisTemplate。String 是最常用的一种数据类型，普通的 key/value 存储都可以归为此类，value 其实不仅是 String 也可以是数字。

> **多次进行 set 相同的 key，键对应的值会被覆盖**。

```java
@SpringBootTest
class RedisApplicationTests {

    @Autowired
    private RedisTemplate redisTemplate;
    @Test
    void contextLoads() {
        redisTemplate.opsForValue().set("maxsh", "666");
        Assertions.assertThat("666").isEqualTo(redisTemplate.opsForValue().get("maxsh"));
    }

}
```



## 各数据类型实践

### String

String是redis最基本的类型，你可以理解成与Memcached一模一样的类型，一个key对应一个value。String类型是二进制安全的。意思是redis的string可以包含任何数据。比如jpg图片或者序列化的对象 或者字符串（包括XML JSON），还有数字（整形 浮点数），二进制（图片 音频 视频），最大不能超过512MB。

https://www.cnblogs.com/leeSmall/p/8344955.html

### Hash

### List

### Set

### ZSet