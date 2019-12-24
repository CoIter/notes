---


description: Spring Boot 集成 Memcache


---

# Spring Boot 集成 Memcache

## Memcache 介绍

Memcache 是一个自由和开放源代码、高性能、分配的内存对象缓存系统。简单来说，Memcache 是一个高性能的分布式内存对象的 key-value 缓存系统，用于加速动态 Web 应用程序，减轻数据库负载，现在也有很多人将它作为内存式数据库在使用。

它可以应对任意多个连接，使用非阻塞的网络 IO，由于它的工作机制是在内存中开辟一块空间，然后建立一个 Hash 表，Memcached 自动管理这些 Hash 表。

Memcache 由国外社区网站 LiveJournal 开发团队开发，设计理念就是小而强大，它简单的设计促进了快速部署、易于开发并解决面对大规模的数据缓存的许多难题，而所开放的 API 使得 Memcache 能用于 Java、C/C++/C#、Perl、Python、PHP、Ruby 等大部分流行的程序语言。

:::tip Memcache 和 Memcached 的区别

Memcache 是这个项目的名称，而 Memcached 是服务器端的主程序名称。

:::

## Memcache 特点

### 协议简单

Memcache 的服务端客户端通信使用简单的文本协议，通过 Telnet 即可在 Memcached 上存取数据。

### 基于 Libevent 的事件处理

Libevent 是一套跨平台的事件处理接口的封装，能够兼容包括这些操作系统：Windows/Linux/BSD/Solaris 等操作系统的的事件处理，包装的接口包括：poll、select（Windows）、epoll（Linux）、kqueue（BSD）/dev/pool（Solaris）。

Memcache 使用 Libevent 来进行网络并发连接的处理，能够保持在很大并发情况下，仍旧能够保持快速的响应能力。

### 内置内存存储方式

Memcache 中保存的数据都存储在 Memcache 内置的内存存储空间中。由于数据仅存在于内存中，因此重启 Memcache、重启操作系统会导致数据全部丢失。Memcache LRU（Least Recently Used）算法自动删除不使用的缓存，不过这个功能是可以配置的，Memcache 启动时通过“-M”参数可以禁止 LRU。不过，Memcache 本身是为缓存而设计的，建议开启 LRU。

### 不适应场景

- 缓存对象不能大于 1 MB
- key 的长度大于 250 字符
- Memcache 未提供任何安全策略
- 不支持持久化

## Memcache 客户端

Memcached Client 目前有 3 种：

- Memcached Client for Java（已经停止更新）
- SpyMemcached（已经停止更新）
- XMemcached（主流使用）

Memcached Client for Java 比 SpyMemcached 更稳定、更早、更广泛；SpyMemcached 比 Memcached Client for Java 更高效；XMemcached 比 SpyMemcache 并发效果更好。



### Spymemcached 介绍

Spymemcached 是一个采用 Java 开发的异步、单线程的 Memcached 客户端，使用 NIO 实现。Spymemcached 是 Memcached 的一个流行的 Java Client 库，性能表现出色，广泛应用于 Java + Memcached 项目中。

Spymemcached 最早由 Dustin Sallings 开发，Dustin 后来和别人一起创办了 Couchbase（原NorthScale），职位为首席架构师，2014 年加入 Google。

### XMemcached 简介

现在使用最广泛的 Memcache Java 客户端是 XMemcached，它是一个新的 Java Memcache Client 。Memcached 通过它的自定义协议与客户端交互，而 XMemcached 就是它的一个 Java 客户端实现。XMemcached 支持设置连接池、宕机报警、使用二进制文件、一致性哈希算法、进行数据压缩等操作，总结如下：

- 高性能，由 Nio 支持；
- 协议完整，Xmemcached 支持所有的 Memcached 协议，包括 1.4.0 正式开始使用的二进制协议；
- 支持客户端分布，提供了一致性哈希（Consistent Hash）算法的实现；
- 允许设置节点权重，XMemcached 允许通过设置节点的权重来调节 Memcached 的负载，设置的权重越高，该 Memcached 节点存储的数据将越多，所承受的负载越大；
- 动态增删节点，Memcached 允许通过 JMX 或者代码编程实现节点的动态添加或者移除，方便用户扩展和替换节点等；
- XMemcached 通过 JMX 暴露的一些接口，支持 Client 本身的监控和调整，允许动态设置调优参数、查看统计数据、动态增删节点等；
- 支持客户端连接池，对同一个 Memcached 可以创建 N 个连接组成连接池来提高客户端在高并发环境下的表现，而这一切对使用者来说却是透明的；
- 可扩展性，XMemcached 是基于 Java Nio 框架 Yanf4j 实现的，因此在实现上结构相对清楚，分层比较明晰。

## 工程实战

添加依赖包：

```xml
<dependency>
    <groupId>com.googlecode.xmemcached</groupId>
    <artifactId>xmemcached</artifactId>
    <version>2.4.5</version>
</dependency>
```

添加配置文件

```properties
# 单个 Memcached 配置
memcached.servers=192.168.0.161:11211
# 连接池
memcached.poolSize=10
#操作超时时间
memcached.opTimeout=6000
```

配置 Memcached 的地址和端口号、连接池和操作超时时间，使用集群时可以拼接多个地址：**"host1:port1 host2:port2 …"**。

创建 XMemcachedProperties 类，读配置信息：

```java
@Component
@ConfigurationProperties(prefix = "memcached")
@Data
public class XMemcachedProperties {
    private String servers;
    private int poolSize;
    private long opTimeout;
}
```


初始化Memcached 。

```java
@Configuration
@Slf4j
public class MemcachedConfig {
    @Autowired
    private XMemcachedProperties xMemcachedProperties;

    @Bean
    public MemcachedClient getMemcachedClient() {
        MemcachedClient memcachedClient = null;
        try {
            MemcachedClientBuilder builder = new XMemcachedClientBuilder(AddrUtil.getAddresses(xMemcachedProperties.getServers()));
            builder.setConnectionPoolSize(xMemcachedProperties.getPoolSize());
            builder.setOpTimeout(xMemcachedProperties.getOpTimeout());
            memcachedClient = builder.build();
        } catch (IOException e) {
            log.error("inint MemcachedClient failed ",e);
        }
        return memcachedClient;
    }
}
```

测试一下

```java
@SpringBootTest
class MemcacheApplicationTests {

    @Autowired
    private MemcachedClient memcachedClient;

    @Test
    void test() throws Exception{
        memcachedClient.set("hello", 0, "Hello,xmemcached");
        String value = memcachedClient.get("hello");
        System.out.println("hello=" + value);
        memcachedClient.delete("hello");
    }

}
```

存储数据是通过 set 方法，它有三个参数，第一个是存储的 key 名称，第二个是 expire 时间（单位秒），超过这个时间，memcached 将这个数据替换出去，0 表示永久存储（默认是一个月），第三个参数就是实际存储的数据，可以是任意的 Java 可序列化类型。

获取存储的数据是通过 get 方法，传入 key 名称即可；如果要删除存储的数据，可以通过 delete 方法，它也是接受 key 名称作为参数。

执行 testMemcached() 单元测试之后，控制台会输出：

```
hello=Hello,xmemcached
```

证明 Memcached 配置、设置和获取值成功。

## XMemcached 语法介绍