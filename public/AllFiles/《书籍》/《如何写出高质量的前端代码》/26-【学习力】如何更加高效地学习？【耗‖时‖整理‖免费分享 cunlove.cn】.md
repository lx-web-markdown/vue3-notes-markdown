在上一小节中，我们提到了学习能力是一个优秀前端的最基础的能力，也是一个人的核心竞争力所在。

相信大家应该都有切身的体会，近些年技术的发展越来越快，每隔一段时间都会有新的技术、框架产生。刚认为自己学会了React，又来了Hooks，刚掌握Vue2，Vue3又出来了，刚学完Webpack，Vite又横空出世，刚要看Vite，又出了个Rspack...很多同学直呼"学不动了"，到底应该怎么应对这么频繁的变化，怎么确定学习内容，怎么进行优先级排序，是我们面临的一个重要问题。

不得不承认，不同的人学习效率是不一样的，有的人可以很快掌握技术要点，有的则非常吃力，以至于要花大量的时间才能勉强追上别人，甚至还可能因为自己太菜而放弃，如何提升我们学习的效率也是一个非常重要的问题。

本小节我们尝试一起探讨下如何进行高效地学习，希望能够带给大家一些启发。

确定优先级的四象限方法
===========

面对这么多前端技术栈以及不断的更新迭代，如何确定学哪些内容，优先学习哪些内容，我参考四象限方法做了一个确定学习内容的四象限图，横轴为技术价值维度，分为高价值和低价值，纵轴为时间维度，分为现在和未来。

![时间重要性四象限.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8eaa034331c4c4f82bc531a8e45b228~tplv-k3u1fbpfcp-jj-mark:1600:0:0:0:q75.jpg#?w=785&h=496&s=72054&e=png&b=fffafa)

据此我们可以把要学的内容分为四大类：

*   现在项目急需学习的高价值内容
*   现在项目用到的低价值内容
*   未来能够提升身价的高价值内容
*   对未来没有太大提升的内容

这里有同学可能会问了，什么是高价值内容，什么是低价值内容？我们可以参考这几个维度综合判断：

*   使用频率：使用越频繁的内容其价值越高，比如UI组件库我们几乎每天都要用，而某个编辑器组件我们在项目中引用一次后几乎不会修改，那么UI组件库的价值就比编辑器组件高。
    
*   技术含量：技术含量高的内容要比技术含量低的价值高，比如3D的技术含量就比较高，而小程序的技术含量就偏低。
    
*   可迁移性：可迁移性高的内容价值更高，比如学习一个第三方库，它的API可迁移性就比较低，但是它的源码体现的设计思想可迁移性就比较高。
    
*   变化频率：变化频率低的内容其价值更高，学一次之后就受益终生，比如数据结构和算法、正则表达式、设计模式、HTTP协议等，可能数年都不会发生变更，越早学习越早受益，而一些第三方库的变化频率就非常高，也容易过时。
    

举个例子，现在我进入一个新的项目组，该项目基于Vue3和Vite，我对此并不是特别熟悉，近期我发现前端越来越多的项目用到了TS，同时又听说Tailwind.css最近挺火爆的，我如何来安排这几个内容的学习呢?

对Vue3是否掌握直接影响了我日常项目的开发效率和质量，而且Vue3是以后的趋势，我也准备将其作为我的主要框架，所以可以将其划分到第一象限；Vite虽然也是现在项目中的打包工具，但是配置都已经配置好了，暂时我也不需要调整，而且打包工具的变化还是非常频繁的，所以我将其划分为第二象限；TS是我未来想要学习的，我认为它会成为未来前端开发的一大趋势，所以将其划分到第四象限；至于Tailwind.css，我认为其技术含量不高、可迁移性较低，学习的收益不大，所以将其划分为第三象限。

![四象限示例.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b64bf6659294ad2ae52d8cfef661586~tplv-k3u1fbpfcp-jj-mark:1600:0:0:0:q75.jpg#?w=813&h=512&s=38228&e=png&b=ffffff)

不同象限的学习优先级和花费的时间精力是不同的：

*   第一象限（现在-高价值）：立即深入学习
*   第二象限（现在-低价值）：可花很少的时间迅速了解一下，浅尝辄止，不必深究，够用即可
*   第四象限（未来-高价值）：制定计划，严格按照计划去学习，这块是大家非常容易忽略的
*   第三象限（未来-低价值）：不必投入时间，随用随学即可

通过对学习内容进行四象限划分，可以让我们很容易确定学习内容的优先级，这里要提一点，同一个内容对不同人，其划分是不太一样的，比如我想以后从事一些基础工作，那对打包工具的学习就很重要，而如果只是业务开发，那打包工具的学习价值就不高，或者对于现在的我来说，打包工具的学习价值并不高，未来有可能又变成了高价值内容，所以要根据自己的实际现状来划分。

这里重点提醒大家，要关注那些未来高价值的内容，尤其是那些几乎不过时的内容，比如正则表达式，自从我花了一些时间学会后，感觉自己都变得厉害了，而且就算以后我做后端开发它也能发挥作用，这些优质的学习内容，大家一定要做好计划，尽早提上日常。

学习的四大原则
=======

其实学习并没有什么难的，只要遵循这十六字的箴言即可：循序渐进、厚积薄发、学以致用、教学相长。

1\. 循序渐进
--------

“循序渐进”，顾名思义，就是按照一定的步骤、逐渐深入地进行学习。它强调的是学习的连续性和系统性，要求我们在掌握基础知识的前提下，逐步向更高层次的知识和技能迈进。这种方法不仅符合人类认知的自然规律，也符合知识本身的逻辑结构，能够有效避免“贪多嚼不烂”或“浅尝辄止”的学习误区。

**学习要有系统性**

还记得我以前在高三学习的一个事，当时我的生物成绩一直不太理想，虽然也做了很多题，但是成绩一直在中上徘徊，后来我做了一个决定，暂时先不做任何题目，而是把高一到高三的所有生物课本拿出来，从头到尾认认真真地重新看了一遍，通过这种系统性地学习，让我的知识结构更加清晰完整，结果不出所料，后面的生物考试直接满分，而且无论以后题目怎么变化，基本都难不倒我。

**不要总想速成**

现在很多同学的学习都过于急躁，总想着速成，或者总想抄近路、走捷径，而不是踏踏实实地从基础开始学起。市面上也有很多课程或者书籍迎合这种心理，什么21天成为某种高手之类的，可能吗？可以说任何一个行业，要成为高手，都是非常不易的，如果真的这么速成，你的护城河在哪？要知道，越容易得到的也越容易失去。

**重视基础知识的学习**

回到前端学习来说，现在很多人更重视框架的学习，而忽略了前端基础乃至计算机基础的学习，这就像是空中楼阁，很容易到达瓶颈，也很难有大的突破。在做了2-3年全职开发后，有段时间我给自己发起了一个活动，我将其称为"重学前端"，就是把所有前端的基础知识完完全全地重新学了一遍，包括[w3school](https://www.w3school.com.cn/ "https://www.w3school.com.cn/") 上全部的HTML、CSS课程，JS方面我翻完了厚度高达600多页的犀牛书，又读了一本《深入理解ES6》，针对JS原型相关的知识全部手撸了一遍，针对每个JS循环方法都测试了下他们的运行效率，耐着性子啃那本巨厚的算法导论...通过这种方式，感觉自己上了一个新的台阶，在后面遇到的前端面试中，基本上技术面都很容易过关。

**螺旋式上升**

以框架/库的学习为例，首先我会先简单学习下它的基础用法，然后利用学到的内容做一些简单的Demo，然后回过头来继续学习它的高级用法，然后再进行一些实战，最后开始阅读它的源码，深入理解实现原理。阅读源码的过程也同样要循序渐进，第一次阅读可能只是大概了解下项目结构、代码结构，第二次阅读可能只是了解下核心功能的大致实现思路，第三次阅读可能就是深入了解核心功能的实现细节了，最后再了解其他内容。对于大型的复杂的框架，想要一次性读懂是不太可能的，需要进行多次反复阅读，每次只给自己定一个较小的目标，而不是妄想"一口吃个胖子"，那样也更容易产生挫败感，以至于最后选择放弃。

2\. 厚积薄发
--------

“合抱之木，生于毫末；九层之台，起于累土；千里之行，始于足下。” 任何伟大的成就都源自于不懈的积累与默默的努力。在学习这条道路上，我们更应秉持这一理念，厚积薄发，以待时机成熟，绽放属于自己的光彩。

提到厚积薄发，我就想到了语文的学习，一个人要想短期内迅速提高语文成绩几乎是不可能的，学好语文必须进行大量的积累，包括大量字、词、成语、诗词等基础知识的学习，大量的课外阅读，大量的写作训练，大量的试题练习，这就是一个厚积的过程，当积累到一定程度，量变发生质变的时候，才能文思泉涌，下笔如有神，这是薄发的过程。

**长期主义**

前端工程师的进阶之路也是一样的，在上一节中，我们提到了优秀前端的六力模型，里面涉及多个领域的大量知识，这都需要大量的学习，大量的实践，可能在刚开始的时候，你只是比别人多学了个一个方法、一个库、一个方法论，当时并不能体现出你比多人强多少，也不会因此而给你升职加薪，不过不要着急，不要沮丧，坚持下去，直到有一天你会惊讶的发现，你已经在不知不觉中上了一个新的台阶。

坚持长期主义，虽然很多东西的学习都不能给你快速带来收益，但是把时间线拉长来看，这种不断的积累产生的价值是巨大的，从我多年的经验来看，没有一个学习到的东西是无用的，它总是会在未来你的某个工作任务中，突然发挥出价值。

**横向扩展**

纵向钻深很重要，但是横向扩展也同样重要，当多种不同的技能碰撞到一起的时候，可能会发生"化学反应"，产生很多奇妙的结果。假如你的技术栈是纯前端的，那么哪怕你想自己搭建一个个人博客都是非常费劲的，而如果你懂后端，会运维那就完全不一样了，你可以进行各种创作，开发一个自己心仪的项目，而在这个过程中，你锻炼了前端、后端、运维、产品设计、商业思维等一系列能力。相信我，独立完成一个项目的整个流程，你所收获到的远远要比开发纯前端页面多得多，而且这也会在一定层面上反哺、提升你的前端技术，你更加懂Cookie了，更加理解Http协议了，也知道如何使用Nginx加速了，甚至还能独自承接外包项目挣钱了，然后又可以用挣到的钱提升自己...

在我从产品经理转到前端的时候，我曾经觉得自己走了几年弯路，觉得要是从一开始就做前端开发那该多好啊，但是到后来，我发现以前的经历完全没有白费，特别是在之前做低代码平台的时候，将产品设计能力和前端开发能力完全融合在了一起，这也让我在公司中有了非常不错的产出，为我后续换工作也提供了非常大的帮助，也许这就是所谓的技多不压身吧，有时候一些跨行业的结合，可能会产生惊喜。

3\. 学以致用
--------

怎么知道你学一个东西到底是不是学会了呢？对此，我给自己定了一个判断标准，那就是看你能不能用这个学到的技术做出一个作品，甚至于能用这个技术赚到钱，如果能，那就是学会了，如果不能，那就是学的还不到位。

**实践是检验真理的唯一标准**

比如你想学习UniApp，你可能会看看官方介绍，尝试做下Demo，但是这能不能说明你真的学会了UniApp呢？如果不面向某个真实需求开发一个真正有用的App，很多场景你是在Demo中是根本碰不到的，你的流程是没有打通的，哪怕是开发一个功能非常小的真实的App也比你做一个很多功能的Demo要收获多的多，所谓实践是检验真理的唯一标准就是这个道理。

我之前从产品转到开发的那段时间，我就刻意地接了一些外包项目，我的目的不在于赚钱，而是通过这些外包项目，来证明我的技术是得到市场认可的，我是能够胜任这个工作的。后续找前端的工作的时候，我就不用担心别人对我的质疑，虽然我的职位不是前端开发（当时公司给的title是产品经理），但我做了大量真实的项目，我是一个合格的前端开发。

**有条件上，没条件创造条件也要上**

学习最佳的方式就是将你要学的技术和公司的业务结合起来，如果没有应用，过几个月很可能就忘记了，而公司业务是我们每天都开发的，这样每天的接触，你想学不会都难。我刚做前端的时候我们的技术栈是传统的PHP框架+jQuery，后来我自学了Vue，然后正好公司要做一个新产品，我就直接把Vue引入到了我们公司，从此才开启了我的新时代前端之路。

当然了，并不是总能将这些技术应用到公司，公司没有项目怎么办，那就自己做，前前后后我自己开发了好几套系统，有条件上，没条件创造条件也要上，一定要让你学的技术应用起来，就像站在岸边学习游泳，你永远也学不会，最简单的方法就是直接跳进水里。

4\. 教学相长
--------

“教学相长”源自中国古代儒家思想，意指在教育的过程中，教师通过教授知识、解答疑惑，能够不断反思自己的教学方法和内容，从而深化对学科的理解，提升教学技艺；而学生则在接受知识的同时，通过提问、讨论、实践等方式，激发思考，培养批判性思维和创新能力，最终实现知识与能力的双重飞跃。这一过程，就像是一场双向的旅行，师生在旅途中相互启发，共同前行。

**能用自己的话说出来的知识才是自己的**

我们在看书、看故事的时候可能会有这个体验，自己看的时候很尽兴，而当要讲给别人听的时候，就会发现自己要么说的很啰嗦，要么讲得不够流畅，甚至有的时候完全不记得自己到底看了什么，如果不能把学到的知识，用自己的话讲出来，那其实就说明学的还不够好，还不能做到深入浅出。

**教是最好的学**

在教别人之前，通常我们会逼着自己对所学的内容进行梳理、加工、重构，在这个过程中，将我们大脑中散乱的碎片进行整合，形成一个清晰、完整的体系，这有助于加深我们的记忆；而且当我们发现有讲不清楚的地方，我们肯定会反复地查询资料，直到搞懂了所有的内容，这又无形当中增加了自己的知识储备；而在我们给别人讲解的过程中，遇到别人的提问、质疑等，又会让我们发现自己的知识欠缺，从而进行查缺补漏，这又让我们的知识体系更加完整。

就像我写这本小册，很难说所有的内容在写这本小册之前，我都想的非常清楚了，而为了给大家呈现精彩的内容，也为了防止大家花了钱之后觉得不值"骂"我，我花了大量的时间在整理、加工、重构，最后才把这本小册写出来，在这个过程中，我也对自己的知识体系进行了全面的系统的整理，我感觉收获颇丰。

大家应该有过这样的体会，你印象最深的一个知识，一定不是你听别人讲的，而是你讲给别人听的。

**分享、写作**

我们平时学习的时候大多关注输入，而忽视了输出，最简单的两种输出方式就是技术分享和写作。

有的同学可能会排斥技术分享，觉得耽误时间或者有很大的压力，我们要换个思路，其实你进行一场分享，收获最大的是你自己，反而是别人花了时间来听你的分享，给你提出建议和指导。为了能在同事面前能够不露怯，相信在准备分享的过程中，都会认真准备，这确实会带来一些压力，不过适当的给自己一些压力，未必全是坏事。

写作也是一个很好的输出方式，写一篇好文章其实挺难的，不仅要对所讲的技术有深刻的理解，还要用别人能看的懂的方式写出来，还要考虑文章的结构是否合理，甚至句子是否通顺等，对人的综合能力的一种考验，可以说写作是思维的一种外化，脑子里面乱糟糟就不可能写出结构清晰的文章。

技术分享频率一般都不会太高，而写作则是我们可以经常做的，之前为了写文章我还特意搭建了一个个人网站，每天把自己的遇到的问题、收获写下来，有些文章现在对我来说都还有用，甚至这个小册中的一部分内容，也源自当年写的总结文章。

十步学习法
=====

在《软技能：代码之外的生存指南》这本书中，作者总结了自己的学习方法，将其命名为"十步学习法"，我感觉和平时自己学习的过程还是比较相似的，这里推荐给大家。

![十步学习法.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f10f9d5544cf4ae6ad39e0e9970854ee~tplv-k3u1fbpfcp-jj-mark:1600:0:0:0:q75.jpg#?w=1440&h=1070&s=419562&e=png&b=fdfdfd)

所谓十步学习法，就是把对一个事物的学习过程分成十步，分别是：

1.  了解全局
2.  确定范围
3.  定义目标
4.  寻找资源
5.  筛选资源
6.  创建学习计划
7.  开始学习，浅尝辄止
8.  动手操作，边玩边学
9.  全面掌握，学以致用
10.  乐为人师，融会贯通

接下来我们可以假想一个场景，假设我现在是一名Web前端工程师，现在想学习下App开发，那么我们怎么按照十步学习法进行学习呢？

1 了解全局
------

> 对要学习的知识或技能有一个全局的认识，包括它是什么、可以用来做什么、包含哪些主要内容和组成部分，先有一个整体的认识。

首先我要搞清楚几个问题：我要不要学习App开发呢？目前App开发的就业前景怎么样？薪资高不高？现在App开发的前端技术都有什么？和原生开发相比成熟吗？每个技术的市场占有率都是怎样的？

我要先对App开发这个事情有个大致的了解，可以通过搜索引擎、招聘网站来查找我想要的信息，也可以找做过这块的朋友聊一聊，实在没有也可以去掘金、知乎等平台发帖问一问。

总之，对学习App这个事有个整体的认识，而不是上来就直奔具体技术。

2 确定范围
------

> 明确自己要学习的具体范围，即需要掌握哪些知识和技能。这有助于学习者将精力集中在关键领域，避免无谓的分散。

我的时间是有限的，我不可能把App相关的所有技术都学会，我必须做出取舍，否则会把自己的搞的太累，而且战线拉的太长很容易导致半途而废。

我发现现在通过前端技术开发App主要有这几种：UniApp、ReactNative、Flutter，通过之前的了解，我觉得UniApp挺适合我的，因为它和我之前的Vue技术栈比较吻合，而且它不光可以开发App，还能打包成小程序，这对我非常有吸引力，于是把技术栈定下来了。那我是开发Android App还是主打iOS呢，目前我只有iPhone手机，而且后续我想在学会了App之后，尝试在AppStore中进行一些创业尝试，所以我决定主要开发iOS App。

好了，现在我明确了自己的学习范围：如何通过UniApp技术开发iOS App。这样我的学习范围一下就少了好多，压力也小了好多。

3 定义目标
------

> 为学习设定明确、可衡量的目标。这些目标应该具体、实际，并能够指导整个学习过程。

目标不宜定的过大，学习是个循序渐进，螺旋上升的过程，我们每次学习的目标也是变化的，比如我的终极目标是通过在AppStore发布应用赚钱，而我本次的学习目标可能比较小：通过UniApp 开发一个待办事项APP，能够在我的iPhone手机上运行即可。

有一个清晰的目标，也方便我们对阶段性的学习成果有个评价，而不是稀里糊涂地学到哪是哪，而且有了目标之后，其实也是帮我们缩小了学习范围，比如我要学如何通过UniApp怎么进行苹果支付吗？显然不用，因为我想做的是一个简单的待办App，暂时还用不到支付。

4 寻找资源
------

> 广泛搜寻与学习内容相关的资源，包括书籍、在线课程、教程、论坛等。

在定好目标之后，我就要开始寻找学习资料了，通过搜索我找到了以下内容：

*   UniApp官方教程：[uniapp.dcloud.net.cn/tutorial/](https://uniapp.dcloud.net.cn/tutorial/ "https://uniapp.dcloud.net.cn/tutorial/")
*   掘金小册：Uniapp 从入门到进阶，[juejin.cn/book/684473…](https://juejin.cn/book/6844733817438076936?scrollMenuIndex=0 "https://juejin.cn/book/6844733817438076936?scrollMenuIndex=0")
*   书籍：京东上搜索了下，发现了一本热卖的《uni-app多端跨平台开发从入门到企业级实战》

5 筛选资源
------

> 对学习资源进行筛选，找出最优质、最适合自己的资料。避免贪多嚼不烂，确保所选资源能够高效支持学习目标的实现。

上面我找了一些学习资料，通过大致的浏览内容大纲，我发现官方网站的教程比较适合我这个入门的新手，于是我决定通过UniApp的官方教程进行本次学习。

6 创建学习计划
--------

> 根据筛选出的资源，制定一个详细的学习计划。计划应该包括学习时间表、阶段性目标、学习方法等。

目标是一个比较大的事情，是很难一下完成的，可能需要1个月甚至更长的时间，所以需要对其进行分解，将其拆分为更小的容易实现的阶段性目标，下面是我针对本次学习指定的计划。

时间

阶段目标

day 1

下载所需软件，把环境搭起来

day 2-3

了解UniApp工程和页面的结构、配置文件

day 4-7

了解UniApp的常用组件

day 8-10

了解UniApp的Api

day 11-13

设计Demo的原型

day 14-20

开发Demo

当然，从实际情况考虑，时间的确定上可能比较困难，毕竟我们都还有工作在身上，不能全职学习，可以大致定个时间节点；而学习的具体内容是可以拆分成的比较细的粒度的，每完成一个就勾掉一个，方便我们看到学习的进展，更容易给自己成就感，更能坚持下去。

![学习目标.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1311c52427e948b8a66848b9b1ebee16~tplv-k3u1fbpfcp-jj-mark:1600:0:0:0:q75.jpg#?w=715&h=255&s=42304&e=png&b=ffffff)

7 开始学习，浅尝辄止
-----------

> 按照学习计划开始学习，注重基础知识的掌握和理解。在学习过程中，要保持耐心和毅力，逐步深入。

好了，现在终于进入正式学习了，根据我制定的计划，每天在工作之余以及周末都会坚持执行，不要随便打破你的学习计划，计划一旦被打破就没有存在的意义的，后面只会越来越随意的打破。

你要专注于掌握自己所需的、能在下一步动手操作的最小量的知识，而不必深究所有的细节或者等到所有的内容都学完之后再去动手。

8 动手操作 边玩边学
-----------

> 将理论知识与实践相结合，通过动手操作来加深理解和记忆。这有助于学习者更好地掌握技能并发现潜在问题。

在学习的过程中一定是一边学一边动手，比如我们在学UniApp的manifest.json配置的时候，可以尝试去修改一些有意思的属性，然后看看运行的效果是什么样的，而不是一直在那里光看不动手，动手的过程中也会增加学习的趣味性，也加深了对每个功能的理解，动手一遍可能比看10遍还有效。

9 全面掌握，学以致用
-----------

> 通过不断的学习和实践，逐渐掌握所学知识和技能。在这一阶段，要注重知识的系统性和完整性，确保自己能够全面理解并熟练运用所学内容。

现在我已经对UniApp有了一定的了解了，接下来我就用前面学到的知识开始制作我的待办事项App，在制作这个仿真的Demo的过程中，可能会遇到很多之前没想到的问题，然后通过翻看官方文档、询问搜索引擎等方式来查找答案，通过这个实战的练习可以让我们对原来看到的知识有更深刻全面的认识，当然了，如果能用到真正的项目上，那收获会更大。

10 乐为人师，融会贯通
------------

> 最好的学习方式之一是教授他人。通过向他人传授所学知识，可以进一步巩固自己的理解和记忆，并发现自己的不足之处。同时，这也是一种有效的反馈机制，有助于学习者不断改进和提高。

这和我们前面说到的学习原则是一样的，教学相长，教是最好的学。通过这段时间对UniApp的学习，肯定积累了不少的收获，可能是针对某个问题的解决方案、某个功能的使用教程、或者是一些开发的心得体会以及方法论等，都可以通过写文章或者公司内部分享的形式传递给他人，在这个过程中我们会经历信息的查询、整理、表达，会收获他人的反馈，最终的目标只有一个，就是将这段时间学到的知识，变成自己的能力。

好了这就是通过十步法模拟UniApp学习的整个过程，这个过程并不是一次就终止了，而是反复循环的，当我本次学习目标达成之后，我可能就要给自己设定更高的目标，如此反复，螺旋上升。

总结
==

如何高效学习是我们一项非常重要的基础能力，它是一个人的核心竞争力之一。

面对众多的前端学习内容，我们可以通过时间-价值四象限方法来进行分组，确定学习的优先级以及要投入的时间、精力。

*   对于现在需要的高价值内容，我们要立即深入去学
*   对于现在用到的低价值内容，浅尝辄止，够用即可，不必花费太多时间精力
*   重点关注未来用到的高价值内容，制定计划去学习，比如年度计划、季度计划等
*   对于哪些对未来没有太大价值提升的内容，等用到的时候再学即可

怎么学习其实很简单，古往今来，学习都离不开这16字箴言：循序渐进、厚积薄发、学以致用、教学相长。

最后我们介绍了十步学习法，按照此方法可以对某一个近期要学的知识点进行学习。

1.  了解全局
2.  确定范围
3.  定义目标
4.  寻找资源
5.  筛选资源
6.  创建学习计划
7.  开始学习，浅尝辄止
8.  动手操作，边玩边学
9.  全面掌握，学以致用
10.  乐为人师，融会贯通