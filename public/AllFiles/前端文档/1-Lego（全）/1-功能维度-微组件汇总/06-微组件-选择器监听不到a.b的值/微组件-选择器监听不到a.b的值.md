# 工单：GD2025030500074

* 陕西隆基绿能EHS信息化管理系统

* 描述：设计器里，使用微组件选择器功能，选择宽度，只有两个字段能拿到宽度值a.b，其余字段拿不到
* 环境地址
    * http://njswjteqxm-wuyouxiangmu2212fuwu-gqhdlz.k8s-assembly-machine.qpaas.com/
* 测试账号&密码：admin_tnkg / aykj8888

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-微组件汇总/06-微组件-选择器监听不到a.b的值/images/001.png)



## 组件：customOrgField.zip

当前目录下：customOrgField.zip



## 排查步骤

### Demo工程

* `work/my_lego_demo/MicroDemo/MicroComp002`



### 1. 创建两个选择器组件

```sh
$ qpaas ui
```

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-微组件汇总/06-微组件-选择器监听不到a.b的值/images/002.png)



### 2. 打开工程，查看json

#### a. 对比 - 两个DSelect

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-微组件汇总/06-微组件-选择器监听不到a.b的值/images/003.png)

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-微组件汇总/06-微组件-选择器监听不到a.b的值/images/004.png)



#### b. 对比 - DSelect 与 DCheckbox

> 结论：对比发现，这两个组件非常类似。
>
> 没有任何结论，应该是组件内部编码的问题。

* DCheckbox

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-微组件汇总/06-微组件-选择器监听不到a.b的值/images/007.png)

* DSelect 

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-微组件汇总/06-微组件-选择器监听不到a.b的值/images/008.png)





### 3. 在微组件vue代码中进行日志输出

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-微组件汇总/06-微组件-选择器监听不到a.b的值/images/005.png)

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-微组件汇总/06-微组件-选择器监听不到a.b的值/images/006.png)



### 4. 运行工程，在设计器页面操作

* 新脚手架操作：《2025新架手架创建微组件记录》

```
$ pnpm dev
```

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-微组件汇总/06-微组件-选择器监听不到a.b的值/images/009.png)



### 5. 最终结论

```
核心在value，初始化的问题，给他一个初始值，vue2添加新的值，需要用$set，不然watch不到

之前defaultValue 没有写到$ctx值里面，value写到$ctx里面
```



















