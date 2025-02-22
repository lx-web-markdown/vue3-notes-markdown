# JavaScript 书写位置

* CSS书写位置
    * 行内样式表
    * 内部样式表 
    * 外部样式表

* JavaScript书写位置
    * 行内 JavaScript 
    * 内部 JavaScript 
    * 外部 JavaScript （推荐）

**行内 JavaScript**

```html
<body>
		<!--
			可以将js代码编写到标签的onclick属性中
			当我们点击按钮时，js代码才会执行
			
			虽然可以写在标签的属性中，但是他们属于结构与行为耦合，不方便维护，不推荐使用
		-->
		<button onclick="alert('讨厌，你点我干嘛~~');">点我一下</button>
		
		<!--
			可以将js代码写在超链接的href属性中，这样当点击超链接时，会执行js代码
		-->
		<a href="javascript:alert('让你点你就点！！');">你也点我一下</a>
  		
    	<!--
			这是空效果
		-->
		<a href="javascript:;">你也点我一下</a>
</body>
```

**内部 JavaScript**

```html
<!--
  可以将js代码编写到script标签	
  -->
<script type="text/javascript">	
		alert("我是script标签中的代码！！");
</script>
```

**外部 JavaScript**

```html
<!--
  可以将js代码编写到外部js文件中，然后通过script标签引入
  写到外部文件中可以在不同的页面中同时引用，也可以利用到浏览器的缓存机制
  推荐使用的方式
-->
<!--
  script标签一旦用于引入外部文件了，就不能在编写代码了，即使编写了浏览器也会忽略
  如果需要则可以在创建一个新的script标签用于编写内部代码
-->
<script type="text/javascript" src="js/script.js"></script>
<script type="text/javascript">
  alert("我是内部的JS代码");
</script>
```

**注意事项：**

* 书写的位置尽量写到文档末尾 `</body>` 前面 

* 外部 js 标签中间不要写代码，否则会被忽略

