# 一、使用中安舟山的项目做实践

* 原始包：zsgkpt-main.zip
* 修改完成包：zsgkpt-main-cdn.zip



* 启业云开发者中心：https://docs.qpaas.com/docs/guide/ynlqozp18vn6nvsc

* Open-npm
    * https://open-npm.qpaas.com/-/web/detail/@qpaas/vue-plugin-global
    * https://open-npm.qpaas.com/-/web/detail/@qycloud/lego



## 1. 工单：GD2025030400118

* 标题：平台更新后定制页面报错

* 环境地址：https://www.zhonganhse.com/bee/za/web/

* 测试账号&密码
    * 账号：zqh
    * 密码： Zz18857330735qh
    * 容器 - 应用：鼎实容器 - 人员管理

* 问题应用路径
    * https://www.zhonganhse.com/open/bee?url=%2Fbee%2Fza%2Fweb%2Frenyuanguanli



# 二、具体修改步骤

## 1. 先运行原始项目

### a. 指定node版本

```sh
$ nvm use 12
Now using node v12.22.12 (npm v6.14.16)
```

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/老项目Lego从npm转cdn - 2025/images/001.png)



### b. 安装包 - `pnpm install`

```sh
$ pnpm install
```

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/老项目Lego从npm转cdn - 2025/images/002.png)



### c. 登录 `open-npm`

```sh
$ npm login --registry=https://open-npm.qpaas.com/
Username: 151519660
Password: linxiang333
Email: (this IS public) 597209@qq.com
```



### d. 仍报错 - 使用 `npm`， 成功

解决：不用pnpm 使用npm

```sh
$ npm install
```



### e. 配置Hosts

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/老项目Lego从npm转cdn - 2025/images/010.png)



### f. 运行

```sh
$ npm run serve
```

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/老项目Lego从npm转cdn - 2025/images/003.png)

* 打开地址：https://dev.zhonganhse.com:8080/bee/za/web/

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/老项目Lego从npm转cdn - 2025/images/004.png)





## 2. 开始替换cdn

### a. `config/external.js`

```js
'@qycloud/lego': {
	name: 'lego',
	resources: () => ({
  		scripts: [],
	  	styles: [],
	    resources: [],
	}),
},
```

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/老项目Lego从npm转cdn - 2025/images/005.png)





```js
    importStyles.push(
      `<link rel="stylesheet" href="/napi/unpkg/lego.css">`
    );
    importScripts.push(
      `<script src="/napi/unpkg/global.js"></script>`
    );
    importScripts.push(
      `<script src="/napi/unpkg/lego-deps.js"></script>`
    );
    importScripts.push(
      `<script src="/napi/unpkg/lego.js"></script>`
    );
```

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/老项目Lego从npm转cdn - 2025/images/006.png)



### b. `package.json` 

* 开发环境，仍使用npm安装包

```js
    "@qpaas/vue-plugin-global": "1.1.27",
    "@qycloud/lego": "23.12.1",
    "@qycloud/cube": "23.12.1",
```

* 打包生产环境，则使用上面修改的cdn。



### c. 运行

```sh
$ npm run serve
# 提示需要安装 `moment` 库。

$ npm add moment -S
```

再运行，成功！！！

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/老项目Lego从npm转cdn - 2025/images/007.png)



### d. 打开web

* 项目真实地址：

    * https://www.zhonganhse.com/space-dadingyouchuyouxiang/user/workbench

    * https://www.zhonganhse.com/bee/za/web/renyuanguanli

* 测试账号&密码

    * 账号：zqh
    * 密码： Zz18857330735qh
    * 容器 - 应用：鼎实容器 - 人员管理

* 开发地址：

    * https://dev.zhonganhse.com:8080/bee/za/web/
    * https://dev.zhonganhse.com:8080/bee/za/web/renyuanguanli



直接打开 `https://dev.zhonganhse.com:8080/bee/za/web/` 输入账号密码，

再打开定制应用地址：`https://dev.zhonganhse.com:8080/bee/za/web/renyuanguanli`

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/老项目Lego从npm转cdn - 2025/images/008.png)

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/老项目Lego从npm转cdn - 2025/images/009.png)





