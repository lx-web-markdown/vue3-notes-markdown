* Demo：`./Zero-中安舟山`



# 一、Zero工程配置（模拟项目）

<font size=6 color='red'>与《Lego项目调试》中 `二 - 3` 步骤差不多</font>

## a. 实用接口

* 查看当前平台的日志信息：`/napi/publishLog`
* 组件中心地址：`/componentcenter`
* 应用中心地址：`/appcenter`



## b. 相关链接

* [Zero工程](http://git.qpaas.com/Mage/Zero)
* [Lego 定制开发常见问题](https://blogqpaas.yuque.com/kidsv4/hfh0zt/voqi1ackry4t0x8s#lswLV)
* [Lego NMP](https://open-npm.qpaas.com/)



## 1. 拷贝一个全新的Zero工程



## 2. 配置server.js文件

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/Zero项目从零配置npm版/images/001.png)



## 3. 配置 hosts

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/Zero项目从零配置npm版/images/002.png)



## 4. 修改代码中 - 应用信息

修改完成配置信息后，可以根据项⽬定制类型是 `view` 还是 `form`，找到对应⽂件，修改配置信息为项⽬信息即可。 

● **`view` 对应的⽂件为 `pages/CommonView/CommonView.vue`**

● **`form` 对应的⽂件为 `pages/CommonForm/CommonForm.vue`**

打开Web端链接，通过 **接口** 查看当前页面的具体信息 `/viewConfig` 或者 `/list` 等等接口：

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/Zero项目从零配置npm版/images/003.png)

根据项目应用对应的信息，修改 `CommonForm.vue ` 文件中的信息：

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/Zero项目从零配置npm版/images/004.png)



## 5. 补全 `package.json` 文件

`package.json` 中缺失了很多包，下面的完整的补全包，可以正常跑程序！！！

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
    "@qpaas/vue-plugin-global": "1.1.35",
    "@qycloud/cube": "23.12.5",
    "@qycloud/lego": "23.12.5",
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



## 6. 终端登录 `open-npm`

```sh
$ npm login --registry=https://open-npm.qpaas.com/
Username: 15151963160
Password: linxiang123456
Email: (this IS public) 597207909@qq.com
Logged in as 15151963160 on https://open-npm.qpaas.com/.
```



## 7. 选择node版本，运行

```sh
# 选择合适的版本
$ nvm use 18 or 14 or 12

# 安装运行
$ pnpm install
$ pnpm run serve
```



![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/Zero项目从零配置npm版/images/005.png)

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/Zero项目从零配置npm版/images/006.png)

启动完成后，使⽤图⽚中的链接即可打开模拟项⽬。 

这⾥的地址就是server.js⽂件中配置的本地访问host，此host⼀般⽆需修改，只是本地访问⽤，没有其他作⽤。 

* 地址：https://dev.safety.sh.coscoshipping.com:8000/ 

* 若打不开，则直接：https://localhost:8000/



## 8. 同步Cookie

本地域名和项⽬域名⼀般情况下都不⼀样，cookie不能共享。所以需要把项⽬cookie拷⻉过来。拷⻉的 

值为：

● access_token 

● PHPSESSID 

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/Zero项目从零配置npm版/images/007.png)



## 9. 进入页面

同步cookie信息后，即可看到菜单⻚⾯，点击即可进⼊对应类型⻚⾯。 

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/Zero项目从零配置npm版/images/008.png)





# 二、问题汇总

## 1. pnpm安装失败

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/Zero项目从零配置npm版/images/009.png)

**解决：不用pnpm 使用npm**



## 2. npm run 失败

> `npm run serve` 出现如下错。

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/Zero项目从零配置npm版/images/010.png)

**解决： 终止，重新跑一次即可！！！**













