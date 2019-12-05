---
description: SpringBoot中使用Mybatis

---

# SpringBoot中使用Mybatis

MyBatis 是一款标准的 ORM 框架，被广泛的应用于各企业开发中。MyBatis 最早是 Apache 的一个开源项目 iBatis，2010 年这个项目由 Apache Software Foundation 迁移到了 Google Code，并且改名为 MyBatis，2013 年 11 月又迁移到 Github。

MyBatis 支持普通的 SQL 查询，存储过程和高级映射的优秀持久层框架。MyBatis 消除了几乎所有的 JDBC 代码和参数的手工设置以及对结果集的检索封装。MaBatis 可以使用简单的 XML 或注解用于配置和原始映射，将接口和 Java 的 POJO（Plain Old Java Objects，普通的 Java 对象）映射成数据库中的记录。

**优点**

- SQL 被统一提取出来，便于统一管理和优化
- SQL 和代码解耦，将业务逻辑和数据访问逻辑分离，使系统的设计更清晰、更易维护、更易单元测试
- 提供映射标签，支持对象与数据库的 ORM 字段关系映射
- 提供对象关系映射标签，支持对象关系组件维护
- 灵活书写动态 SQL，支持各种条件来动态生成不同的 SQL

**缺点**

- 编写 SQL 语句时工作量很大，尤其是字段多、关联表多时，更是如此
- SQL 语句依赖于数据库，导致数据库移植性差

### MyBatis 几个重要的概念

**`Mapper 配置`** 可以使用基于 XML 的 Mapper 配置文件来实现，也可以使用基于 Java 注解的 MyBatis 注解来实现，甚至可以直接使用 MyBatis 提供的 API 来实现。

**`Mapper 接口`**是指自行定义的一个数据操作接口，类似于通常所说的 DAO 接口。早期的 Mapper 接口需要自定义去实现，现在 MyBatis 会自动为 Mapper 接口创建动态代理对象。Mapper 接口的方法通常与 Mapper 配置文件中的 select、insert、update、delete 等 XML 结点存在一一对应关系。

**`Executor`**MyBatis 中所有的 Mapper 语句的执行都是通过 Executor 进行的，Executor 是 MyBatis 的一个核心接口。

**`SqlSession`**是 MyBatis 的关键对象，是执行持久化操作的独享，类似于 JDBC 中的 Connection，SqlSession 对象完全包含以数据库为背景的所有执行 SQL 操作的方法，它的底层封装了 JDBC 连接，可以用 SqlSession 实例来直接执行被映射的 SQL 语句。

**`SqlSessionFactory`**是 MyBatis 的关键对象，它是单个数据库映射关系经过编译后的内存镜像。SqlSessionFactory 对象的实例可以通过 SqlSessionFactoryBuilder 对象类获得，而 SqlSessionFactoryBuilder 则可以从 XML 配置文件或一个预先定制的 Configuration 的实例构建出。



```flow
st=>start: 开始框
op1=>operation: 加载配置文件
op2=>operation: 创建会话工厂
op3=>operation: 创建会话
op4=>operation: 创建执行器
op5=>operation: 封装SQL对象
io1=>inputoutput: 输入映射
io2=>inputoutput: 输出映射
e=>end: 结束框
st->op1->op2->op3(right)->op4(right)->op5->io2
```

