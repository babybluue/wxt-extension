# WXT + Vue 3 + Vite

[WXT Next-gen Web Extension Framework](https://wxt.dev/)

### 目录说明

- _wxt.config.ts_ 基本配置文件，包含插件名称/图标的信息配置，以及 WXT/Vite 框架配置信息

- _entrypoints_ 插件主要目录

  - <extension_name>/ 插件启动页面
  - _options_
  - _popup_
  - _background.ts_
  - _\*.content_ 插件 content*script 逻辑，可以根据不同的目的网站划分不同的目录 (\_weibo.content* 微博页面交互，_producer.content_ producer 页面交互)

其他目录同正常项目目录。

### 运行

- yarn dev 运行后，会在 _.output_ 目录下生成插件，在浏览器导入 _.output/chrome-mv3_，随后每次代码更改自动刷新插件，刷新目的页面
