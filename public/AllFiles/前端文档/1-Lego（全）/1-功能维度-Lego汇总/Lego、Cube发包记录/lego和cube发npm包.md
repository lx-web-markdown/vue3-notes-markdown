* qpaas-app-view：http://git.qpaas.com/micro-apps/qpaas-app-view.git

* lego NPM：https://open-npm.qpaas.com/-/web/detail/@qycloud/lego
* 查看 lego/cube 版本：
    * `$ pnpm view @qycloud/cube versions`
    * `$ pnpm view @qycloud/cube@23.12`



# 一、Lego、Cube打包发布

## 第一步：切到对应分支，`stable_v23.12`



## 第二步：修改版本信息

* lego的package.json   <font color='red'>（不需要改任何东西，自动改）</font>
    * lego：packages/lego/package.json
    * cube：packages/cube/package.json

* lego、cube标签输出⽂件位置 <font color='red'>（需要改）</font>
    * lego：packages/lego/src/versionRegistry.js
    * cube：packages/cube/src/versionRegistry.js
    
    ![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/Lego、Cube发包记录/images/003.png)



## 第三步：安装、打包

```sh
# node版本14，安装与打包都在14下，之前安装在14下，打包在12下运行失败！！！原因未知
$ nvm use 14
```

* lego

    ```sh
    
    $ cd packages/lego/ # 进⼊⽬录
    $ pnpm i # 安装依赖
    $ npm run build #打包
    ```

* cube

    ```sh
    $ cd packages/cube # 进⼊⽬录
    $ pnpm i # 安装依赖
    $ npm run build # 打包
    ```


### 问题

`Package.json` 如果没有 `webpack` 需要手动写，具体看下面 **问题** ！！



## 第四步：发布NPM包 

### 方式一：

打包完成后，就需要对包进⾏发布。可以直接使⽤npm发布命令npm publish，但是此操作需要⼿动更新 

package.json版本号，⽐较繁琐。 

平台使⽤⾃动发包⼯具lerna进⾏发布。 

只需要进⼊项⽬根⽬录（qpaas-app-view⽬录），执⾏命令npx lerna publish按照提示下⼀步⼀下步即可。



### 方式二：未尝试

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/Lego、Cube发包记录/images/004.png)









# 二、过程中遇到的问题

**问题一：package.json中缺少`vue` 、`webpack`等安装包**

解决：从工程的`package.json`中复制确实的包，到lego路径下的`package.json`中

```json
{
  "name": "@qycloud/lego",
  "version": "22.3.62",
  "description": "启业云业务UI组件",
  "dependencies": {
    "vue": "2.6.10"
  },
  "devDependencies": {
    "webpack": "4.28.4"
  }
}
```



**问题二：node版本问题**

Zero项目中，使用node14 安装包，node 12运行项目；

在lego/cube中，开始也是这么操作的，报错。

解决：全程使用node14。











# 三、2024.11.25 发包修改截图

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/Lego、Cube发包记录/images/010.png)

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/Lego、Cube发包记录/images/011.png)

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/Lego、Cube发包记录/images/012.png)

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/Lego、Cube发包记录/images/013.png)

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/Lego、Cube发包记录/images/014.png)





















