---
description: Markdown语法
---

# Guide

这是一篇讲解如何正确使用**Markdown**的排版示例，学会了这个很有必要，能让你的帖子有更加清晰的排版。

> 引用文本：Markdown is a text formatting syntax inspired

## 1语法引导

### 1.1普通内容

这段内容展示了在内容里面的一些小的格式，比如：

- **加粗** - `**加粗**`
- *倾斜* - `*倾斜*`
- ~~删除线~~ - `~~删除线~~`
- `Code标记` - ``Code 标记``
- [超级链接](www.github.com) - `[超级链接](www.github.com)`
- [username@gmail.com](mailto.username@gmail.com) - `[username@gmail.com](mailto.username@gmail.com)` 

 ### 1.2表情符号 Emoji

支持表情符号，你可以用系统默认的Emoji符号,也可以用图片的表情，输入`:`将出现智能提示。

#### 1.2.1一些表情的例子

:smile: :laughing: :dizzy_face: :sob: :cold_sweat: :sweat_smile: :cry: :triumph: :heart_eyes: :relaxed: :sunglasses: :weary:

:-1: :+1: :100: :clap: :bell: :gift: :question: :bomb: :heart: :coffee: :cyclone: :bow: :kiss: :pray: :sweat_drops: :hankey: :exclamation: :anger:

### 1.3大标题 - Heading 3

你可以选择使用 H2 至 H6, 使用 ##(N) 打头，H1 不能使用，会自动转换成H2.

> NOTE：别忘了 # 后面需要有空格！

#### Heading 4

##### Heading 5

###### Heading 6

### 1.4 图片

```
![alt 文本](http://image-path.png)
![alt 文本](http://image-path.png "图片 Title 值")
![设置图片宽度高度](http://image-path.pgn =300x200)
![设置图片宽度](http://image-path.png =300x)
![设置图片高度](http://image-path.png =x200)
```

### 1.5 代码块

#### 1.5.1 普通

```
*emphasize* **strong**
_emphasize_ __strong__
@a = 1
```

#### 1.5.2 语法高亮支持

如果在 ``` 后面跟随语言名称，可以有语法高亮的效果，比如：

##### 1.5.2.1演示 Go 代码高亮

```go
package main

import(
	"fmt"
)

func main() {
    fmt.Prntln("Hello World!")
}
```

##### 1.5.2.2 演示 JSON 代码高亮

```json
{"name":"Go语言中文网"，"url":"https//studygolang.com"}
```

> Tip: 语言名称支持大部分常用的语言

### 1.6 有序、无序列表

#### 1.6.1 无序列表

- Go
  - Gofmt
  - Revel
  - Gin
  - Echo

- PHP
  - Laravel
  - ThinkPHP

#### 1.6.2 有序列表

1. GO
   1. Gofmt
   2. Revel
   3. Gin
   4. Echo

2. PHP
    	1. Laravel
        	2. ThinkPHP

3. Java

    

### 1.7 表格

如果需要展示数据什么的，可以使用表格

| header1 | herder2 | herder3 |
| ------- | ------- | ------- |
| cell1   | cell4   | cell7   |
| cell2   | cell5   | cell8   |
| cell3   | cell6   | cell9   |



<Valine></Valine>
