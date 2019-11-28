# Maxsh的笔记
[![GitHub issues](https://img.shields.io/github/issues/maxsh-io/notes)](https://github.com/maxsh-io/notes/issues)
[![GitHub forks](https://img.shields.io/github/forks/maxsh-io/notes)](https://github.com/maxsh-io/notes/network)
[![GitHub stars](https://img.shields.io/github/stars/maxsh-io/notes)](https://github.com/maxsh-io/notes/stargazers)
[![GitHub license](https://img.shields.io/github/license/maxsh-io/notes)](https://github.com/maxsh-io/notes/blob/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/url?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fmaxsh-io%2Fnotes)

## 介绍
用 **vuepress**记录学习笔记 。参考文档： https://vuepress.vuejs.org/ 

- 安装使用vuepress

```
# 将 VuePress 作为一个本地依赖安装
yarn add -D vuepress # 或者：npm install -D vuepress

# 新建一个 docs 文件夹
mkdir docs

# 新建一个 markdown 文件
echo '# Hello VuePress!' > docs/README.md

# 开始写作
npx vuepress dev docs
```

- 开始写作

在  `package.json` 里加一些脚本 

```
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

 然后就可以开始写作了: 

```bash
yarn docs:dev # 或者：npm run docs:dev
```



## 本项目的安装运行

```
git clone https://github.com/maxsh-io/notes.git
cd notes
npm install
npm run dev
```



## 编译部署

修改项目中的deploy.sh中的

```
# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
```

或者进入dist文件夹把生成的文件放到你的web服务器上。
