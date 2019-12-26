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

#### 超时失效

Redis 在存入每一个数据的时候都可以设置一个超时时间，过了这个时间就会自动删除数据，这种特性非常适合我们对阶段数据的缓存。

```java
@Test
void test2() throws InterruptedException {
    redisTemplate.opsForValue().set("maxsh", "666", 1000, TimeUnit.MILLISECONDS);
    Thread.sleep(1000);
    boolean exists=redisTemplate.hasKey("maxsh");
    Assertions.assertThat(exists).isFalse();
}
```

#### 删除数据

```java
@Test
public void testDelete() {
    redisTemplate.opsForValue().set("deletekey", "maxsh");
    redisTemplate.delete("deletekey");
    boolean exists = redisTemplate.hasKey("deletekey");
    Assertions.assertThat(exists).isFalse();
}
```

#### 应用场景

- 计数器：string类型的incr和decr命令的作用是将key中储存的数字值加一/减一，这两个操作具有原子性，总能安全地进行加减操作，因此可以用string类型进行计数，如微博的评论数、点赞数、分享数，抖音作品的收藏数，京东商品的销售量、评价数等。

- 分布式锁：string类型的setnx的作用是“当key不存在时，设值并返回1，当key已经存在时，不设值并返回0”，“判断key是否存在”和“设值”两个操作是原子性地执行的，因此可以用string类型作为分布式锁，返回1表示获得锁，返回0表示没有获得锁。例如，为了保证定时任务的高可用，往往会同时部署多个具备相同定时任务的服务，但是业务上只希望其中的某一台服务执行定时任务，当定时任务的时间点触发时，多个服务同时竞争一个分布式锁，获取到锁的执行定时任务，没获取到的放弃执行定时任务。定时任务执行完时通过del命令删除key即释放锁，如果担心del命令操作失败而导致锁一直未释放，可以通过expire命令给锁设置一个合理的自动过期时间，确保即使del命令失败，锁也能被释放。不过expire命令同样存在失败的可能性，如果你用的是Java语言，建议使用JedisCommands接口提供的String set(String key, String value, String nxxx, String expx, long time)方法，这个方法可以将setnx和expire原子性地执行，具体使用方式如下（相信其它语言的Redis客户端也应当提供了类似的方法）。

- 存储对象：利用JSON强大的兼容性、可读性和易用性，将对象转换为JSON字符串，再存储在string类型中，是个不错的选择，如用户信息、商品信息等。

  　　

::: tip 

键值设计：业务名:对象:ID:[属性]

数据库为order, 用户表user，对应的键可为 order:user:1 或order:user:1:name

:::

### Hash

Redis 存储一个 key 会有一个最小内存，不管你存的这个键多小，都不会低于这个内存，因此合理的使用 Hash 可以帮我们节省很多内存。Hash Set 就在哈希表 Key 中的域（Field）的值设为 value。如果 Key 不存在，一个新的哈希表被创建并进行 Hset 操作；如果域（Field）已经存在于哈希表中，旧值将被覆盖。

Hash set 的时候需要传入三个参数，第一个为 key，第二个为 Field，第三个为存储的值。一般情况下 Key 代表一组数据，Field 为 key 相关的属性，而 Value 就是属性对应的值。

```java
@Test
public void testHash() {
    HashOperations<String, Object, Object> hash = redisTemplate.opsForHash();
    hash.put("hash","you","666");
    String value=(String) hash.get("hash","you");
    System.out.println("hash value :"+value);
}
```

### List

Redis List 的应用场景非常多，也是 Redis 最重要的数据结构之一。 使用 List 可以轻松的实现一个队列，List 典型的应用场景就是消息队列，可以利用 List 的 Push 操作，将任务存在 List 中，然后工作线程再用 POP 操作将任务取出进行执行。

```java
@Test
public void testList() {
    ListOperations<String, String> list = redisTemplate.opsForList();
    list.leftPush("list","i");
    list.leftPush("list","am");
    list.leftPush("list","666");
    String value=(String)list.leftPop("list");
    System.out.println("list value :"+value.toString());
}
```

其实 List 有很多 API 可以操作，比如从右侧进行插入队列从右侧进行读取，或者通过方法 range 读取队列的一部分。range 后面的两个参数就是插入数据的位置，输入不同的参数就可以取出队列中对应的数据。

### Set

Redis Set 对外提供的功能与 List 类似是一个列表的功能，特殊之处在于 Set 是可以自动排重的，当你需要存储一个列表数据，又不希望出现重复数据时，Set 是一个很好的选择，并且 Set 提供了判断某个成员是否在一个 Set 集合内的重要接口，这个也是 List 所不能提供的。Redis 为集合提供了求交集(**sinter**)、并集（集合合并去重）(**sunion**)、差集等操作(**sdiff**)，可以非常方便的使用。

```java
@Test
public void testSet() {
    String                        key ="set";
    SetOperations<String, String> set = redisTemplate.opsForSet();
    set.add(key,"i");
    set.add(key,"am");
    set.add(key,"666");
    set.add(key,"666");
    Set<String> values =set.members(key);
    for (String v:values){
        System.out.println("set value :"+v);
    }
}
@Test
public void testDifference() {
    SetOperations<String, String> set = redisTemplate.opsForSet();
    String key1="set1";
    String key2="set2";
    set.add(key1,"i");
    set.add(key1,"am");
    set.add(key1,"am");
    set.add(key1,"666");
    set.add(key2,"am");
    set.add(key2,"666");
    Set<String> diffs=set.difference(key1,key2);
    for (String v:diffs){
        System.out.println("diffs set value :"+v);
    }
}

@Test
public void testUnion() {
    SetOperations<String, String> set = redisTemplate.opsForSet();
    String key3="set3";
    String key4="set4";
    set.add(key3,"i");
    set.add(key3,"am");
    set.add(key3,"maxsh");
    set.add(key4,"and");
    set.add(key4,"his");
    set.add(key4,"666");
    Set<String> unions=set.union(key3,key4);
    for (String v:unions){
        System.out.println("unions value :"+v);
    }
}


@Test
public void testIntersect() {
    SetOperations<String, String> set = redisTemplate.opsForSet();
    String key3="set5";
    String key4="set6";
    set.add(key3,"a","b","v","d","r");
    set.add(key4,"a","c","d","e","f");
    Set<String> unions=set.intersect(key3,key4);
    for (String v:unions){
        System.out.println("value :"+v);
    }
}
```

#### set的应用场景

标签，社交，查询有共同兴趣爱好的人，智能推荐
使用方式：
给用户添加标签：
sadd user:1:fav basball fball pq
sadd user:2:fav basball fball
............

或给标签添加用户
sadd basball:users user:1 user:3
sadd fball:users user:1 user:2 user:3
........

计算出共同感兴趣的人：
sinter user:1:fav user2:fav

### ZSet

Redis Sorted Set 的使用场景与 Set 类似，区别是 Set 不是自动有序的，而 Sorted Set 可以通过用户额外提供一个优先级（Score）的参数来为成员排序，并且是插入有序，即自动排序。

在使用 Zset 的时候需要额外的输入一个参数 Score，Zset 会自动根据 Score 的值对集合进行排序，我们可以利用这个特性来做具有权重的队列，比如普通消息的 Score 为1，重要消息的 Score 为 2，然后工作线程可以选择按 Score 的倒序来获取工作任务。



```java
@Test
public void testZset(){
    String key="zset";
    redisTemplate.delete(key);
    ZSetOperations<String, String> zset = redisTemplate.opsForZSet();
    zset.add(key,"i",1);
    zset.add(key,"am",2);
    zset.add(key,"666",8);
    zset.add(key,"hhh",3);

    Set<String> zsets=zset.range(key,0,3);
    for (String v:zsets){
        System.out.println("zset value :"+v);
    }

    Set<String> zsetB=zset.rangeByScore(key,0,3);
    for (String v:zsetB){
        System.out.println("zsetB value :"+v);
    }
}
```

#### zset的应用场景

排行榜系统，如视频网站需要对用户上传的视频做排行榜

点赞数：zadd user:1:20180106 3 mike  //mike获得3个赞

再获一赞：zincrby user:1:20180106 1 mike  //在3的基础上加1

用户作弊，将用户从排行榜删掉：zrem user:1:20180106 mike

展示赞数最多的5个用户：zrevrangebyrank user:1:20180106  0  4

查看用户赞数与排名：

zscore user:1:20180106 mike  zrank user:1:20180106 mike

> [参考](https://www.cnblogs.com/leeSmall/p/8344955.html)



## 项目中应用

在我们实际的使用过程中，不会给每一个使用的类都注入 redisTemplate 来直接使用，一般都会对业务进行简单的包装，最后提供出来对外使用。





> :smiley:    ​[源码](https://github.com/maxsh-io/proj_springboot_case/tree/master/redis)