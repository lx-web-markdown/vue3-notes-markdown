

# 工单：GD2025022500050

* 联系人：迮丹丹

* 项目工程：monitor

    * 仓库地址：http://git.qpaas.com/safety-fe/safety-fe-rpac/monitor/-/commits/version/v1.0.10-alarmEn-i18n

* 运行

    * node：16

    * ```sh
        https://hotfixtools.51safety.com.cn/
        账号：admin_zdxgyhlwaqsc 密码：20240827aykj
        
        登录到这 复制phpsession 到本地开发
        
        $ yarn start2
        ```

    * ![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/Lego国际化/images/001.png)

    * ![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/Lego国际化/images/002.png)



## 问题描述

项目自己引入 `vue-i18n` ，同时引入了 lego cdn。

* 有lego cdn，页面国际化失效；
* 无lego cdn，页面国际化正常。



## 原因

lego国际化覆盖了自写的国际化。



## 解决方案

移除自写的国际化vue-i18n方案，使用lego国际化方案：https://docs.qpaas.com/docs/guide/pg59iw8lgm6satlq



![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/Lego国际化/images/003.png)

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/Lego国际化/images/004.png)

![](/AllFiles/前端文档/1-Lego（全）/1-功能维度-Lego汇总/Lego国际化/images/005.png)

















