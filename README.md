# React Isomorphic Starter Kit

## About

基于React前后端同构且更精简的脚手架。  

## Installation

```bash
npm install
```

## Running Dev Server

```bash
npm run dev
```
and base production...  

## Building and Running Production Server

```bash
npm run build
npm run start
```

## Explanation

### Default config

环境变量

### Client routing

- 路由basename
- 路由path

### Server routing

- 前端路由匹配
- 后端渲染/特定页面渲染路由

### Client-side

- 后端渲染时 `window.__data` 初始状态的应用
- 静态页面组件(404等)

### Server-side

- es6/es7/import
- 后端渲染及数据

#### Data Fetching

异步问题 [redux-async-connect](https://www.npmjs.com/package/redux-async-connect) 解决方式。


### Redux Middleware

- redux-thunk
- redux-saga
