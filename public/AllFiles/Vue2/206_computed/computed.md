# computed计算属性

1. computed中的计算属性**虽然是函数的写法**，但他**依然是个属性**



## computed计算属性 VS methods方法

* computed作为属性，直接使用

    - js中使用计算属性： `this.计算属性`

    - 模板中使用计算属性：`{{计算属性}}`

* methods作为方法调用

    - js中调用：`this.方法名()`

    - 模板中调用 `{{方法名()}}`  或者 `@事件名=“方法名”`



## 计算属性的优势

1. 缓存特性（提升性能）

    计算属性会对计算出来的结果缓存，再次使用直接读取缓存，

    依赖项变化了，会自动重新计算 → 并再次缓存

2. methods没有缓存特性



## 结论

1.computed**有缓存特性**，methods**没有缓存**

2.当一个结果依赖其他多个值时，推荐使用计算属性

3.当处理业务逻辑时，推荐使用methods方法，比如事件的处理函数







