(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{213:function(t,s,a){t.exports=a.p+"assets/img/04.d0049eb7.png"},214:function(t,s,a){t.exports=a.p+"assets/img/05.f0f3e07d.png"},215:function(t,s,a){t.exports=a.p+"assets/img/06.8c7a81db.png"},216:function(t,s,a){t.exports=a.p+"assets/img/07.8c3d52e5.png"},217:function(t,s,a){t.exports=a.p+"assets/img/08.82a32574.png"},218:function(t,s,a){t.exports=a.p+"assets/img/09.093ee3bf.png"},219:function(t,s,a){t.exports=a.p+"assets/img/10.bc6acea1.png"},259:function(t,s,a){"use strict";a.r(s);var n=a(2),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"springboot中使用jsp"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#springboot中使用jsp"}},[t._v("#")]),t._v(" SpringBoot中使用jsp")]),t._v(" "),n("h2",{attrs:{id:"项目结构"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#项目结构"}},[t._v("#")]),t._v(" 项目结构")]),t._v(" "),n("p",[t._v("首先看一下添加 JSP 支持后的项目结构：  对比以前的项目结构 main 目录下多了 webapp 目录，用来存放目录 jsp 文件。")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("项目结构\nspring-boot-jsp\n|-- pom.xml\n`-- src\n    |-- main\n    | |-- java\n    | | `-- com\n    | |     `-- maxsh\n    | |         `-- jsp\n    | |-- resources\n    | | |-- application.properties\n    | | |-- static\n    | | `-- templates\n    | `-- webapp\n    |     `-- WEB-INF\n    |         `-- jsp\n    |             `-- hello.jsp\n    `-- test\n        `-- java\n            `-- com\n                `-- maxsh\n                    `-- jsp\n\n")])])]),n("h2",{attrs:{id:"配置文件"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#配置文件"}},[t._v("#")]),t._v(" 配置文件")]),t._v(" "),n("p",[t._v("需要在application.properties配置文件中指定 jsp 的位置和后缀。")]),t._v(" "),n("div",{staticClass:"language-properties extra-class"},[n("pre",{pre:!0,attrs:{class:"language-properties"}},[n("code",[n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("spring.mvc.view.prefix")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[t._v("/WEB-INF/jsp/")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("spring.mvc.view.suffix")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[t._v(".jsp")]),t._v("\n")])])]),n("ul",[n("li",[t._v("spring.mvc.view.prefix 指明 jsp 文件在 webapp 下的哪个目录")]),t._v(" "),n("li",[t._v("spring.mvc.view.suffix 指明 jsp 以什么样的后缀结尾")])]),t._v(" "),n("h2",{attrs:{id:"引入依赖包"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#引入依赖包"}},[t._v("#")]),t._v(" 引入依赖包")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("<dependency>\n    <groupId>org.springframework.boot</groupId>\n    <artifactId>spring-boot-starter-web</artifactId>\n</dependency>\n<dependency>\n    <groupId>javax.servlet</groupId>\n    <artifactId>jstl</artifactId>\n</dependency>\n<dependency>\n    <groupId>org.apache.tomcat.embed</groupId>\n    <artifactId>tomcat-embed-jasper</artifactId>\n</dependency>\n")])])]),n("p",[t._v("jstl 是一个 JSP 标签集合，它封装了 JSP 应用的通用核心功能。")]),t._v(" "),n("p",[t._v("tomcat-embed-jasper 主要用来支持 JSP 的解析和运行。")]),t._v(" "),n("h2",{attrs:{id:"编写页面"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#编写页面"}},[t._v("#")]),t._v(" 编写页面")]),t._v(" "),n("p",[t._v("写一个简单的页面：")]),t._v(" "),n("div",{staticClass:"language-html extra-class"},[n("pre",{pre:!0,attrs:{class:"language-html"}},[n("code",[n("span",{pre:!0,attrs:{class:"token doctype"}},[t._v("<!DOCTYPE html>")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("html")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("lang")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("en"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("body")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    Time:  ${time}\n    "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("br")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    Message: ${message}\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("body")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("html")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),n("p",[t._v("再写一个controller:")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Controller")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("JspController")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@GetMapping")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("welcome")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Map")]),n("span",{pre:!0,attrs:{class:"token generics"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" model"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        model"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("put")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"time"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Date")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        model"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("put")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"message"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"hello Jsp"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"hello"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("p",[n("br"),n("br"),n("br")]),t._v(" "),n("ul",[n("li",[n("strong",[t._v("在 IDEA 中运行")]),t._v(",右键单击项目中的 SpringBootJspApplication| run 命令，启动项目， 在浏览器中访问地址：http://localhost:8080/ ,此时发现返回404")])]),t._v(" "),n("img",{attrs:{src:a(213)}}),t._v(" "),n("p",[t._v("这是因为 Spring Boot JSP 项目需要额外进行一个设置：选择 Edit Configurations 选项，打开 Run/Debug Configurations：")]),t._v(" "),n("img",{attrs:{src:a(214)}}),t._v(" "),n("p",[t._v("然后重启项目就可以正常的访问到页面内了。")]),t._v(" "),n("img",{attrs:{src:a(215)}}),t._v(" "),n("ul",[n("li",[t._v("使用springboot的maven插件启动")])]),t._v(" "),n("img",{attrs:{src:a(216)}}),t._v(" "),n("p",[t._v("或者 cmd 进入项目跟路径下 执行以下命令启动：")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("mvn clean spring-boot:run\n")])])]),n("h2",{attrs:{id:"常用示例"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#常用示例"}},[t._v("#")]),t._v(" 常用示例")]),t._v(" "),n("p",[t._v("在JspController中 定义一个 user() 的方法，设置一些值从后端传递到前端：")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@GetMapping")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/user"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("user")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Map")]),n("span",{pre:!0,attrs:{class:"token generics"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" model"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("HttpServletRequest")]),t._v(" request"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    model"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("put")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"username"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"neo"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    model"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("put")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"salary"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("666")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    request"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("getSession")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("setAttribute")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"count"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"user"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("p",[t._v("新建user.jsp  在 user.jsp 文件头部添加两个标签：")]),t._v(" "),n("div",{staticClass:"language-jsp extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>\n<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %><html lang="en">\n')])])]),n("p",[t._v("引入第一个标签是为了让页面支持中文展示，第二个标签引入表示页面使用 jstl 语法来处理页面逻辑。")]),t._v(" "),n("p",[t._v("可以直接在 jsp 页面中使用 Java 代码，如果是一行 Java 代码使用"),n("code",[t._v("<%= %>")]),t._v("的语法，如果是多行 Java 代码则使用"),n("code",[t._v("<% %>")]),t._v("的语法，For 循环是页面最常用的功能之一，一般用在循环展示表格、列表等，示例如下：")]),t._v(" "),n("div",{staticClass:"language-jsp extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('<!DOCTYPE html>\n<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>\n<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %><html lang="en">\n<body>\n    <h3>一行 Java 代码</h3>\n    <p>\n        今天的日期是: <%=(new java.util.Date())%>\n    </p>\n    <h3>多行 Java 代码</h3>\n    <p>\n        你的 IP 地址是：\n        <%\n            out.println("Your IP address is " + request.getRemoteAddr()+"</br>");\n            out.println("一段代码 ");\n        %>\n    </p>\n</body>\n</html>\n')])])]),n("p",[t._v("页面常常会使用一些逻辑判断，使用 jstl 语法很容易实现这些功能。")]),t._v(" "),n("div",{staticClass:"language-jsp extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('<h3>标签 c:if</h3>\n<c:if test="${username !=null}">\n\t<p>用户名为：${username}<p>\n</c:if>\n')])])]),n("p",[t._v("当有多条件判断时可以使用  "),n("code",[t._v("<c:choose>")]),t._v(" 更方便。")]),t._v(" "),n("div",{staticClass:"language-jsp extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('<h3>标签 c:choose</h3>\n<c:choose>\n    <c:when test="${salary <= 0}">\n        惨不忍睹。\n    </c:when>\n    <c:when test="${salary > 1000}">\n        马马虎虎。\n    </c:when>\n    <c:otherwise>\n        悠然自得。\n    </c:otherwise>\n</c:choose>\n')])])]),n("p",[t._v("JSP 可以通过 include 指令来实现复用的页面， nclude 指令用于在编译阶段包括一个文件，这个指令告诉容器在编译阶段，把其他外部文件的内容合并到当前 JSP 文件中，可在 JSP 页面的任何位置使用 include 指令进行编码。  include 有两种用法："),n("code",[t._v('<%@ include file="relative url"%>')]),t._v("和``。前者是在翻译阶段执行，后者是在请求处理阶段执行；前者叫作静态包含，后者叫作动态包含，会在执行时检查包含内容变化。两者使用语法没有太大区别。")]),t._v(" "),n("p",[t._v("新建一个 footer.jsp 内容如下：")]),t._v(" "),n("div",{staticClass:"language-jsp extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('<!DOCTYPE html>\n<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>\n    <body>\n       I am footer\n    </body>\n</html>\n')])])]),n("p",[t._v("在 user.jsp 页面中引入 footer.jsp：")]),t._v(" "),n("div",{staticClass:"language-jsp extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('<h3>布局</h3>\n<%@include file="footer.jsp"%>\n')])])]),n("p",[t._v("启动项目在浏览器中输入网址：http://localhost:8080/user，页面展示效果如下：")]),t._v(" "),n("img",{attrs:{src:a(217)}}),t._v(" "),n("h2",{attrs:{id:"在tomcat中运行"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#在tomcat中运行"}},[t._v("#")]),t._v(" 在tomcat中运行")]),t._v(" "),n("ol",[n("li",[n("strong",[t._v("在 pom.xml 里设置打包格式为 war。")])])]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("<packaging>war</packaging>\n")])])]),n("ol",{attrs:{start:"2"}},[n("li",[t._v("**排除内嵌的 Tomcat 依赖 **")])]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("<dependency>\n    <groupId>org.springframework.boot</groupId>\n    <artifactId>spring-boot-starter-web</artifactId>\n    \x3c!-- 排除内置容器，排除内置容器导出成 war 包可以让外部容器运行spring-boot项目--\x3e\n    <exclusions>\n        <exclusion>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-tomcat</artifactId>\n        </exclusion>\n    </exclusions>\n</dependency>\n")])])]),n("ol",{attrs:{start:"3"}},[n("li",[n("p",[t._v("**添加Servlet 的支持 **")]),t._v(" "),n("p",[t._v("Spring Boot 项目必须实现 SpringBootServletInitializer 接口的 configure() 方法才能让外部容器运行 Spring Boot 项目，启动类同目录下创建 ServletInitializer 类：")])])]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ServletInitializer")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("SpringBootServletInitializer")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Override")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("protected")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("SpringApplicationBuilder")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("configure")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("SpringApplicationBuilder")]),t._v(" application"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" application"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("sources")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("JspApplication")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("ol",{attrs:{start:"4"}},[n("li",[t._v("**打包发布，在项目根目录执行 maven 命令 **")])]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("mvn clean package\n")])])]),n("ol",{attrs:{start:"5"}},[n("li",[t._v("**将 war 包发布到 Tomcat 即可。 **")])]),t._v(" "),n("img",{attrs:{src:a(218)}}),t._v(" "),n("p",[t._v("将生成的war包放到Tomcat的webapps下，启动tomcat")]),t._v(" "),n("img",{attrs:{src:a(219)}}),t._v(" "),n("blockquote",[n("p",[t._v("😃 ​"),n("a",{attrs:{href:"https://github.com/maxsh-io/proj_springboot_case/tree/master/spring-boot-jsp",target:"_blank",rel:"noopener noreferrer"}},[t._v("源码链接"),n("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=e.exports}}]);