



# 新增词条-iOS实操

## a. 在"多语言词条管理"平台新增词条

![](/AllFiles/前端文档/4-国际化词条部署/images/001.png)



## b. 更新 qy_node 项目 

* qy_node: http://git.qpaas.com/qy/qy_node

* sync-i18n命令使用介绍：https://blogqpaas.yuque.com/kidsv4/ires5e/80317636



**更新 qy_node 项目：**

* 将任何一个用户登录上平台的 access_token 复制到 qy_node 的根目录 .env.local 文件中。
    * ﻿﻿QYCLOUD_TOKEN=a8351f30-0e80-4493-b0d1-420c9fe8cba7﻿

* 将 qy_node 仓库切到对应的分支，在根目录运行 ﻿npm run sync-i18n﻿。命令会在根目录 i18n 文件夹生成语言包文件，并产生代码变更，然后将变更代码提交。

    * 提交代码报错：﻿✖ No valid configuration found.﻿

    * 解决：

        ```
        $ git add .
        
        $ git commit --no-verify -m "fix: 转换"
        ```

* 在服务器上拉取最新代码，使用 ﻿npm run deploy﻿ 重新部署即可。（具体操作看下一节）



 

## c. 服务器部署

以 076 大风车为例

* 管理平台地址：http://172.168.0.76:8088/static/developmentCustomization

![](/AllFiles/前端文档/4-国际化词条部署/images/002.png)

> 登录账号
> admin  /  123456

![](/AllFiles/前端文档/4-国际化词条部署/images/003.png)

* 选择 `﻿paas-nodejs﻿`
* 终端 ﻿`cd /opt/node/node﻿`
    * 切换到对应分支：`﻿feature/xxxx﻿`
    * 更新代码：`﻿git pull﻿`
* 终端命令：
    * ﻿﻿`cat package.json﻿`
    * ﻿﻿`rm -rf node_modules﻿`
    * ﻿﻿`npm run bootstrap﻿`
    * ﻿﻿`npm run deploy﻿`

* 具体操作释义
    * 切换到 `qy_node` 项目的分支上；
    * 移除node_modules文件，`﻿rm -rf node_modules`﻿，重新安装 ﻿`npm i﻿`
    * 最后直接部署 ﻿`npm run deploy﻿`
    * 部署失败，尝试 ﻿`npm run bootstrap﻿`，再部署 ﻿`npm run deploy﻿`



## d. iOS拉取最新词条操作

QYYi18n中有个node项目拉取指定环境的多语言数据。

![](/AllFiles/前端文档/4-国际化词条部署/images/004.png)



vscode打开 js_script ，更改后台环境， 执行命令，最后生成的文件都在dist目录中。
将dist文件中的数据复制到 QYYi8n 中，注意查看每个国际化文件，因为数据中可能存在一些转义字符对的情况。

![](/AllFiles/前端文档/4-国际化词条部署/images/005.png)

















