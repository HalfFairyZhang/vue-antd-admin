# 项目使用指南

## 1、修改工程
把文件名改成自己想要的工程名，
修改\src\layout\components\Sidebar\Logo.vue 里面的项目名和项目图标
修改\src\components\ErrorLog\index.vue 禁用错误日志
修改\e.config.js里面的proxy代理参数，代理到自己的服务器
\src\api用于存放所有的请求地址
\src\utils\request.js 请求拦截器，设置路由前缀和错误码处理
## 2、启动项目
### 安装依赖
```
yarn install
```
### 启动服务
```
yarn serve
```
### 编译正式环境
```
yarn build
```
### 自定义配置
See [Configuration Reference](https://cli.vuejs.org/config/).
