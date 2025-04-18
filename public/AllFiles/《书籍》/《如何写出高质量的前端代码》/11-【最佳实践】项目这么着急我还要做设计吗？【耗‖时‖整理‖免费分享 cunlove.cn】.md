前端同学在做业务开发时，经常性地接到需求就匆匆开干，如果你问他为什么不做设计，那得到的答案一定是，项目排期这么紧张，我哪有时间做设计？排期紧张成了不做设计，写出屎山代码的万能挡箭牌。

不做设计真的是因为排期紧张吗，也未必，就算时间充裕，你会发现不做设计的同学依然不会做设计，主要还是没有认识和体会到设计在前端开发中的价值，以及不知道要怎么做设计，要设计什么。

做设计真的就一定会让项目Delay吗？我并不认同这个观点，相反，良好的设计能够加快开发进程，缩短开发和维护周期，从我自身的开发经验来看，但凡复杂一些的需求，我都会进行前端设计并产出设计文档，偶尔一些小的需求，虽然不产出设计文档，但是仍然会仔细研读产品需求，并构思详细的解决方案，最后再开始编写代码，只是没有产出设计文档，但是设计的过程是必不可少的。

今天我们就来聊一聊前端开发中的设计，希望能对大家的工作方式有一些启发和改进。

前端为什么要做设计
=========

在日常业务开发中，很多前端只关注前端编码和前后端联调，而忽视了其它环节，而实际在一个功能的研发周期中，编码仅仅占了很小一部分，我们应该尊重IT的研发流程，欲速则不达。

![work-flow.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58c2fcdf8f7d4b3589998301aad04d17~tplv-k3u1fbpfcp-jj-mark:1600:0:0:0:q75.jpg#?w=778&h=415&s=58277&e=png&b=fffdfd)

平时我们遇到的很多问题，大都是忽视设计环节造成的，比如：

*   辛辛苦苦开发好几天，结果发现开发出来的功能和产品经理想要的并不一致，只好返工，白白浪费了大把时间
*   提测后发现实现的功能有遗漏，于是风风火火地加班补代码
*   实现细节和产品需求有很多出入，给人的感觉就是不认真
*   开发过程中才发现产品设计不合理，于是转头讨论需求
*   排期时由于对需求理解不深入，也不知道到底要开发多少功能，只能拍脑袋估一个时间，结果到期完不成
*   对风险没有一个清晰的认识，不能提前暴露风险，马上要上线了告诉领导有重大风险要推迟上线
*   开发方案有缺陷，写着写着感觉进行不下去了，马上要提测了又要临时换方案，导致项目延期
*   开发方案太复杂，导致实现难度较高，提测后出现一堆bug
*   开发方案不正统，理解难度大，团队成员接手后总是吐槽
*   改Bug的时间是写功能代码时间的N倍
*   功能实现靠凑代码，靠反复试验、调试，靠巧合去编程，工作几年了仍在低水平地重复着
*   给人的感觉就是不靠谱，毛毛躁躁，领导不敢交付重要的工作

相信大家在工作中都遇到过类似的问题，项目中大部分Bug都是"设计"出来的，当你敲击键盘时，很多Bug就已经注定了，因为你的方案和思路可能都是错的，怎么能写出正确优质的代码呢？

而如果我们能在开发之前，花10%-30%的时间进行一个很好的设计，则会给我们带来很多好处：

*   对齐需求认知：
    
    *   了解本次需求变更的原因和背景，知道做这个功能的原因和意义
    *   了解本次变更的需求范围，哪些是新增功能，哪些是变更功能，本次需求会涉及哪些模块的修改
    *   及时发现需求中的遗漏、缺陷，及时通知产品调整需求
    *   明确每个功能模块的具体交互细节、交互流程，比如每个按钮什么情况下可以点击，什么情况禁用，点击之后处理流程是什么
*   降低项目风险：
    
    *   根据需求的工作量合理预估工时，给出一个靠谱的项目排期
    *   提前暴露风险，不突然给领导"惊吓"
    *   有了设计文档，才能让其他经验丰富的同事帮自己评审把关，提前发现设计上的缺陷
*   提升编程能力：
    
    *   设计中会写伪代码，而写伪代码的过程就类似大脑编译代码的过程，有助于提升逻辑思维能力，最终将自己的大脑训练成"人肉逻辑编译器"
    *   在设计各个模块的对外接口和内部实现中，思考如何提升复用性、扩展性以及如何解耦
*   提升大型项目设计能力：
    
    *   设计的过程就是大脑模拟解决问题的过程，通过日常训练，提升结构化、系统化、抽象化思考的能力，做到比别人想的多，想的深
    *   先从小项目的设计开始，通过反复训练，提升大型项目的设计能力

可以说前端设计是前端开发中不可或缺的一个环节，哪怕是改个样式Bug，都需要进行设计，这个样式是到底写到某个组件内，还是提取为公共样式？是通过选择器优先级修改样式还是直接"!important"？只不过这种小需求不写设计文档罢了，但你不能不做设计啊。

对于新业务功能的开发、前端基础utils和通用组件的开发，都强烈建议编写设计文档，并拉着项目成员和经验丰富的同事进行评审。

前端设计文档包含哪些内容
============

> 设计文档严格来说分为概要设计和详细设计，然而从现实角度来考虑，除非是一些超大型项目，需要这么详细的区分，否则我们只需要写一篇就够了，没有那么多时间和精力对概要设计和详细设计都进行评审。在我的实际工作当中，也是以详细设计文档为主，本文所讨论的文档我们可以认为是详细设计文档。

有些同学想写设计文档，但是不知道该写什么，一些同学的设计文档写的非常简单，只是产品文档的一个复述，并没有体现出前端代码层面的设计，更不能直接指导开发；而有的则直奔技术，忽视了产品需求的理解。

前端设计文档大致可以分为两大类，一类是面向业务功能开发的设计文档，另一类是前端公共功能的设计文档。前者的需求是产品提出的，后者则是前端同学自发提出来的，是前端内部的事情，这两种文档思路一致，但是内容稍有不同，下面我们详细聊聊这两种文档的内容。

业务功能设计文档
--------

业务设计文档通常包括以下几项内容：相关文档、需求梳理、前端设计、依赖API接口、排期、todo。

### 相关文档

在开发过程中，经常需要查看各种文档，比如产品需求文档、API设计文档、API接口说明、UI图等，可以把这些文档链接集中放到设计文档中，减少开发中查找文档的时间，我习惯把这些相关文档放到设计文档的最顶部，而不是最下面，方便开发时使用。

### 需求梳理

需求梳理是设计文档中的重要一环，在编写文档的过程中，加深你对本次需求的理解。 需求梳理可以分为三大部分：

*   需求的背景：

当前项目存在什么问题，为什么需要开发这个功能，了解本次需求的意义和价值。

了解了需求背景，你才能评价后面的产品设计是否解决了当前问题，有没有更好的解决方式，你才能给产品提出你的意见。

*   核心业务流程：

这部分不是必须的，根据情况而定，主要展示本次需求中几个核心功能的处理流程、状态流转等，让人对整体需求有个概念。

*   业务需求梳理

按照"业务模块--页面"或"业务模块--页面--功能点"的层次来组织我们的设计文档，如"用户管理--用户列表"、"用户管理--用户列表--新增用户弹窗"。

这里的需求内容务必要简洁、详尽，详细阐述每个功能点的展示逻辑、交互细节等，不要逻辑啰嗦长篇大论。

> *   最近登录时间：
>     *   3分钟内：显示刚刚
>     *   一小时内：显示xx分钟前
>     *   一天内：显示xx小时前
>     *   一周内：显示\*\*天前
>     *   超过一周：显示具体时间，形如：2024-10-10 10:10:10

> *   点击删除设备按钮：
>     *   校验当前设备是否处在运行中，如果是则不允许删除，并提示"设备在运行中，不允许删除"
>     *   如果设备不在运行中，二次弹窗确认"你确定删除设备【{设备名}】吗？"
>     *   确认后删除设备，并提示"删除成功"，刷新当前列表。

确保后续开发时，面对这个设计文档，可以不用再思前想后犹犹豫豫，能够直接按照设计中的说明进行编码。

同时在文档中标注清楚是新增功能还是修改原有功能，如果是修改原有功能，则只需列出本次修改的功能点，把所有涉及的变更都列出来，开发时对着修改项进行开发即可，不再需要思考。

> *   本次列表调整内容
>     *   表格列中新增"创建时间"
>     *   表格支持按照"创建人"进行筛选

### 前端设计

在文档中，我们还应该针对一些重点/复杂的功能进行详细的前端编码设计，包括页面路由设计、全局状态设计、重点模块的数据结构、重点页面的组件Dom构成、组件的属性props/内部状态state/重点方法methods以及对外抛出的事件events等。

路由设计示例：

> *   用户详情页路由：
>     *   形如：/user/:id?from=userList
>     *   路由参数：
>         *   id: 用户id
>     *   query：
>         *   from: 代表页面跳转的来源，返回时根据from进入不同的页面，可选值 userList | orderDetail，默认userList

重点数据结构展示示例：

> 全局状态userInfo数据结构
> 
>     {
>        "name": "",
>        "isVip": "",
>        "roles": []
>     }
>     

页面的伪代码：

> 用户详情大致实现方案：
> 
>     <template>
>       <UserBaseInfo :base-info="baseInfo"/>
>       <UserOrder :orders="orders"/>
>     </template>
>     <script>
>     export default {
>         data() {
>             return {
>                 baseInfo: {},
>                 orders: []
>             }
>         },
>         created: {
>             this.getUserInfo();
>         },
>         methods: {
>             getUserInfo(){
>                 //从路由获取用户id
>                 let uid = this.$route.params.id;
>                 //请求用户接口获取用户详情，赋给baseInfo
>                 this.baseInfo = {};
>                 //获取用户订单信息，赋给orders
>                 this.orders = []
>             }
>         }
>     }
>     </script>
>     
> 
> UserBaseInfo实现见 \*\*
> 
> UserOrder实现见 \*\*

在设计中尤其要重视数据结构的设计，数据结构是开发的基础，只有数据结构设计合理，后面的开发工作才能顺利，而且参与前端设计评审的不一定都是前端同学，数据结构是大家都可以看懂并进行交流的一块内容。数据结构包括全局store的结构、组件内部状态state的结构、派生属性computed的结构、form表单的数据结构等。在涉及多人协作开发时，数据结构显得更加重要，定好了结构，就可以多人并行开发。

设计中还可以通过伪代码形式展示核心操作的处理逻辑，只有这样别人才能针对性地提出修改意见，比如上面示例中的getUserInfo方法，看起来是串行请求数据，是否需要通过Promise.all让两个请求并行发出？

### 依赖API接口

通常来说前端开发对API接口依赖较大，在进行前端设计时，可以将本次依赖的接口整理出，避免开发过程中才发现少了某个接口，通过这种方式也方便督促后端同学尽早完成接口文档编写和接口开发。

![api.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/810ebde33fd848eba09daee4eb005498~tplv-k3u1fbpfcp-jj-mark:1600:0:0:0:q75.jpg#?w=821&h=321&s=50927&e=png&b=ffffff)

### 排期

排期应该放在设计完成后，这样才能根据具体工作量评估出靠谱的工时和完成时间，不能按时完成的排期是没有太大意义的，只是变成了一个形式化流程。

### todo

在设计评审过程中，肯定会发现一些遗漏或者其他之前没想到的工作，可以在todo中汇总这些内容。

### 业务功能设计文档模板

下面是我日常前端设计的一个模板，大家可以参考。

> 相关文档
> ====
> 
> 需求文档
> 
> API接口文档
> 
> \*\*文档
> 
> 需求背景
> ====
> 
> 当前我们系统中存在\*\*问题，给\*\*人员造成了极大的不便，为了解决这个问题，我们决定开发\*\*功能。
> 
> 核心流程
> ====
> 
> 该功能核心流程如下图所示，如果没有特别要讲述的内容可以不写。
> 
> 功能设计
> ====
> 
> 功能模块1【新增】
> ---------
> 
> ### 需求描述
> 
> 功能模块1如下图所示，主要功能有\*\*，点击\*\*按钮后，弹窗展示...
> 
> ### 前端设计
> 
> #### 页面路由
> 
> 页面路由结构: user/:id?from=userList
> 
> #### \*\*数据结构
> 
>         {
>            "name": "",
>            "age": 18,
>            "isVip": false
>         }
>     
> 
> 功能模块2【编辑】
> ---------
> 
> ### 需求描述
> 
> 功能模块2如下图所示，主要功能有\*\*，点击\*\*按钮后，弹窗展示...
> 
> ### 前端设计
> 
> #### UserList组件【新增】
> 
> ![component.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e352cd9aed7f4d9a82ac81984b0c6ee1~tplv-k3u1fbpfcp-jj-mark:1600:0:0:0:q75.jpg#?w=1206&h=618&s=69801&e=png&b=ffffff)
> 
> API接口
> -----
> 
> ![api.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/810ebde33fd848eba09daee4eb005498~tplv-k3u1fbpfcp-jj-mark:1600:0:0:0:q75.jpg#?w=821&h=321&s=50927&e=png&b=ffffff)
> 
> 排期
> --
> 
> ![tice.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5331759e5160401dbebcc575407634c9~tplv-k3u1fbpfcp-jj-mark:1600:0:0:0:q75.jpg#?w=797&h=222&s=29996&e=png&b=fefefe)
> 
> todo
> ----
> 
> *   待办事项1
> *   待办事项2

前端公共功能设计文档
----------

有时前端同学会有一些自驱性的工作，比如想抽取一些公共组件或者公共utils，这些功能的影响范围较广，最好形成设计文档，然后在前端内部进行评审。

然而作为程序员，很多同学都不太好意思组织开会，经常是自己偷摸先干，干完了然后给大家提一嘴，我开发了某某组件，你们看看有需要的可以用。这会导致一些问题：

*   别人不知道有这个功能：由于没有评审，别人都不知道你做了什么，就算有类似需求，也不知道使用你封装的组件/库
*   不够通用：由于没有评审，不知道别人有什么类似需求，只根据自己需要开发，导致别人不好用或不能用
*   重复造轮子：可能之前已经有人开发了类似功能，只是你不知道而已
*   方案不合理：由于自己经验不足，导致解决方案有问题，没有利用好团队的力量

所以只要是开发团队基础组件或库，都应该认真编写设计文档，然后进行评审。

我编写的前端公共功能设计文档一般包含这五部分：当前存在的问题、期望实现的功能、使用示例、API及实现方案。

### 当前存在的问题

我们开发一个组件或者util，必然是因为存在一些问题，问题越大越多，越能体现出我们做这件事的价值，毕竟开发都是需要工时的，没有价值的投入是不能被认可的，所以要给大家说清楚为什么要做这件事，做了能有什么收益。

比如，为什么要封装一个自己的表格组件呢？因为目前我们的表格配置过于复杂，每次写一个表格都要很多代码，开发效率非常低下，可通过截图现有的代码来证明你的观点。

### 期望实现的功能

问题说清楚之后，那么你期望实现的功能是怎样的，它都包含哪些特性呢？可以通过简洁的语言罗列下。

仍然以表格开发为例，我想实现的表格主要包含以下功能：

*   简化数据请求：
    *   支持配置一个api地址就能自行请求数据
    *   用户点击分页后自动请求数据
    *   支持api地址、api请求函数、data数组3种数据源
*   支持通过列配置快速生成表格
*   支持通过插槽自定义表头和单元格
*   支持分页
    *   默认展示20条数据，支持切换，可切换页大小为10、20、50、100
    *   支持不使用分页，直接展示所有数据
*   其他功能...

> 注意: 在整理这部分内容时，我们不应该站在技术实现的角度去考虑，而是更多地要站在使用者的角度，想清楚你到底想要一个什么样的功能，怎么样才是使用更加友好的，不要上来就想怎么实现；
> 
> 这里的内容也不涉及具体API，更多地是描述你想要怎样的一个功能。

其他人通过这块内容就可以对你开发的功能有个初步的印象，也可能会提出自己想要支持的场景。

### 使用示例

在期望实现的功能中，通过描述性的语言展示了要开发的功能作用，但是还不够直观，最好能通过不同场景下的示例代码来展示如下使用，就像ElementUI等组件库的说明文档那样。

还以表格为例，大致示例形式如下：

表格支持传递api地址，自动请求数据：

    <template>
      <MyTable :api="'/api/user'" :columns="columns"/>
    </template>
    <script>
    export default {
        data(){
            return {
                columns: [
                  {prop: 'name', label: '姓名'},
                  {prop: 'age', label: '年龄'}
                ]
            }
        }
    }
    </script>
    

通过这种示例代码，能让大家看出来你要开发的组件/库，使用方式是不是足够友好，也顺便为大家介绍了如何使用你的新作品，起到了宣贯的作用。

### API

为了让别人更详细深入的理解你要开发的组件/库，还应该介绍下你的API设计，对于组件，API意味着属性props、事件events、插槽slots、对外方法methods；对于utils库，API意味着函数的参数结构以及返回值结构；对于一个对象，则可以详细介绍它的构造函数参数、属性及方法。

ElementUI文档中的API介绍方式就很清晰，下面是Input组件的部分API截图：

![input_props.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d96725f20bc46eb94c912572c9d2b33~tplv-k3u1fbpfcp-jj-mark:1600:0:0:0:q75.jpg#?w=885&h=335&s=38297&e=png&b=ffffff)

![input_events.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9bd7ed96a1424178b3cb456a923596e3~tplv-k3u1fbpfcp-jj-mark:1600:0:0:0:q75.jpg#?w=884&h=374&s=43484&e=png&b=ffffff)

![input_slots.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2376c30797d4ce6927dd8a404ddd41c~tplv-k3u1fbpfcp-jj-mark:1600:0:0:0:q75.jpg#?w=880&h=320&s=34587&e=png&b=ffffff)

![input_methods.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4141011cc3584022ad87197ab95c3d0f~tplv-k3u1fbpfcp-jj-mark:1600:0:0:0:q75.jpg#?w=882&h=272&s=18585&e=png&b=ffffff)

MDN中关于canvas的drawImage方法介绍：

![drawImage.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07c356414d104a328033f97e9bf4b818~tplv-k3u1fbpfcp-jj-mark:1600:0:0:0:q75.jpg#?w=777&h=462&s=81921&e=png&b=fbfbfb)

### 实现方案

上面的内容向大家介绍了为什么要开发这个功能、要开发的功能有什么作用以及怎么使用，都是面向使用者的，而作为设计文档，还需要介绍下你的实现方案，以便大家在开发层面给你一些建议。

> 实现方案也可以先不写，在评审通过后再编写也不迟，更重要的是要不要做，做成什么样，而具体怎么做并不是最重要的，很多时候我们本末倒置了

实现方案同样地按照总-分的模式进行介绍，先介绍整体的方案，可以使用一些图形来展示项目的结构或流程，然后再介绍各个模块的实现。

对于公共功能的设计，这里就不赘述文档模板了，按照上面提到的5部分进行编写即可。

什么样的文档算好文档
==========

如何评价一个设计文档好不好呢，我觉得要从两个角度来考虑：

*   参与评审成员：

评审成员能不能比较容易地理解你的设计，这个可以看是否有人在评审中能进行讨论，并给出了修改意见，如果能给出意见则说明看懂了你的设计，当然了也可以直接询问大家的反馈意见。

*   开发者：

对开发者来说，也就是作者本人，这个设计文档好不好主要取决于是否能根据此文档指导你的开发，最终产出的代码有多大的比例是遵从了你的设计，有多少违背了你的设计，通过这个也可以看出自己的设计能力强弱。

一个好的设计文档完成后，在开发时只需要对着文档进行开发即可，不需要太多的思考，思考工作已经在设计时完成了，这会大大减少开发时间。

如何写好设计文档
========

写设计文档并不比写代码简单，要想写好一个设计文档还是比较考验综合素质的，那如何才能写好设计文档呢，我觉得也有一些思路和技巧的。

明确文档的目的和受众
----------

在写设计文档之前，你就要想清楚这个我文档的受众是谁，将来的评审成员都有什么人，我想通过这次评审达到怎样的目标。不同受众关注的内容不同，相应地我们编写文档时就要做相应的调整。

如果你是给领导看的，那么更多地是要展现你为什么做这件事，产生的价值是什么，需要那些资源，有哪些风险等，如果这时候你的内容都是前端伪代码，那显然是不合适的；如果受众是产品、运营、测试等，那么就要讲清楚交互的细节；如果受众是技术人员，那么就要详细介绍你的技术方案；如果受众就是你自己，那你就好好设计实现细节。

结构化地表达
------

在写设计文档时，我们一定要结构化地表达，不要一上来就写一大堆文字，更不能层次混乱，要好好设计下你的目录结构，目录就对应着你的逻辑，目录混乱必然逻辑混乱。

上面我们的模板就是按照这样的思路设计的。

内容详尽、重点突出
---------

文档应该包含项目的所有重要信息，尽量不遗漏，比如你开发的这个新功能会产生怎样的影响，老的数据或者路由怎么兼容等都要想清楚。

同时，还要突出文档的重点内容，比如关键功能的设计和实现、技术难点和解决方案等可以在文档中优先展示，而不是简单的罗列。

图形化表达
-----

俗话说一图胜千言，一个好的图形能够非常快速地将设计思路和细节表达出来，省去很多繁琐的文字描述，让评审人员迅速抓住设计重点。

图表的种类非常多，在前端设计文档中以下几种图形是出镜率非常高的：

### 流程图：

流程图，顾名思义是用图形化的方式描述业务流程的，特别适用于一些复杂的处理流程介绍，如登录流程、下单流程等。

![liuchengtu.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/502d25c6216e4bdc99376afd1e803fc5~tplv-k3u1fbpfcp-jj-mark:1600:0:0:0:q75.jpg#?w=1822&h=720&s=44003&e=png&b=ffffff)

流程图的主要由以下几组成部分：

*   图框（节点）：代表流程中的不同步骤或操作。这些图框可以包含文字描述，以解释该步骤的具体内容或要求。
*   箭头（连接线）：表示步骤之间的逻辑关系和方向。箭头从一个步骤指向另一个步骤，表示流程的方向和顺序。
*   开始和结束标志：通常用特定的图框或符号表示流程的开始和结束。
*   决策点（菱形）：用于表示需要做出决策或判断的步骤。从决策点可以引出多条连接线，表示不同的决策结果和后续步骤。

### 泳道图

泳道图用于展示多个参与者或实体之间的交互和协作关系。泳道图通常将流程分成若干条“泳道”，每条泳道代表一个参与者、角色或部门，显示他们在流程中的责任和活动。

水平泳道图：

![yongdaotu.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/318707b020544940bd9b8b2abb691937~tplv-k3u1fbpfcp-jj-mark:1600:0:0:0:q75.jpg#?w=2282&h=1664&s=80571&e=png&b=fefefe)

垂直泳道图：

![chuizhiyongdaotu.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c35d2506502d43cbbb203cdf4eb29419~tplv-k3u1fbpfcp-jj-mark:1600:0:0:0:q75.jpg#?w=2166&h=2248&s=213512&e=png&b=fefefe)

泳道图可以理解为在流程图的基础上叠加了流程参与者的视觉展现，它在展示流程的同时，也清晰展示了每种参与者的职责。

所以，如果你的流程图中涉及到多个参与者，不妨试试改为泳道图，这样效果可能会更好。

### 架构图

架构图用于描述系统或应用软件的总体结构、模块组成以及它们之间关系的图形化表示方法。架构图通常包括不同层次的组件、模块、服务以及它们之间的连接和通信方式，通过架构图，我们可以更好地理解系统的整体设计和功能实现。

![jiagoutu.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb31c5b01c2c4d20b353a54ae578ebaa~tplv-k3u1fbpfcp-jj-mark:1600:0:0:0:q75.jpg#?w=2196&h=1578&s=133028&e=png&b=fffaf9)

架构图的主要组成部分：

*   节点（Nodes）：代表系统中的各个组成部分，如模块、组件、服务、数据库等。节点可以用不同的形状、颜色和大小来表示不同的类型或重要性。
    
*   连接线（Lines）：表示节点之间的交互方式和数据流动方向。连接线可以是单向的也可以是双向的，可以带有箭头表示方向，也可以带有标签说明交互内容。
    
*   层次结构（Hierarchy）：架构图通常按照层次结构进行组织，从上到下或从外到内逐渐细化。这样可以更清晰地展示系统的整体结构和各个组成部分之间的关系。
    

在进行设计的整体思路介绍时，可以使用架构图展示实现的方案结构。

### 状态机图

状态机图用于描述系统或过程中不同状态之间流转关系的图形化表示，在前端开发中经常会遇到各种状态，如订单状态、审核状态、发布状态等，不同状态对应不同的操作，通过状态机图可以很清晰地表达不同状态对应的操作。

![zhuangtaitu.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5eeab9b489be4de1824c6292ba487b1f~tplv-k3u1fbpfcp-jj-mark:1600:0:0:0:q75.jpg#?w=1916&h=1016&s=60552&e=png&b=fefefe)

状态流转图的主要组成部分包括：

*   节点（状态）：图中的每个节点代表一个特定的状态，节点可以用圆形、矩形等表达。
    
*   连接线（转换）：带箭头的线条表示状态之间的转换方向。这些线条上的文字或标记描述了触发状态转换的操作、事件或条件。
    

### 原型图

一般在团队中，由产品经理提供原型图，但我建议所有前端同学都应该学会画原型图，因为原型图可以很直观地展示出交互流程和界面效果，特别适合前端同学。有时候你想主动做一些优化工作，或者需求不是很明确，就可以通过画一个简单的原型图来表达你的想法，在原型确认之后再开始你的工作。

![yuanxingtu.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73a3c88e058d46229936eaab205ab8bd~tplv-k3u1fbpfcp-jj-mark:1600:0:0:0:q75.jpg#?w=826&h=592&s=53278&e=png&b=ffffff)

原型图的绘制一般也特别简单，不一定非要用专业的软件（如Axure），Word、PPT等都可以，也不一定非要加一些交互效果，多图平铺也未免不可，只要能表达出你的想法就行，原型图重要的是更加直观的表达，让人能提前看到将要实现的效果，这比文字描述的表现力强太多了。

总结
==

进行前端设计有诸多好处：

*   设计的过程就是对齐需求认知的过程，加深对产品需求的理解；
*   进行前端设计之后的排期才是靠谱的，而且能提前发现潜在的风险；
*   写伪代码的过程就类似大脑编译代码的过程，有效提升编程能力
*   设计的过程就是大脑模拟解决问题的过程，有效提升大型项目的组织、设计能力

前端设计文档分为业务功能设计文档和前端公共功能设计文档。

业务功能设计文档主要包括：相关文档、需求梳理、前端设计、依赖资源（API）、排期。

公共功能设计文档主要包括：当前存在的问题、期望实现的功能、使用示例、API、实现方案。

写好设计文档需要注意以下几点：

*   明确文档的目的和受众
*   结构化地表达
*   内容详尽、重点突出
*   图形化表达

在设计文档中经常会用到流程图、泳道图、架构图、状态机图和原型图，这些图形化表达方式可以很直观地展示出设计思路和细节，让评审人员快速抓住重点。

良好的设计不仅不会耽误项目进度，而且还能加快开发进程，缩短开发和维护周期，避免返工风险，如果你是项目管理者，更应该推动设计工作，将其作为研发流程中必要的一环。