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

| 请求   | url        | 说明           |
| ------ | ---------- | -------------- |
| get    | /users     | 获取所有用户   |
| post   | /user      | 创建一个用户   |
| put    | /user      | 修改用户       |
| patch  | /user/name | 修改用户的name |
| get    | /user/id   | 根据id获取用户 |
| delete | /user/id   | 根据id删除用户 |



## 快速上手



## 进行测试
