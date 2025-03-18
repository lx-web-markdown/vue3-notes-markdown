# 工单 - GD2025031400024

* 标题：隆基组织架构微组件定制PC端从列表页进入详情页报错
* 环境地址：http://njswjteqxm-wuyouxiangmu2212fuwu-gqhdlz.k8s-assembly-machine.qpaas.com/
* 测试账号&密码： admin_ljln/aykj8888
* 详情页访问地址：http://njswjteqxm-wuyouxiangmu2212fuwu-gqhdlz.k8s-assembly-machine.qpaas.com/space-jilunengkejiguf/zuzhijiagouweizujian/detail/18?module=information&title=%E7%BB%84%E7%BB%87%E6%9E%B6%E6%9E%84%E5%BE%AE%E7%BB%84%E4%BB%B6%E9%AA%8C%E8%AF%81&label=&edit=1



## 原因

微组件中加入组件架构，只有PC端的时候是OK的，现在又要开发 Mobile端，注册的位置不对，导致在PC端加载不到。

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-微组件汇总/07-微组件-PC+Mobile/images/001.png)



## 修改

修改 LegoMobile加载位置

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-微组件汇总/07-微组件-PC+Mobile/images/002.png)