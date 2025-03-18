

# 一、乐⾼项⽬调试

* [Zero工程](http://git.qpaas.com/Mage/Zero)

* [Lego 定制开发常见问题](https://blogqpaas.yuque.com/kidsv4/hfh0zt/voqi1ackry4t0x8s#lswLV)

* [Lego NMP](https://open-npm.qpaas.com/)

     



## 简介

​		项⽬遇到问题，直接在线上⽆法调试的情况下。可以和项⽬要源码到本地启动，或者使⽤平台提供的通 

⽤项⽬示例来调试。 

​		通⽤项⽬是模拟项⽬现场的⼀个项⽬，只有⼀些核⼼功能，没有项⽬上⾯⼀些后定制的冗余功能。通过

模拟项⽬代理到项⽬环境，可以在本地对项⽬进⾏调试。从⽽能够快速的找到问题原因。 



## 交接文档 - 项⽬配置 

启动模拟项⽬之前需要修改项⽬⼀些基本配置。需要获取到项⽬的如下配置： 

1. 项⽬平台原⽣地址

2. 项⽬账号密码 

获取到项⽬配置后修改config/server.js⽂件信息。 

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/001.png)

修改完成配置信息后，可以根据项⽬定制类型是view还是form，找到对应⽂件，修改配置信息为项⽬信 

息即可。 

● view对应的⽂件为pages/CommonView/CommonView.vue 

● form对应的⽂件为pages/CommonForm/CommonForm.vue 

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/002.png)

 **项⽬启动** 

配置完成后，使⽤npm run serve即可启动项⽬。 



# 二、工单实战

## 1. 工单截图

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/003.png)



## 2. web端登录

```
http://121.13.219.194:28000/
账号：jzy_admin
密码：11111111

应用地址：http://121.13.219.194:28000/bee/qms/QmsCheckPlanForm?form=426&edit=0&isCopy=0
```



## 3. Zero工程配置（模拟项目）

* [Zero工程](http://git.qpaas.com/Mage/Zero)

### a. 配置server.js文件

获取到项⽬配置后修改config/server.js⽂件信息。 

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/004.png)



### b. 修改应用信息

修改完成配置信息后，可以根据项⽬定制类型是view还是form，找到对应⽂件，修改配置信息为项⽬信息即可。 

● view对应的⽂件为pages/CommonView/CommonView.vue 

● form对应的⽂件为pages/CommonForm/CommonForm.vue 



打开Web端链接，通过 **接口** 查看当前页面的具体信息 `/viewConfig` 或者 `/list` 等等接口：

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/005.png)

根据项目应用对应的信息，修改 `CommonForm.vue ` 文件中的信息：

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/006.png)



### c. 运行项目⭐️

#### Ⅰ. **终端登录Lego npm**

```sh
$ npm login --registry=https://open-npm.qpaas.com/
Username: 15151963160
Password: linxiang123456
Email: (this IS public) 597207909@qq.com
Logged in as 15151963160 on https://open-npm.qpaas.com/.
```



#### Ⅱ. 新建 `.npmrc` 文件

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/007.png)

底部的 `//open-npm.qpaas.com/:_authToken=` 从电脑本地复制 `~/qiyeyun/.npmrc` 

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/008.png)

#### Ⅲ. package.json补全包

Package.json中缺失了很多包，下面的完整的补全包，可以正常跑程序！！！

```json
{
  "name": "zero",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "build-with-analyzer": "cross-env ENABLE_WEBPACK_ANALYZER=1 vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "core-js": "3.6.5",
    "@commonbox/utils": "^0.1.20",
    "@qpaas/vue-plugin-global": "1.1.27",
    "@qycloud/cube": "22.12.37-alpha.0",
    "@qycloud/lego": "22.12.37-alpha.0",
    "element-ui": "^2.15.14",
    "internal-ip": "^6.1.0",
    "jquery": "^3.7.1",
    "sass": "1.26.5",
    "vue": "2.6.12",
    "vue-router": "^3.1.6",
    "vuex": "^3.1.2"
  },
  "devDependencies": {
    "@babel/plugin-transform-modules-commonjs": "^7.2.0",
    "@commitlint/cli": "^7.5.2",
    "@commitlint/config-conventional": "^7.5.0",
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-plugin-eslint": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "@vue/eslint-config-prettier": "6.0.0",
    "babel-eslint": "^10.0.1",
    "babel-loader": "8.0.6",
    "cache-loader": "4.1.0",
    "cross-env": "^5.2.0",
    "css-loader": "1.0.1",
    "eslint": "^5.8.0",
    "eslint-plugin-prettier": "3.4.0",
    "eslint-config-airbnb-base": "^13.1.0",
    "eslint-plugin-import": "^2.16.0",
    "eslint-plugin-vue": "^5.0.0",
    "file-loader": "2.0.0",
    "husky": "^1.3.1",
    "lint-staged": "^8.1.4",
    "moment-locales-webpack-plugin": "^1.0.7",
    "postcss-loader": "3.0.0",
    "postcss-load-config": "^2.1.0",
    "sass-loader": "^7.1.0",
    "url-loader": "1.1.2",
    "vue-loader": "15.8.3",
    "vue-style-loader": "4.1.3",
    "vue-svg-loader": "^0.12.0",
    "vue-template-compiler": "2.6.12",
    "webpack-bundle-analyzer": "^3.1.0"
  },
  "eslintConfig": {
    "root": true
  },
  "lint-staged": {
    "*.{js,vue}": [
      "vue-cli-service lint",
      "git add"
    ]
  },
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
      "pre-commit": "lint-staged"
    }
  },
  "postcss": {
    "plugins": {
      "autoprefixer": {}
    }
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ],
  "engines": {
    "node": ">= 8.12.0"
  }
}
```





#### Ⅲ. 引入lego和cube

##### a. npm包引入

工单web端控制台，查看cube与lego的版本，最好要一致！！！

**后续Cube没有控制台输出！！！**

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/009.png)

```
 "@qycloud/cube": "23.12.1",
 "@qycloud/lego": "23.12.1",
```



##### b. cdn引入 （推荐）

需要修改的地方太多啦！！！

推荐CDN安装，保持 cube 与 lego 版本一致！！

* [**Lego 定制开发常见问题 - 问题七**](https://blogqpaas.yuque.com/kidsv4/hfh0zt/voqi1ackry4t0x8s#KJZ0I)

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/010.png)

```js
<script src="/napi/unpkg/lego-deps.js"></script>
<script src="/napi/unpkg/cube.js"></script>
<script src="/napi/unpkg/lego.js"></script>
```



##### c. cdn引入具体操作

<font color='red' size=5>CDN核心文档：https://docs.qpaas.com/docs/guide/ynlqozp18vn6nvsc</font>

第一步：删除package.json中的npm引入

第二步：index.html 写入代码

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/032.png)



第三步：其他代码中有使用npm包引入的lego和cube的头文件，所以需要重新指向cdn引入的地方。

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/031.png)



第四步：核心，配置webpack，参考文档步骤。



第五步：可能的错误

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/038.png)

【解决】：这个问题是因为使用了CDN导入包，但是又通过老的方式导入`lego.css` 文件。

lego.css 已经通过cdn方式导入了！！如下图

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/039.png)



##### d. 如何查看是否为cdn引入

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/037.png)



#### Ⅳ. 运行

```sh
# 到node 14下安装
$ nvm use 14 
$ pnpm i

# 到node 12下执行
$ nvm use 12
$ npm run serve
```

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/011.png)

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/012.png)

启动完成后，使⽤图⽚中的链接即可打开模拟项⽬。 

这⾥的地址就是server.js⽂件中配置的本地访问host，此host⼀般⽆需修改，只是本地访问⽤，没有其他作⽤。 



地址：

https://dev.safety.sh.coscoshipping.com:8000/   

若打不开，则直接：https://localhost:8000/







#### Ⅴ. 同步Cookie信息 

本地域名和项⽬域名⼀般情况下都不⼀样，cookie不能共享。所以需要把项⽬cookie拷⻉过来。拷⻉的 

值为：

● access_token 

● PHPSESSID 

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/013.png)



同步cookie信息后，即可看到菜单⻚⾯，点击即可进⼊对应类型⻚⾯。 

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/014.png)





#### Ⅵ. 问题汇总

##### 问题一：pnpm安装失败

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/015.png)

**解决：不用pnpm 使用npm**



##### 问题二：npm run 失败

> `npm run serve` 出现如下错。

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/016.png)

**解决： 终止，重新跑一次即可！！！**



### d. 调试技巧

`devtool: source-map`

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/017.png)

原来的值：'none'

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/033.png)



## 4. Lego NPM打包

* [Lego NMP](https://open-npm.qpaas.com/)
* [@qycloud/lego](https://open-npm.qpaas.com/-/web/detail/@qycloud/lego)
  * [@qycloud/cube](https://open-npm.qpaas.com/-/web/detail/@qycloud/cube)

* Lego交接文档 - 《Lego打包模块》



# 三、启业云Lego工程运行

## 1. 两个仓库

* qycloud-main
* qpaas-app-view



## 2. 环境 + 账号

<font color='red' size=5>关闭翻墙代理！！！</font>

```c
https://cidemo.qpaas.com/

// 账号1
qat_admin
qat83752661

// 账号2
qat_master
qat83752661
```



## 3. `qycloud-main` 先运行

1. `$ nvm use 12` ，先把node版本切到12
2. `$ npm install` 
3. `$ npm run serve`

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/018.png)



## 4. `qpaas-app-view` 再运行

1. `vue.config.js` 中 `https: true,`  根据前面的环境地址来确定！
2. `$ nvm use 12` 
3. `$ npm install` 
4. `$ npm run serve`

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/019.png)



两个项目都运行成功后，点击main的链接：https://localhost:7102/

https://localhost:39000/space-yewuceshiqiye/appcenter



# 四、实用技巧

## 1. 查看当前平台的日志信息 - `/napi/publishLog`

http://180.213.3.2:8000/space-kemaihuagonggufenyou/napi/publishLog

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/030.png)



## 2. cdn引入lego和cube

具体可以看『二』



## 3. 组件中心地址

http://10.93.252.11:28000/space-lgxinghuagong/componentcenter



## 4. 应用中心地址

https://www.sinochemlogistics.com/appcenter



## 5. Zero项目配置完成，但还是打不开页面⭐️ 或 403 forbidden

1. 查看 token和cookie
2. 查看 403 请求的 referer 地址是不是源地址，若不是，则需要配置下本地代理



![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/035.png)

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/034.png)





# 五、解决工单的步骤

1. 优先确定版本，优先升级到最新版本
2. 打开页面直接调试
3. 配置Zero项目调试





# 六、如何配置代理

例如只给了一个地址：`https://safety.sh.coscoshipping.com:8000/`

![](/AllFiles/前端文档/1-Lego（全）/Lego项目调试/images/036.png)









