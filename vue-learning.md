# Vue-learn Notes

> 郑重提醒：除非在Vue脚手架中，否则Vue代码中一定不要用驼峰命名法，否则不知道什么时候就会出bug了
>
> 开始学习日期：2020.12.24
>
> 主体学习完成日期：

## Vue简介

在Vue的框架下，JavaScript像是一个面向对象的语言，而非面向过程了。
### 引入Vue
1. CDN
```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
```
2. NPM
    比较复杂，而且引入也还知道怎么引入，等老师讲完再补充

### 创建Vue
var app=new Vue({
    el:"#id"//表示挂载的元素
    data:{}  //赋予其属性
    methods:{}  //赋予方法
    created:function(){} //以listener的方式进行回调，执行value中的函数
    mounted：function(){}//类似上面
})

### Vue生命周期
![官网生命周期图](https://cn.vuejs.org/images/lifecycle.png)

### 前端模板引擎mustache
Vue中的{{}}实际上是使用的mustache模板引擎，类似于后端的模板引擎，其语法也支持简单的+-*/操作。

补充说明，凡是Vue对象中的函数或属性等，都可以通过{{}}包裹函数名或属性名直接调用，函数也接受传参

## NPM使用
要下载node.js，win8以下下载nodejs11以下的，否则不支持。
下载的nodejs自动集成了npm。
通过npm安装typescript
在执行安装代码之前，还是先注册一下npm的国内镜像，否则各种跟拉屎堵屁眼一样。
验证，如果返回https://registry.npm.taobao.org，说明镜像配置成功，可以不用
```
npm config set registry https://registry.npm.taobao.org
npm install -g typescript
npm config get registry
npm install --save-dev webpack
```

webpack的五个概念
entry：指定文件从哪儿开始打包
output：指定输出文件夹
loader：指定无法处理的css，img等文件，以何种方式处理
plugin：需要的插件
mode：分开发环境和生产环境


加不加--save, -g, -dev的区别
**npm install moduleName 命令**

 安装模块到项目node_modules目录下。
 不会将模块依赖写入devDependencies或dependencies 节点。
 运行 npm install 初始化项目时不会下载模块。

**npm install -g moduleName 命令**
 安装模块到全局，不会在项目node_modules目录中保存模块包。
 不会将模块依赖写入devDependencies或dependencies 节点。
 运行 npm install 初始化项目时不会下载模块。

**npm install -save moduleName 命令**
 安装模块到项目node_modules目录下。
 会将模块依赖写入dependencies 节点。
 运行 npm install 初始化项目时，会将模块下载到项目目录下。
 运行npm install --production或者注明NODE_ENV变量值为production时，会自动下载模块到node_modules目录中。

**npm install -save-dev moduleName 命令**
 安装模块到项目node_modules目录下。
 会将模块依赖写入devDependencies 节点。
 运行 npm install 初始化项目时，会将模块下载到项目目录下。
 运行npm install --production或者注明NODE_ENV变量值为production时，不会自动下载模块到node_modules目录中。





## Vue语法

### Vue对象的属性
1. 属性列举
- el: 绑定元素
- data: 设置属性值
- methods: 设置方法
- computed: 计算属性
- filters: 对指定的数据进行filter和处理
- components：组件，在这个里面写的语句注册的是局部组件
- router：路由

2. 计算属性
    计算属性带缓存，性能比methods好，比起methods，优先使用computed
    应用场景：如果存在这种需求`<div>{{attr1+''+attr2}}</div>`，那么使用计算属性，写成下面的
```
computed:{attrSum:function(){return this.attr1+''+attr2}}
```
实际上上一句真正写法应该是
```
computed:{attrSum:{set:function(newValue){
    this.attr1=newValue[0];this.attr2=newValue[1];
    //示例代码，但实际只用get，没有set},
    get:function(){return this.attr1+''+attr2}}}
```

3. filters

   filter对指定的数据进行filter处理

   写法：{{ variable | filter_name}}




### 插值

以下的东西都是插入添加在tag的attribute中
1. v-once: 差不多相当于final，一次性显示，不支持后期修改，后面不需要跟任何表达式
2. v-html: 如果网页返回的是html标签，那么直接取出其内容，放在对应标签中。以下代码显示效果：[去百度啊](http://www.baidu.com)
```
<script>
    var app = new Vue({
        el: '#app',
        data: {
            message: 'fuck import',
            movies: ['a', 'b', 'c', 'd'],
            url: "<a href='http://www.baidu.com'>去百度啊</a>"
            /*
            补充一个内容，a标签target属性中设置跳转对象，_Blank => 新页面打开，_Self=> 本页面打开，_Parent => 父窗口打开，_Top => 顶层窗口打开
            */
        }
    })
</script>
<div id= "app" v-html="url"></div>
```
3. v-text: 等同于th:text
4. v-pre: 对{{}}不进行mustache模板引擎的渲染
5. v-cloak: vue渲染之前，v-cloak属性存在，vue渲染后，v-cloak属性就被去掉了

### 属性绑定v-bind
#### 基本使用

缩写：:

绑定对象：很多，基本上标签的各个属性都能绑定

绑定方向：v-bind的绑定是等号左右，从右往左绑定

v-bind即是给标签绑定上Vue对象中的属性，如果是链接的话，完全可以这么来写
```
<img v-bind:src="imgUrls" alt="">
<a :href="urls">1</a>
```
** 注意：v-bind和src或href之间的:后面绝对不能有空格**
:是v-bind:的语法糖写法
但如果Vue对象中imgUrls对应的是硬盘中的路径比如下面第一行的，就无法显示，但第二行的就能正常显示，另外若按照如上绑定，对应的值不能是数组。
```
imgUrls: 'E:\其它\王岭9.26-28出差陆丰住宿费 (2).jpg'
imgUrls: 'https://bkimg.cdn.bcebos.com/pic/ac345982b2b7d0a2523b3455c6ef76094a369a03?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg'
```
**以上问题是转义的原因，应该是'E:\\其它\\王岭9.26-28出差陆丰住宿费 (2).jpg',就可以了**

#### 动态绑定class
1. 通过{}绑定对象，{}中填充的是对象，如果本来就已经绑定了某个class，会自动追加，而非覆盖
```
<div id="app" :class="{className:isClassName}"></div>
var app= new Vue({el:"#app",data:{isClassName:true}})
```
- 见示例代码：通过点击按钮就可以动态切换颜色

```
<style>
    .blue{
        color: blue;
    }
</style>

<div id="app">
    <div :class="{blue:isBlue}">Is this blue?</div>
    <button v-on:click="is_Blue()">蓝色切换</button>
</div>

<script>
var app = new Vue({
    el: '#app',
    data: {
        isBlue: true
    },
    methods: {
        is_Blue:function(){
            this.isBlue=!this.isBlue
        }
    }
})
</script>
```
2. 通过数组绑定，[\]内填充如上的类似blue等class，如[blue,red\]，反正括号内的也是className



#### v-bind绑定style

组件化开发时应用很多。
1. 对象语法，按照如下写法，可以直接给标签设置成相应CSS style,style标签中的属性名支持驼峰命名，如fontSize在原style中的时候是font-size
    `<div :style="{fontSize:'50px'}">v-bind绑定style标签</div>`
    其实以上这种，{fontSize:'50px'}中值的设置可以变成Vue的属性值realSize，如{fontSize:realSize+'px'}
2. 数组语法
```
<div :style="[realSize,realColor]">v-bind绑定style标签</div>
//Vue中属性：
data:{
    realSize:{fontSize:'50px'},
    realColor:{color:red}
}
```

*不过无论是绑定class还是绑定style，通过数组形式的绑定都是比较少用。*



### 事件监听v-on

#### 简介

1. 作用：绑定事件监听器
2. 缩写：@
3. 参数：event
4. 预期（即后面接的语句）：function | inline statement | object

#### 基本使用

示例代码如下：

```html
<div id="app">
  <h3>当前数据：{{counter}}</h3>
  <button v-on:click="add">+</button>
  <button @click="minus">-</button>
</div>
<script>
  let app = new Vue({
    el: "#app",
    data: {
      counter: 0
    },
    methods: {
      add: function () {
        console.log("add is called");
        this.counter++;
      },
      minus: function () {
        console.log("minus is called");
        this.counter--;
      }
    }
  })
</script>
```

#### 参数传递理解

如果有如下代码

```html
<div id="app">
  <button v-on:click="click1">btn1</button>
  <button @click="click2">btn2</button>
  <button @click="click3">btn2</button>
</div>
<script>
  let app = new Vue({
    el: "#app",
    methods: {
      click1: function () {
        console.log("Func -- click1 is called");
      },
      click2: function (x) {
        console.log("Func -- click2 is called");
      }
      click3: function (x，event) {
        console.log("Func -- click2 is called");
      }
    }
  })
</script>
```

关于v-on中监听事件的参数传递，有如下规律

1. 对于click1方法，在引用时不加（），对于执行毫无影响
2. 对于click2方法，在引用时不加（），Vue在处理后把浏览器内部产生事件event作为参数传入click2方法中
3. 对于click3方法，有多个参数，其第一个参数在Vue解析后默认将event作为参数传入该方法，如想显式手动获取event对象，则像这句语句中`<button @click="click3('anyotherRandom',$event)">btn2</button>`，$event获取的即为event。

#### 修饰符

1. .stop：阻止事件传递

对于如下代码，会产生冒泡事件，即点击btn的时候，并不想让div也响应click事件，但实际上由于传递机制，div还是响应了click事件。

```html
<div @click="divClick()" id="app"> <button @click="btnClick()">{{btnName}}</button> </div>
<script>
    var app = new Vue({
        el: "#app",
        data: {
            btnName:"test btn"
        },
        methods: {
            divClick() {
                console.log("div click is called");
            },
            btnClick() {
                console.log("btn click is called");
            }
        }
    })
</script>
```

对于上述代码，可以使用stop修饰符来阻止冒泡事件，即`<button @click.stop="btnClick()">{{btnName}}</button>`

2. .prevent：阻止默认事件

没有太多可以说的，就是将标签中默认提交的事件，变成代码控制提交

3. .keyCode|keyAlias：监听键盘某个键的点击

示例代码如下.enter即为监视enter键

```
<input type="text" @keyUp.enter="keyStroke"></div>

keyStroke(){
console.log("keyBoard is stroke");
}
```

4. .once：即监听事件绑定Vue对象的方法只触发一次
5. .native：讲组件的时候会用到，后续补充



### v-if，v-else-if，v-else

上面的三个叠加起来就相当于if, else if, else这种控制语句。v-else-if相比较其他两个，使用较少，v-else-if写在标签里相对比较复杂，一般都是写在computed或methods中，然后直接引用。

如下代码，页面显示为v-if，如果控制台输入app.isPresent=false，那么显示v-else，

```html
<div id="app">
    <h1 v-if="isPresent">v-if</h1>
    <h1 v-else="isPresent">v-else</h1>
</div>
<script>
    var app = new Vue({
        el:"#app",
        data:{
            isPresent:  true
        },
    })
</script>
```

### v-show

v-show和v-if的使用和效果类似，主要涉及到v-show和v-if的对比

- v-show 条件为false时，只是给标签添加了属性display:none
- v-if 条件为false时，所在的标签压根就不存在

在开发中，如果显示和隐藏之间相互经常切换，使用v-show，如果切换频率不高，则使用v-if

### v-for

#### 使用

基本写法

v-for="something in dataAttrInVue"

v-for遍历数组和对象，以及如何获得index，key和value。都在如下代码中：

```html
<div id="app">
    <!--标签中，与数组-->
    <ul>
        <li v-for="item in movies"> {{item}} </li>
    </ul>
    <!-- 如果要获取索引，v-for后面用小括号包起来，第一个参数是数组中对象，第二个参数是索引 -->
    <ul>
        <li v-for="(item, index) in movies"> {{index+1}} - {{item}} </li>
    </ul>
<!-- 标签中，与对象，只显示value -->
    <ul>
        <li v-for="item in rectangular">{{item}}</li>
    </ul>
    <!-- 显示key和value，因为value更重要，所以首先显示value，其实这儿的key有点类似数组的index -->
    <ul>
        <li v-for="(value,key) in rectangular">{{value}} and {{key}}</li>
    </ul>
    <ul>
        <li v-for="(value,key,index) in rectangular">{{value}} and {{key}} plus {{index}}</li>
    </ul>
</div>
<script>
    var app = new Vue({
        el:"#app",
        data:{
            movies: ['Kill Bill', 'Brave Heart', '1984', 'Hulk'],
            rectangular: {
                length: 100,
                width:22,
                height:1333,
                id: 'notHexton'
            }
        },
    })
</script>
```

**官方推荐：在使用v-for的时候，最好给所在的标签添加上key的属性 =>  在这儿是为了更好地提高复用**

具体原理就是：绑定了key，下次插入操作时，可以获取原有的标签，并进行对比，通过diff算法插入。否则就需要类似于arraylist，在目标位置插入之后再将插入位置后的元素一个个地往后挪

具体写法参照如下，保证要展示的数据，即item或value，和key上绑定的数据是一致的。

```html
<!--标签中，与数组-->
<ul>
  <li v-for="item in movies" :key="item"> {{item}} </li>
</ul>
<!-- 如果要获取索引，v-for后面用小括号包起来，第一个参数是数组中对象，第二个参数是索引 -->
<ul>
  <li v-for="(item, index) in movies" :key="item"> {{index+1}} - {{item}} </li>
</ul>
<!-- 标签中，与对象，只显示value -->
<ul>
  <li v-for="item in rectangular" :key="item">{{item}}</li>
</ul>
<!-- 显示key和value，因为value更重要，所以首先显示value，其实这儿的key有点类似数组的index -->
<ul>
  <li v-for="(value,key) in rectangular" :key="value">{{value}} and {{key}}</li>
</ul>
<ul>
  <li v-for="(value,key,index) in rectangular" :key="value">{{value}} and {{key}} plus {{index}}</li>
</ul>
```

#### 响应式

v-for经常与数组进行绑定，其中有些数组方法是响应式，有些不是

响应式

响应式即是指，对于对象的属性或者值的修改可以立即回传到对象中并予以显示。

*对于以下方法，如果插入多个元素，可以一次传入多个参数，js函数传入多个可选参数写法是function(...args)，args实际上在函数体中也是一个数组*

1. push，arr.push(ele)
2. pop，删除尾部元素
3. shift，删除头部元素
4. unshift，头部添加元素
5. splice，指定位置插入，删除或替换元素，实际上的替换，也相当于删除之后重新插入
   - splice(index,displacement,ele)，第一个参数是操作起始的索引，第二个是删除元素个数，第三个插入的元素，
   - 如果只传入一个参数，则表示从index开始的所有元素都删除
   - 第三个参数以后可以接多个参数，都是插入的元素
   - 要实现伪替换，则第三个参数开始，传入的元素个数等于第二个参数的值
6. sort，排序
7. reverse，数组翻转

非响应式（只有一个）

1. 通过索引修改，即arr[x]=ele

### 融合使用小案例

#### 例1

功能说明：有一个ul的列表，点击这儿列表中的元素，该元素在红和黑色之间切换。

代码如下

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
    <style>
        .toRed {
            color: red;
        }
    </style>
</head>
<body>
    <div id="app">
        <ul>
            <li v-for="(item,index) in movies" :key="item" :class="{toRed:status[index]}"
                @click="turnRed($event,index)"> {{item}} </li>
        </ul>
    </div>
    <script>
        var app = new Vue({
            el: "#app",
            data: {
                movies: ['Kill Bill', 'Brave Heart', '1984', 'Hulk'],
                status: [],
                rectangular: {
                    length: 100,
                    width: 22,
                    height: 1333,
                    id: 'notHexton'
                }
            }, methods: {
                turnRed(event, index) {
                    if (this.status.length == 0) {
                        for (let i = 0; i < this.movies.length; i++) {
                            this.status.push(false);
                        }
                    }
                    // console.log(this.status);
                    //由于下面的方法不是响应式，所以不能用下面的这个方法
                    //this.status[index]=!this.status[index];
                    this.status.splice(index, 1, !this.status[index]);
                }
            },
        })
    </script>
</body>
</html>
```

#### 例2

就是一个书记购物车table页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
    <style>
        table {
            border: 1px solid #e9e9e9;
            border-collapse: collapse;
            border-spacing: 0;
        }
        th,
        td {
            padding: 8px 16px;
            border: 1px solid #e9e9e9;
            text-align: center;
        }
        th {
            background-color: #f7f7f7;
            color: #5c6b77;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div id="app">
        <table v-if="books.length>0">
            <thead>
                <tr>
                    <th>序号</th>
                    <th>书籍名称</th>
                    <th>出版日期</th>
                    <th>价格</th>
                    <th>购买数量</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(book,index) in books">
                    <td>{{index+1}}</td>
                    <td>{{book.bookname}}</td>
                    <td>{{book.pubDate}}</td>
                    <td>{{book.price|deciPrice}}</td>
                    <td>
                        <button @click="add(index)" >+</button>
                        {{book.amount}}
                        <!-- 这儿对<=1的绑定，如果不去练，还是挺难想到的 -->
                        <button @click="min(index)" v-bind:disabled="book.amount<=1">-</button>
                    </td>
                    <td><button @click="removeEle(index)">移除</button></td>
                </tr>
                <tr>
                    <!-- colspan或rowspan即是设置跨行跨列 -->
                    <td colspan="5">总计（元）</td>
                    <td>{{totalSum|deciPrice}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <script>
        var app = new Vue({
            el: "#app",
            data: {
                books: [
                    { bookname: '算法导论', pubDate: '2002 - 6 - 1', price: 63, amount: 1 },
                    { bookname: 'unix', pubDate: '2012 - 2 - 1', price: 93, amount: 1 },
                    { bookname: 'computer science', pubDate: '2007 - 12 - 1', price: 903, amount: 1 },
                    { bookname: 'algorithm', pubDate: '2010 - 1 - 1', price: 123, amount: 1 },
                ]
            },
            methods: {
                getFP(x){
                    //toFixed,固定保留几位小数
                    return "￥" + x.toFixed(2)
                },
                add: function (index) {
                    // console.log(index);
                    let booktemp=this.books[index];
                    booktemp.amount++;
                    this.books[index].amount=booktemp.amount;
                    return booktemp.amount;
                },
                min: function (index) {
                    // console.log(index);
                     return this.books[index].amount--;
                },
                removeEle(index){
                    this.books.splice(index,1);
                }
            },
            computed: {
                totalSum() {
                    return this.books.reduce(function (x, y) {
                        return x + y.price*y.amount;
                    }, 0)
                },
            },
            filters:{
                deciPrice(x){
                    return "￥" + x.toFixed(2)
                }
            }
        })
    </script>
</body>
</html>
```





### v-model

#### 基本使用

理解：主要用于给表单绑定值，方便表单的提交。v-model涉及到三方，Vue内部属性，表单的value，v-model表达式本身，通过v-model前两者是互相绑定的

写法：v-model="attrVue"，attrVue即是指Vue对象中的某个属性

原理：用v-bind获取Vue的属性值，v-on监听事件改变并获取和更新相应内容

Vue通过v-model实现了双向绑定。有如下代码，无论是从控制台修改app.message，还是在input框输入和修改值，“#message”的div和input框中的数据都是同时变化的。

```html
<div id="app">
    <input type="text" v-model="message">
    <div id="message">{{message}}</div>
</div>
<script>
    var app = new Vue({
        el:"#app",
        data:{
            message:"this is message"
        }
    })
</script>
```

实际v-model是一个组合，以上代码也可以用以下的替代

```html
<div id="app">
    <input type="text" :value="message" @input="valueChange(event)">
    <!-- 以上语句也可以写得更简单一些 --><br/>
    <input type="text" :value="message" @input="message=$event.target.value">
    <div id="message">{{message}}</div>
</div>
<script>
    var app = new Vue({
        el: "#app",
        data: {
            message: "this is message"
        },
        methods: {
            valueChange() {
                this.message =event.target.value//event事件中target属性的value属性即是<input>的value
    }
        }
    })
</script>
```

#### v-model与单选框

1. radio类的单选框，本来是通过name属性一致保证只能选择一个，但是在使用v-model后，只要多个单选框绑定同一个Vue属性，那么他们之间就是互斥的。
2. 要使单选框有默认值，只需要给Vue的属性给定默认单选框的value

#### v-model与checkbox

1. 稍微一提，label好处是单选框和复选框中点击文字，就能选中。再回顾一下，对于密码框，input type="password"。

2. 以下代码可以达到点击同意按钮后再进入下一步

   ```html
   <div id="app">
     	<label for="agree">
           <input  v-model="isAgreed" type="checkbox" id="agree"> 同意
       </label>
       <br>
       <button :disabled="!isAgreed" >下一步</button>
   </div>
   <script>
       var app = new Vue({
           el: "#app",
           data: {
               isAgreed:false
           }    })
   </script>
   ```

3. 如果checkbox要达成多选框的效果，那么如上的地方，所有的选择框都还是通过v-model绑定一个Vue的属性，但是属性的值要用数组来存储，这样一来，只要选中其中某个，对应的value就会自动加入到数组中。（这儿的代码就略过了）

#### 值绑定

以上案例中input和Vue属性绑定都是在页面中写死的，假若从服务器获取的值，也可以直接绑定和显示，但其实也用v-bind，代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
</head>
<body>
    <div id="app">
        <label v-for="(item, index) in movies" :key="index" :for="item" >
            <input type="checkbox" :id="item" v-model.lazy="selection[index]" value="item">{{item}}
        </label>
        <div>{{selection}}</div>
    </div>
    <script>
        var app = new Vue({
            el: "#app",
            data: {
                movies: ['Kill Bill', 'Brave Heart', '1984', 'Hulk'],//假装这个值是从服务器取出的
                selection:[]
            }
        })
    </script>
</body>
</html>
```

#### 修饰符

1.  .lazy：懒加载，对于input框，只要通过v-model绑定的，一有输入就会变化，加了这个修饰符之后，输入后敲回车和失去焦点后才会再同步绑定
2.  .number：由于v-model绑定的数值默认会转换成string处理，加上这个修饰符后，就会按照数字进行处理
3.  .trim：v-model获取的字符串，默认去除首尾的空格

### DOM了解

小案例，代码如下。

```html
<div id="app">
    <span v-if="iwitch">
        <label for="UserName" >UserName</label>
        <input type="text" name="UserName" id="UserName" placeholder="user name here">
    </span>
    <span v-if="!iwitch">
        <label for="Email">Email</label>
        <input type="text" name="Email" id="Email" placeholder="email input here">
    </span>
    <span><button @click="switchType">切换类型</button></span>
</div>
<script>
    var app = new Vue({
        el:"#app",
        data:{
            iwitch:true
        },
        methods: {
            switchType(){
                this.iwitch=!this.iwitch;
            }
        },
    })
</script>
```

问题描述：以上代码生成的html页面，input输入框切换用户名或邮箱的过程中，用户已经输入的内容不会被清除

原因：Vue为了性能考虑，会创建虚拟DOM，并且将input框进行抽取和复用。

解决： 给两个输入框分别加上不同的key属性，Email的输入框加上key="Email"，username的输入框加上key="Username"，这样就告诉Vue这是两个不同的输入框，不要进行复用。



## 组件化开发

**这个是重要内容 **

### 坑

1. 干！TMD这儿非常坑爹，因为Vue.component中是单数，components属性是复数。放在components里面的template这个关键字又是单数，让人来来回回非常容易混淆。而且加s是错误的，也没有提醒，很难排查错误，耽误事件。干！
2. 组件的模板template定义时候必须包裹在一对div标签中
3. 驼峰命名不能用，驼峰命名比如camelName，在取用的时候要写成camel-name

### 简介

将复杂的问题拆解，变成一个个子问题，针对子问题进行处理，对处理方法进行统一封装，就可以成为组件。在这儿指一块html代码

组件使用三个步骤：

1. 创建组件构造器: Vue.extend() => 有语法糖
2. 注册组件: Vue.component()
3. 使用组件: 在Vue实例的范围内使用

组件的构成：

1. template:     写html标签的模板
2. props:     给子组件传递属性值的
3. data:       组件的data域全部都是函数
4. methods:     组件中的方法
5. components:      定义子组件的
6. watch:      事件属性监听的

代码如下：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
</head>

<body>
    <div id="app">
        <!-- 显示 -->
        <cpn-Name>asadf</cpn-Name>
        <!-- 显示 -->
        <cpn-name></cpn-name>
        <!-- 不显示 -->
        <cpnName></cpnName>
    </div>
    <script>
        //1. 通过继承生成组件构造器
        const cpn = Vue.extend({
            template: `     
		<div>
        <br/>
        <p>first line of cpn</p>
        <p>2nd line of cpn</p>
        <p>3rd line of cpn</p>
        <p>4th line of cpn</p>
        <br/>
        </div>
		`
        })
        //2.作为Vue组件注册
        Vue.component('cpn-name'//这儿绝对不能是cpnName，否则无论如何也不起效果
        ,cpn)//第一个参数是组件标签名，第二个是定义的组件符号
        let app = new Vue({
            el: '#app',
        })
    </script>
</body>
</html>
```

** 但是这儿有坑爹玩意， Vue.component这个方法中，组件标签名定义的时候不能使用驼峰名法，否则无论如何都用不了。最好使用'"-"连接两个单词，组件标签名的使用可以忽略大小写。

### 组件划分

1. 全局和局部组件

按照如上方式注册的组件，即是全局组件。

Vue属性里面还有一个components，注册组件的语句放在这个里面，即是生成和注册局部组件。

```js
let app = new Vue({
  el: '#app',
  components: {
    'cpn-name': cpn
  }
})
let app1 = new Vue({
  el: '#app1',
})
```

定义的cpn可以是全局的。

2. 父子组件

组件里面还可以youcomponents属性，可以在里面写其它component，这个时候里面的component就是外面的子组件。

还记得上面说的组件名称大小写忽略的问题不，非常邪门的是，如果你在父组件中引用子组件，又不能忽略大小写了。

对于子组件，只能够在父组件中使用。

### 语法糖和模板抽取

1. 语法糖注册方式

其实涉及到的部分只有组件构造器的生成那一步。原本第二步是这样写的 `Vue.component('cpn-name',cpn)`

现在换成如下，即Vue.extend({})中的内容取代原本的标识符放入参数中。

```js
Vue.component('cpn-name', {template: `     
		<div>
        <br/>
        <p>first line of cpn</p>
        <p>2nd line of cpn</p>
        <p>3rd line of cpn</p>
        <p>4th line of cpn</p>
        <br/>
        </div>
		`})
```

换成局部组件，也是同样的，比如原有

```js
components: {
                'cpn': cpn
            }
```

现在就换成

```js
components: {
                'cpn': {template: `     
		<div>
        <br/>
        <p>first line of cpn</p>
        <p>2nd line of cpn</p>
        <p>3rd line of cpn</p>
        <p>4th line of cpn</p>
        <br/>
        </div>
		`}
            }
```

2. 组件模板抽取

模板抽取两种方法，用script或template标签，给一个id，然后按照id选择模板就行了

```html
<!DOCTYPE html>
<html lang="en"><head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script></head>
<body>    <div id="app">
        <cpn></cpn>
        {{m}}
    </div>
    <!-- script抽取 -->
    <script type="text/x-template" id="mmm">
        <div>fuck template</div>
    </script>
    <!-- 或用template标签抽取 -->
    <template id="mm">
        <div>
            <div>template first line</div>
        </div>
    </template>
    <script>
        var app = new Vue({
            el: "#app",
            data: {
                m: 'any'
            },
            methods: {

            },components:{
                'cpn':{template: "#mm"}
            }
        })
    </script></body></html>
```

3. 组件如何访问Vue的属性
   1. 组件内无法访问到所在Vue实例的data中属性
   2. 组件prototype指向Vue
   3. 组件有自己的data域，但是这儿的data不能存放对象，data是一个函数
   4. 涉及到的代码就如下了

```html
<body>
    <div id="app">
        <cpn></cpn>
    </div>
    <template id="mm">
        <div>
            <div>template first line</div>
            {{attr}}
        </div>
    </template>
    <script>
        var app = new Vue({
            el: "#app",
            data: {
                m: 'any message from Vue'
            },
            methods: {

            }, components: {
                'cpn': {
                    template: "#mm",
                    data() {
                        return {
                            attr: 'unknown place ,but absolutely not in the field of Vue. Modified'
                        }
                    },
                }
            }
        })
    </script>
</body>
```

4. 为什么组件中的data必须是函数

   - 组件因为主要拿来复用的，那么不同引用代码中，要对引用的不同组件实例进行隔离

   - 如果是函数，可以返回一个新的对象

   - 如果是属性，那么不同的组件实例之间会共用同一个对象，由此导致脏数据


### 父子组件的通信

对于存在父子组件的那种，网络请求链接放在父组件中，父组件获取数据后，肯定要传递到子组件进行处理和显示。

父子组件通信这儿比较难，难在于各种参数名称和事件名称的对应和绑定，比较绕，主要看代码吧

- props:{}，父=>子
  - 这儿不能使用驼峰命名，否则会出问题
  - 通过字符串数组，数组中字符串就是传递时的名称
  - 通过对象可以设置传递时的类型，也可以设置默认值
  - 但并不是说在子组件的props属性中设置了父组件的属性名称就能直接绑定，代码相对复杂
  - 绑定过程示例与讲解
    - app div中通过v-bind绑定cpn的props中某个属性attr，v-bind等号右边写的是父组件的某个属性datafield
    - 有了上一步，在子组件的模板中就可通过{{}}或v-for等调用attr（v-bind的绑定是=左右，从右往左绑定）

```html
<div id="app">
    <!-- 在子组件应用于父组件的地方给以绑定，绑定的名称即可以理解成变量 -->
    <l v-bind:cldm="movies" :cldme="message"></l>
</div>
<template id="l">
    <div>
        <p>this is child component</p>
        <p>message from parent: {{cldme}}</p>
        {{cldm}}
    </div>
</template>
<script>
    var app = new Vue({
        el: "#app",
        data: {
            message: 'this is parent component',
            movies: ['Kill Bill', 'Brave Heart', '1984', 'Hulk'],
        },
        components: {
            'l': {
                template: "#l",
                props: ['cldm','cldme'] //这儿也可以写对象，参照下面注释写法
            // props: {
            //     cldm: {
            //         type: Array,
            //         default: [1, 2, 3, 4, 5]
            //     },
            //     cldme: {
            //         type: String, //指定类型Number,Boolean,Object,Date,Function,Symbol
            //         default: "message"，//指定默认值
            //			requied: true
            //     }
            // }//还能加validator:来通过函数自定义数据验证
            },
        }
    })
</script>
```

- 自定义事件（$emit），子=>父
  - 经常用到的场景是，子组件上发生的事件，子组件向父组件传递和告知
  - 一般见于子组件的methods中，对应函数中调用this.$emit

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
    <style>
        .red{
            color:red;
        }
    </style>
</head>
<body>
    <div id="app">
        <!-- 这儿可以是click，但这儿的click并不是指的click事件，而是子组件emit函数中要传递的参数名 -->
        <cpn @click="cldcpnclick"></cpn>
        <br>
        <div class="red"> {{m}}</div>
    </div>
    <!-- 或用template标签抽取 -->
    <template id="mm">
        <div>
            <!-- 下面的这儿的@click是因为子组件中监听的是click事件 -->
            <button v-for="item in books" @click="cpnclick">{{item.bookname}}</button>
        </div>
    </template>
    <script>
        //子组件定义
        const cpn = {
            template: "#mm",
            data() {
                return {
                    books: [
                        { bookname: '算法导论', pubDate: '2002 - 6 - 1', price: 63, amount: 1 },
                        { bookname: 'unix', pubDate: '2012 - 2 - 1', price: 93, amount: 1 },
                        { bookname: 'computer science', pubDate: '2007 - 12 - 1', price: 903, amount: 1 },
                        { bookname: 'algorithm', pubDate: '2010 - 1 - 1', price: 123, amount: 1 },
                    ]
                }
            },
            methods: {
                cpnclick(event){//这儿的event参数必须作为参数传入this.$emit('click',event) 中，否则即使父组件有event接受参数，也无法获取原来的事件
               this.$emit('click',event) //这儿传递的事件名称要与id="app"div中的<cpn @click="cldcpnclick"></cpn>监听的事件名称一致
               //this.$emt(event)，一个子组件的方法中，只能调用一次emit
                }
            },
        }
        var app = new Vue({
            el: "#app",
            data: {
                m: 'Test message to prove Vue is working'
            },
            methods: {
                cldcpnclick(event){
                    console.log('cldcpnclick is triggered');
                    console.log('this is event from cld',event);
                }
            }, components: {
                'cpn': cpn
            }
        })
    </script>
</body>
</html>
```

### 父子组件通信与双向绑定案例

组件之间的通信和绑定还是挺复杂的，以下代码也就是一个很简单的绑定而已

好在继续看视频后，老师告诉说是后续还有其它方式，比如v-model和watch结合，可以实现同样功能，而且代码更简洁

```html
<body>
    <div id="app">
        <cpn  @inputchange="cldinchg" :num="num1"></cpn>
        <p>number displayed from parent: {{num1}}</p>
    </div>
    <template id="cpn">
        <div>
            <input type="text" id="numaa" :value="num"  @input="inchg">
            <!-- 在这儿引用props属性中的值，并对其修改，并不会导致Vue报错，但是教程视频里面会，反而是用了data中的数据后，值不能绑定和同步 -->
            <!-- 猜测应该是版本变化导致props不再是只读属性，而是引用对象，反而data中的编程了只读 -->
            <p>number displayed from cld: {{num}}</p>
        </div>
    </template>
    <script>
        const cpn = {
            template: "#cpn",
            props: {
                num: {
                    type: Number 
                }
            }, data() {
                return {
                    danum: this.num//这儿其实没有意义
                }
            },methods: {
                inchg(event){//这儿是函数名
                    //监听的事件名称和事件对象都需要传递给父组件，
                    //前者保证子组件在父组件中对所监听事件有效，后者保证事件发生后父组件能够获取事件并取值。
                    this.$emit('inputchange',event)//inputchange是appdiv中引用的cpn组件监听的事件，
                    //而这个事件在cpn内部定义为@input的事件监听
                }
            },
        }
        var app = new Vue({
            el: "#app",
            data: {
                num1: 1,
                num2: 2
            },
            methods: {
                cldinchg(event){
                    console.log('passed to parent',event);
                    this.num1=event.target.value;//但这儿有个问题，v-model.lazy的懒加载机制会失效，所有修改都是实时的
                }
            },
            components: {
                cpn: cpn,
            }
        })
    </script>
</body>
```



### 父子组件直接访问

1. 父 => 子，$children（用得较少）或$refs（用的时候组件实例上必须要有ref属性，引用时会用上ref的值）   	
2. 子 => 父，$parent （开发中不建议使用，也用得少，因为这样会导致该组件的耦合度高，复用性差）
3. 组件 => 根， $root

```html
<body>
    <div id="app">
        <cpn ref="ra"></cpn>
        <hox></hox>
        
       <p>app-parent <button @click="btnclick">button</button>
        {{m}}
    </p>
    </div>
    <!-- 或用template标签抽取 -->
    <template id="mm">
        <div>
            <div>cpn-id-mm template first line</div>
            <button @click="pntwt">parent watch</button>
        </div>
    </template>
    <template id="m">
        <div>
            <div> hox-id-mm test subjects</div>
        </div>
    </template>
    <script>
        var app = new Vue({
            el: "#app",
            data: {
                m: 'Test message to prove Vue is working', 
                tm: "parent cpn test message, if you see this, it works at this step"
            },
            methods: {
                btnclick() {
                    //这儿$refs后面的属性名和上面app div中cpn的ref属性值一致。tm是追这个组件的tm域
                    console.log(this.$refs.ra.tm);
                }
            }, components: {
                'cpn': {
                    template: "#mm",
                    data() {
                        return {
                            tm: "this is test message from child cpn, if you see this, it works at this step"
                        }
                    },
                    methods: {
                        pntwt(){
                            console.log(this.$parent.tm);//开发中不建议使用，因为这样会导致该组件的耦合度高，复用性差
                        }
                    },
                },
                'hox': { template: "#m" }
            }
        })
    </script>
</body>
```



### SLOT

1. 简介

由于组件封装完了，其内部已经定义好了，如果下一次想用指向修改局部的内容，可能还得重新写，为让组件更有扩展性就有slot，其实就是一个`<slot></slot>`标签。slot可以有默认值，即slot内部定义的标签，在引用组件实例时，组件实例标签内部放入的标签内容，会自动替换掉原有`<slot></slot>`里的内容。

以上的解释也说明了为什么当时我直接在app div的组件标签内通过{{}}插入Vue data中的值时，会报错。

2. 具名slot

就是在组件定义时给定名字，在组件使用时，通过slot=“slotname”来替换指定组件

```html
    <div id="app">
        <cpn></cpn>
        <BR></BR>
        <cpn><p slot="meat">replace meat slot default</p></cpn>
        <BR></BR>
        <cpn><p>extra</p><p slot="god">replace god slot default</p></cpn>
        <p class="red">{{m}}</p>
    </div>
    <!-- 或用template标签抽取 -->
    <template id="mm">
        <div>
            <div>template first line</div>
            <slot><p>this is slot default content</p></slot>
            <slot name="god"><p>god slot for only god</p></slot>
            <slot name="man">man rise to down god</slot>
            <BR></BR>
            <slot name="meat">meat supply for live beings</slot>
        </div>
    </template>
```

显示效果

```
template first line
this is slot default content

god slot for only god

man rise to down god

meat supply for live beings


template first line
this is slot default content

god slot for only god

man rise to down god

replace meat slot default



template first line
extra

replace god slot default

man rise to down god

meat supply for live beings

```

3. 编译作用域与`slot`

关于编译作用域，没啥好说的，就Vue实例、组件各自有自己的作用域，互不影响。

作用域slot总结：父组件替换插槽的标签，但是内容由子组件提供

用法总结：

- 子组件的slot加上用`:cldslotdata="cldslotattr"`将子组件的slot和子组件的某个属性绑定起来，
- 在父组件想要替换的标签中加上`slot-scope=cldslotdata`。说是新版本中已经用v-slot代替，不过还没有核实。
- 父组件中想要使用或替换数据的地方，用`slot.cldslotdata`即可取出数据

代码如下：

```html
<div id="app">
    <cpn>
        <template slot="god" slot-scope="slot">
            <div>
                <!-- 尾部还会多一个--- => <span v-for="item in slot.data">{{item}}---</span> -->
                <span>{{slot.gslotdata.join(' - ')}}</span>
            </div>
        </template>
    </cpn>
</div>
<!-- 或用template标签抽取 -->
<template id="mm">
    <div>
        <slot name="god" :gslotdata="godname">
            <p>god slot for only god</p>
            <ul>
                <li v-for="item in godname">{{item}}</li>
            </ul>
        </slot>
        <slot name="man">man rise to down god</slot>
        <BR></BR>
        <slot name="meat">meat supply for live beings</slot>
    </div>
</template>
<script>
    var app = new Vue({
        el: "#app",
        data: {
            m: 'Test message to prove Vue is workin'
        },
        methods: {

        }, components: {
            'cpn': {
                template: "#mm",
                data() {
                    return {
                        godname: ['thor', 'medusa', 'apolo', 'hurcilis']
                    }
                },
            }
        }
    })
</script>
```



## 模块化

### 前端模块化

模块化雏形

问题： 多人开发 => 命名冲突 => 闭包和匿名函数即(function(){....})() => 无法再从这个包里引用任何变量  =>  降低了代码的复用性 

雏形：  =>  var moduleA=(function(){ var obj= ..., ...... return obj;})()  =>  如此一来就可以用moduleA.obj可以引用这个包里定义的变量  =>  模块化的雏形

解决： 由于已经有人按照这种方法定义了模块化并且制定了一系列标准，故“拿来主义”直接用。

常见模块化规范和实现：

1. commonjs
   - node.js
2. amd（少见）
3. cmd（少见）
4. es6 modules



### common js

commojs作为了解，但必须知道，因为webpack就是用了这个规范制定导入导出

两个核心

1. 导出

   ```js
   module.exports = {
       var_a: {},
       var_b: {},
   }
   ```

2. 导入

   ```js
   var (var_a, var_b) = require("./js/importpack")
   ```

   以上代码生效前提：有解析的依赖

### ES6 module

重点，以后肯定要用这个的

关键字：import, export（es6语法）

1. html中js代码按照模块化引用（无命名的冲突）：

```html
<script type="module"></script>
```

2. 导出

```js
//文件尾统一导出
let a={};
let b={};
...
export {a,b};
//或者定义的时候即导出
export let a={};
export let b={};
//甚至
export function f(){}
//导出的内容导入时可以自定义命名
//default每个module只能有一个
//这个测试没能成功，无论如何调试，都是undefined，不能成功导入，很奇怪。
//如果不加上{}就是按照默认导入导出，发现这条规律的时候，我终于成功导出default了
export default {}  //import anyname from "./xxxpack.js"
```

3. 导入

```js
import avar from "./somcode.js"
import {a,b} from "./apckname.js"
import * as like_python from "./asd.js"//to call => like_python.anyvar
```



## webpack



什么是webpack：前端的静态模块打包工具

依赖node环境

安装webpack: `npm install webpack@3.6.0 -g`  （对应Vue CLI 2.0的版本，可以查看Vue脚手架的很多配置问题）

目录

- src：源代码文件夹
  - main.js： 入口
- dist：打包后的文件夹
- loader: 文件转换的插件

webpack 安装cmd

```
npm install webpack -g
npm install webpack-cli -g
npm install --save-dev webpack
npm install --save-dev webpack-cli
```

### js文件配置

1. 指定入口文件

   - 初始化

   ```
   npm init 
   ```

   (package.json是npm管理时候需要的)

   - 项目根目录下创建webpack.config.js

```js
const path = require('path')

module.exports={
    entry:'./src/main.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js'
    }
}
```

按照如上内容配置后，执行`webpack`命令即可完成打包。

但是其实在开发中会使用`npm run build`来进行打包

package.json中有这么一段，对应的scripts中serve和build就是npm run serve及npm run build

```json
{
  "name": "vue-learning",
  "version": "0.1.0",
  "private": true,
  "scripts": {
   //由于我这儿是根据webstorm创建的，所以是vue相关
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
```

开发时依赖和运行时依赖

```json
"devDependencies": {
    
}
"dependencies": {
    
}
```

只要在terminal或CMD中敲命令都是使用全局依赖，但只要package.json中有script属性，就能够优先在本地查找并执行本地webpack或npm命令



### CSS及LOADER

把css文件也当做依赖文件，按照上面写的用require，比如`require('./som.css')`，引入CSS文件。

loader到官网找教程，分两个：css-loader和style-loader。webpack在读取loader时，从右往左读的，所以下面的数组中先放style-loader再放css-loader

1. CSS-LOADER只负责加载，不负责解析

   ```
   npm install --save-dev css-loader@2.0.2 ts-loader
   ```

   再到webpack.config.js中加入配置

   ```js
   module: {
       rules: [
         {
           test: /\.css$/,
           use: [
             // [style-loader](/loaders/style-loader)
             { loader: 'style-loader' },
             // [css-loader](/loaders/css-loader)
             {
               loader: 'css-loader',
               options: {
                 modules: true
               }
             },
             // [sass-loader](/loaders/sass-loader)
             { loader: 'sass-loader' }
           ]
         }
       ]
     }
   ```

2. STYLE-LOADER负责解析

   ```
   npm install --save-dev style-loader
   ```

3. 负责处理img

   ```
   npm install url-loader --save-dev
   ```

   如果img作为模块引入则

   ```
   import img from './image.png';

   module: {
       rules: [
         {
           test: /\.(png|jpg|gif)$/i,
           use: [
             {
               loader: 'url-loader',
               options: {
                 limit: 8192,
               },
             },
           ],
         },
       ],
     }
   ```

   img模块只能负责处理大小在以上limit值以内的图片，如果超过该limit，那么需要用file-loader来处理。

   ```
   npm install file-loader --save-dev
   ```

   但如果想要将图片文件打包后自动放入dist文件夹内，事实证明无论我怎么设置，打包的时候都不能把大于8kb的img文件放入到dist文件夹中。包括css文件也过去不了。但文件呢能够正常访问，先不管了，草。等以后需要的时候再说吧

   babelloder,针对webpack4.x以上的。
   ```
   npm install -D babel-loader @babel/core @babel/preset-env
   ```
   对应配置
   ```
   {
         test: /\.m?js$/,
         exclude: /(node_modules|bower_components)/,
         use: {
           loader: 'babel-loader',
           options: {
             presets: ['@babel/preset-env','es2015'],
           }
         }
       }
   ```

### webpack-使用Vue的配置过程

1. 安装Vue

```vue
npm install vue --save
```

2. import Vue from ‘vue’;

3. 配置Vue template的解析

   Vue有runtime-only和runtime-compiler两种版本，默认引用的是runtime-only，但在webpack打包后使用，会出现问题，需要给webpack.config.js中加入以下

```js
  resolve:{
        alias:{
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
```

4. webpack或npm run build

5.  .vue文件封装

   对main.js，index.html进行抽取和分离

- 先看html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
<script src="/dist/bundle.js" type="module"></script>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

- 实际上`<div id="app"></div>`会被Vue对象中的template内的东西替换掉，所以就可以这么固定写main.js

```js
import Vue from 'vue';
import App from "./vue/app"

let app=new Vue({
    el:"#app",
    template:'<App></App>',
    components:{
        App
    }
})
```

- App是导入的，导入的app.js示例如下

```js
export default {
    template: '<div>{{message}}</div>',
    data() {
        return {
            message: "Vue is correctly referred if you see this."
        }
    },
}
```

- 再安装vue-loader和vue-template-compiler

```
npm install vue-loader vue-template-compiler --save-dev
```

- 配置webpack.config.js

```js
{//vue-loader
    test: /\.vue$/,
        use:['vue-loader']
}
```

如果到这一步，还是会报错，如果异常是`Module not found: Error: Can't resolve './vue/App.vue'`，那么是VueResource模块没有安装。

```
npm install vue-resource --save-dev
```

上面的安装还是报`Module not found: Error: Can't resolve './vue/App.vue' in 'E:\IdeaSpace\vue-learning\src\vue'`，改成了绝对路径

```
 './vue/App.vue'	 =>	import Hello from "/src/vue/App.vue"
```

按照coderwhy，所说，如果还报错，那么就要将vue-loader降到^13.0.0的版本，因为从14开始，需要依赖于另一个插件。

可是降低了版本仍然没有好，bug如下

```
Module parse failed: Unexpected token (2:0)
File was processed with these loaders:
 * ./node_modules/vue-loader/lib/index.js
You may need an additional loader to handle the result of these loaders.
| 
> <div>
|   <img alt="Vue logo" src="../assets/logo.png">
|   <HelloWorld msg="Welcome to Your Vue.js App"/>
 @ ./src/vue/App.vue 1:0-82 11:2-8 12:2-17
 @ ./src/vue/app.js 1:0-37 10:11-16
 @ ./src/main.js 10:0-28 15:9-12
```

于是又搜了下，还是要加入配置

```js
//先引入
const VueLoaderPlugin = require('vue-loader/lib/plugin')
//再配置插件
plugins: [
    // 请确保引入这个插件来施展魔法
    new VueLoaderPlugin()
  ]
```

搞到这儿，我已经快被搞吐了，然后刚好是在官网上找到VueLoaderPlugin，看到如下：

>如果你不想手动设置 webpack，我们推荐使用 [Vue CLI](https://github.com/vuejs/vue-cli) 直接创建一个项目的脚手架。通过 Vue CLI 创建的项目会针对多数常见的开发需求进行预先配置，做到开箱即用。

> 如果 Vue CLI 提供的内建没有满足你的需求，或者你乐于从零开始创建你自己的 webpack 配置，那么请继续阅读这篇指南

靠，说起来算是被这老师带入深沟，连他自己都说，webpack配置他自己很少动，也就是说他自己也很少写，自己搭建配置很少用到，那何必呢？我还纠结在这人，直接上vue-cli。用上vue-cli后再来回顾他讲的一些插件啥的使用，这样明明可偷懒，却要一边敲代码，一边debug，多浪费时间。





整合命令与配置

```
npm install css-loader@2.0.2 ts-loader style-loader url-loader file-loader --save-dev
```

webpack.config.js配置

```js

```

## Vue CLI

node版本8.9以上

vue-cli3

``` 
npm install -g vue
npm install -g @vue/cli
```

​	之后vue create+项目名称

coderwhy视频中是说：vue-cli2(在安装3以后)

```
npm install -g @vue/cli-init
```

​	之后vue init webpack +项目名称

实际上自己又重新创建了一下vue的项目，按照提示，vue create myproject完成之后，会出来让你输入

```
cd myproject
npm run serve
```

于是我就按照说的来了下，发现好家伙原来可以直接跑起来，搞了半天这个cli中不再需要webpack.config.js等等恶心人的东西，我就说嘛怎么可能有了脚手架还让自己去搞那些东西。

再有，原来想用node.js跑起这个vueApp，是要输入`npm run serve`。这个node.js还有npm相关的内容我不懂，踩了坑。

`npm run build`是构建和打包

## Vue Router

路由的重要概念：路由表

路由表本质上是映射表，决定数据包指向。

前端路由和后端路由-前端渲染和后端渲染

SPA是指single page application，即在一个网络应用中，只有一个html页面，而页面的内容改变是由前端路由控制，对不同的请求进行响应的同时只对网页局部更新，也就是对某个页面的请求，只装配数据，不进行跳转，涉及到的核心API是：

1. location.hash（Vue默认）
2. history
   - history.pushState({},'','urlName')和history.back, history.forward,  history.go(int)往前/后跳一次，history.go("urlName")
   - history.repalceState({},'','urlName')

相比之下，location.href是请求+后端跳转

### 路由使用

如果不是用vue-cli，那么就是

安装路由`npm install vue-router --save`

模块化工程中使用

- 导入路由对象，Vue.use(VueRouter)
- 创建路由实例，传入路由映射配置
- Vue实例中挂载创建的路由实例

参照生成的代码

```js
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter) //使用Vue的插件如VueRouter或Vuex等，必须先调用Vue.use，这个里面会调用插件的install方法

const routes: Array<RouteConfig> = [
  {
    path: '/',        //path对应的是路由路径
    //redirect:"/xxx"，如果在这儿设置redirect，就是通过重定向设置默认值
    name: 'Home',         //这儿命名只是为了便于后续调用
    component: Home,      //对应路由路径的组件
    meta:{
      title:"Home"
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta:{//这儿的meta用于存储和获取数据，相当于组件中的data域
      title:"About"
    }
  },
  {
    path:"/user/:userName",
    name:'User',
    component: ()=> import('../views/User.vue') ,
  }
]

const router = new VueRouter({
  routes,
  mode:'history',
  linkActiveClass:"jupiter"
})

router.beforeEach((to,from,next)=>{
  console.log("rerouted by routers");
  next()
})

export default router
```



```html
<template>
  <div id="app">
    <div id="nav">
      <!-- 在视图中设置要请求的路由路径 -->
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <!-- 这儿呈现跳转到指定路由路径后的视图 -->
    <router-view/>
  </div>
</template>
```

router-link

`<router-link to="/">Home</router-link> `有诸多属性，

- to表示跳转

- tag指定渲染之后router-link使用的标签

- replace不会留下history记录，后退

- active-class：当<router-link>对应的路由匹配成功时，会给当前元素设置一个router-link-active的class，设置active-class可以修改默认名称

  ```js
  const router = new VueRouter({
    routes,
    mode:'history',//用于让history.pushState等生效
    linkActiveClass: 'active'  //即这儿的值，可以在router-link中生效
  })
  ```

通过代码控制，即在Vue实例的函数中，写入如下代码

```html
<script>
this.$router.push('/url'+this.data/computed) //等于跳转到/url，即等同于<router-link to="/url">
</script>
```

动态路由，即指(/url/keyId)，代码中this.$route.param.keyId获取到的即使当前活跃的router所携带的参数，template标签中{{$route.param.keyId}}也能获得同样的内容

```
User.vue如下
<template>
    <div class="user">
        <h3>this is User interface, if you see this, it means you have successfully loaded user component</h3>
        <p>{{userInfo()}}</p>
    </div>
</template>

<script>
export default {
    methods:{
        userInfo(){
            console.log(this.$route.params.userName);
        }
    }
}
</script>
route/index中配置如下
  {
    path:"/user/:userName",
    name:'User',
    component: ()=> import('../views/User.vue') 
  }
  之后通过/user/userName即可访问该页面，并动态获取userName的实际值。
```

注意：**this.\$route是表动作过程，可获取当前活跃router和其响应当前url时的一系列状态和数据，this.\$router表对象，获取route/index中的`const router=new VueRouter`对象，控制页面跳转等**

### 懒加载、嵌套和参数传递

懒加载

1. 方式一、结合Vue的异步组件和Webpack的代码分析

   代码过于复杂，就不写了

2. 方式二、AMD写法

   ```js
   const User= resolve => require(['../views/User.vue',resolve])
   ```

3. ES6中用更简单写法

   ```js
   component: ()=> import('../views/User.vue') 
   //或者
   const User= ()=> import('../views/User.vue') 
   ```



嵌套路由

即/home/product和/home/customer，从home的基础路径走入下一个层级路径

步骤

1. 创建路由子组件

2. 组件内部再使用`<router-view>`

   ```
   <router-link to="/user/report"></router-link>
   <router-view></router-view>
   ```

3. 在router/index进行配置

   ```js
     {
       path:"/user/:userName",
       name:'User',
       component: ()=> import('../views/User.vue') ,
       children:[
         {
           path:"report",//这儿的子路由path前不能加"/"
           name:'Report',
           component: ()=>import('..views/report.vue')
         }，
         {
           path:"evaluate",//这儿的子路由path前不能加"/"
           name:'Evaluate',
           component: ()=>import('..views/evaluate.vue')
         }，
         {
         path:'',
         redirect:"report"//这样就默认设置了跳转到report对应的路径
         }
       ]
     }
   ```



参数传递

参数传递主要通过两种形式实现：params和query

1. params(:表示v-bind绑定对象)
   - 配置路由格式： /router/:id
   - 传递方式，在path后面加上对应的值
   - 例如 /router/123, /router/abc，123或abc即是传递的参数
   - 取值：`{{\$route.params.id}}`, `this.$route.params.id`
2. query
   - 配置路由格式： /router
   - 传递方式，对象中使用query的key作为传递方式
   - /router?id=123&name=abc
   - 取值：`{{\$route.query.id}}`, `{{\$route.query.id}}`,`this.$route.query.id`



如果使用`<router-link>`，代码可以体现为

```html
<router-link to="{path: '/url',query:{name:'abc',id:123}}"></router-link>
```

但上述就直接把请求的内容给写死了，所以仅限测试时候使用.

控制跳转的代码为：

```js
this.$router.push({path: '/url',query:{name:'abc',id:123}})
```

### 导航守卫和KEEPALIVE

导航守卫

在router跳转过程中间，想实现监听功能，执行相应代码，实现这一功能的就叫导航守卫。实现方法有两种：

1. 结合Vue组件的生命周期，在创建、挂载和更新时插入代码，但代码繁琐复杂，要写的东西太多

   ```js
   new Vue({
     created(){
       
     },
     mouted(){//挂载时，回调本方法
       
     },
     updated(){//页面发生刷新的时候，会产生回调
       
     }
   })

   ```

2. 使用导航守卫，导航守卫分为全局守卫和路由独享守卫

   router对象本身有一个beforeEach的方法，`router.beforeEach()`，在这儿传入函数对象，要注意的地方是，原本beforeEach中有调用`next()`，在调用`router.beforeEach()`传入函数对象时，也必须调用`next()`

   ```js
   router.beforeEach((to,from,next)=>{
     console.log("rerouted by routers");
     next()//或者next('/url')跳转到指定页面
   })
   ```

   同样还有afterEach()，是指每次跳转后，后置钩子不用调用next

   ```js
   router.afterEach((to,from)=>{
     console.log("rerouted by routers");
   })
   ```

   独享守卫一般这样

   ```js
   const router=new VueRouter({
     routes:[
       {
         path:"/route",
         component:Route,
         beforeEnter:(to,from,next)=>{ 
         }
       }
     ]
   })
   ```


keep-alive

router用于跳转，keep-alive是用于保持已经创建的组件在下次调用时直接使用缓存，用法也很简单。这一对标签将router-view包起来就行。keep-alive包含include和exclude两个属性，其值可以为字符串或正则表达式

```html
<keep-alive exclude="component1,component2">
    <router-view></router-view>
</keep-alive>
```

一般keep-alive会与生命周期函数，created，updated，beforedestroy等等连用，以保持router的跳转状态和记录



### 案例-tabbar

icon链接：<https://www.iconfont.cn/collections/detail?spm=a313x.7781069.1998910419.d9df05512&cid=27727>

里面涉及到种种的实际使用，将之前学到的知识全部用上了，还是挺不错的，具体看代码吧。最重要的是这个具体的组件tabbaritem

```html
<template>
  <div class="tab-bar-item" @click="routeTo">
    <!-- 插槽包装一层div，用于定义其它属性，isActive和.active决定状态 -->
    <div><slot v-if="isActive" name="item-icon-active"></slot></div>
    <!-- v-if，v-else动态绑定slot -->
    <div><slot v-if="!isActive" name="item-icon"></slot></div>
    <!-- ：class绑定文字活跃颜色 -->
    <div :style="{color:getActiveColor}"><slot name="item-text"></slot></div>
  </div>
</template>
<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  /* tabbar常用高度49 */
  font-size: 10px;
}
.tab-bar-item img {
  height: 25px;
  widows: 25px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
.active {
  color: gray;
}
</style>
<script>
export default {
  name: "TabbarItem",
  props:{//这儿用props，是自己属性传给自己
    path:String,
    activeColor:{
      color: String,
      default: "gray"
    }
  },
  computed:{
    getActiveColor(){
      if(this.$route.path==this.path){ 
      return this.activeColor}
      return 'black'
    },
    isActive(){
      return  this.$route.path==this.path
  }
  },

  methods: {
    routeTo() {
       if(this.$route.path!=this.path){ 
       this.$router.push(this.path)}
     },
  },
};
</script>
```

有几个要注意的：

1. 垂直居中布局在tabbar中定义

   ```css
   #tab-bar {
     display: flex;
     background-color: #f6f6f6;
     position: fixed;
     left: 0;
     right: 0;
     bottom: 0;
     box-shadow: 0px -2px 5px rgba(100, 100, 100, 0.1);
   }
   ```

2. 导航栏与上方的box-shadow预留出空间，是在  `margin-top: 3px;`，  `vertical-align: middle;`， ` margin-bottom: 2px;`里面定义的。

3. 在Vue的路径处理配置中，@和src目录映射在了一起，也就意味着，所有写的代码在引用路径时，都可以@打头，再写次级目录，例外的是html各种标签的src中，如`\<img src="~@"\>，要在src前面加上~才能够被Vue解析。

4. 如果要对Vue-cli的默认配置进行修改，那么要在项目路径下配置vue.config.js文件，通过`module.exports={}`进行设置。但需要对Vue和webpack非常熟悉，才能够改




## Vuex

vuex是什么呢，官方讲是集中式状态管理器。但实际上可以理解成为项目范围内的全局变量或者全局单例对象。

Vue的全局单例，或者说js的全局变量的实现和java不太一样。一个对象的prototype是唯一的，给prototype赋予某个属性所有的其它实例都能访问到，其值是唯一的，对其修改也是。如

```js
Vue.prototype.$store=store
```

之前有学到过的this.$router等也是这个样子来储存值的

### Vuex核心概念

![vuex](https://vuex.vuejs.org/vuex.png)

对于上图，有以下说明：

1. state用于保存全局变量的
2. actions和mutations是对state进行修改的函数，actions是异步的，mutations是异步的
3. 调用mutations进行异步操作的，主要是为了保证devtool能够监听到修改
4. 除此之外，还有module和getters，getters专门用于返回数据，module是为了对全局变量按照模块进行划分

### mutations

**mutations中函数参数**

需要注意`mutations`中函数传入的参数是state，所以应该调用state的属性去获取值

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //保存全局变量的值
     nomber:123
    //其它地方通过$store.state.nomber取值
  },
  mutations: {
    //同步操作，在这儿做，可以与devtool进行通信，异步操作不能写在这儿
   modnomber(state){
      //在Vue的管理下，上面state中的nomber的数值，能够直接传入到这儿
       return state.nomber++;
    }
  },
  actions: {
    //如果有异步操作，在这儿写，一般与后端进行交互
  },
  modules: { 
    //将store的数据按照模块进行划分
  },
  getters:{
      //这儿纯粹写只读属性
  }
})
```

其它地方调用`mutations`的方法如下

```js
 methods: {
    ok() {
      this.$store.commit("mold",payload//如果mutation中函数有参数，那么在这儿传入);
    },
```

**mutations调用时参数**

关于上面`this.$store.commit()`中的参数，有如下说明：

1. 携带的额外参数被称为payload
2. 如果参数不止一个，那么在mutations中则传入payload对象，例如`{name:'xx',nomber:123}`，调用时通过`payload.a`或`payload.b`调用

在以上说明基础上，可以说明，在Vue中还有另一种方式的提交，

```js
this.$store.commit({
	type:"mold",
	nomber:896768
})
```

在mutations中，提取

```js
change(state,payload){
	state.nomber=payload.nomber
}
```

**mutations响应式规则**

在数据发生变化，要调用mutations时候，尤其需要注意发生的变化是否为Object，如果是一个对象中某个属性发生变化，必须通过响应式方式来写代码，有下面两种方式：

1. Vue.set和Vue.delete

   ```js
   mutations:{
       change(state,payload){
       Vue.set(state.obj,'attrName',newVal)//以这种方式取代state.obj['attrName']=newVal
       Vue.delete(state.obj,'attrName')//如果删除，用这种方式
       }
   }
   ```

2. 用新对象直接覆盖旧对象

   ```js
   mutations:{
       change(state,payload){
           state.obj.att = payload.text;
       }
   }
   ```

反正说起来，就像是在数组中不能用[index]修改v-bind的内容一样，这儿也不能通过['att']获取属性并修改。

**mutations类型常量**

这个主要为了防止this.$store.commit中将mutations中的属性值写错。步骤有三

1. /store/mutations-types.ts中

   ```js
   export const CHANGE='change'
   ```

2. 在/store/index.ts的mutations中这么写

   ```js
   import {CHANGE} from "@/store/mutations-types.ts"

   ...
   mutations:{
       [CHANGE](state){
           //todo code
       }
   }
   ...
   ```

3. 在别处引用

   ```js
   import {CHANGE}  from "@/store/mutations-types.ts"

   this.$store.commit(CHANGE)
   ```

### actions

如果有异步操作，需要通过actions来操作，mutations进行的异步操作无法记录在devtool中

```js
actions:{
    actionDipatcher(context){//这儿的context即是$store了
    context.commit(CHANGE)
    }
}
```

调用的代码是

```js
this.$store.dispatch('actionDipatcher',"dispatched by actions")//这儿的名称应该是actions中定义的名称
```

非常有意思，在actions中也可以用promise来实现请求和数据处理的分离

```js
//因为返回了promise对象，所以可以在调用时直接调用then()
[ASYN](context,url: string) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(url, " here request is send");
          resolve('this is result')
        }, 1000)
      })
    }
//这儿调用then
this.$store.dispatch(ASYN, "dispatched by actions").then((res)=>{
        console.log("here request has been processed and data returned, here is for data post handle");
        console.log(res);
      });
```

### modules

就像是components中可以再套components，在这new Vue.Store中modules中也可以再嵌套定义

**state**

对于模块中的state，规则如下

```js
//抽取的写法
const moduleUser={
  state: {
    //因为其它module里面的数据都会被integrated into主体的
    //所以其它的地方需要用{{$state.user}}获取
    username:12,
    passwordHas:'a'
  },
  mutations: {},
  actions:{},
  getters:{}
}
//在
new Vue.Store({
  modules: { 
    user:moduleUser,//类型是module类型
    order:{
      state: {
      //取值是通过{{$state.order.orderNumber}}
      orderNumber:12,
      },
      mutations: {},
      actions:{},
      getters:{}
    }
  }
  })
```

**mutations**

模块中的mutations并不需要类似state那样去调用模块，而是直接用，因为Vuex在查找的时候，主体里面没有，会去模块中找的。如果要引用主体state中的属性，那么在模块中的mutations中传入第三个参数rootState，这个中可获取到相应属性。

**actions**

模块的action，其作用域在模块内隔离，在action中，传入的context只是模块内的，但是这个context也有rooteState，rootGetters等属性

### 目录结构

```
store
|-----index.js
|-----actions.js
|-----mutations.js
|-----modules
	  |-----moduleA.js
      |-----moduleB.js
```





## AXIOS

测试用接口(截止2021.1.7还有效)：`http://123.207.32.32:8000/home/multidata`







## 补充ES6语法

### var和let

var的设计有缺陷，let可以看成更完美的var，大概十年前let已经在js中出现了。

- let有块级作用域（指在if和for中有代码块的块级作用域）
- var在if和for的代码块中并不具有块级作用域，是全局作用域，模块之间相互引用也会变成全局作用域。解决的办法是使用函数闭包，因为函数有作用域。

要解决var的设计缺陷，在es5中需要使用闭包来解决，在es6中使用let即可。

### const

将一个变量变成常量，等同于java的final。

在开发中优先使用const，除非后续要对标识符进行修改。

注意点：

- const定义的标识符不能修改
- const定义标识符的时候必须给以赋值
- 如果const定义的标识符指向对象，对象不可变，但是对象的属性可变。即内存中指向对象的指针/内存地址不可变。

### 对象字面量增强写法

对象的自变量，例如const obj={}这句表达式中，{}即为对象的自变量

 属性增强写法

```js
//有如下语句进行对象赋值
const name="a";
const age=18;
const height=190;
//ES5中写法
const aPerson= {
  name: name;
  age: age;
  height:height
}
//ES6中写法
const aPal={
  name,
  age,
  height
}
```

函数的增强写法

```js
//es5
var esFiveFunc={
        run:function(){

        },
        speak: function(){

        }
    }
//es6
var esSixFunc={
    run(){

    },
    speak(){

    }
}
```

### 遍历

1. `iterable`介绍

   遍历`Array`可以采用下标循环，遍历`Map`和`Set`就无法使用下标。为了统一集合类型，ES6标准引入了新的`iterable`类型，`Array`、`Map`和`Set`都属于`iterable`类型。

   `for ... of`循环是ES6引入的新的语法，`iterable`类型的集合可以通过新的`for ... of`循环来遍历。

2. `for ... of`和`for ... in`的区别？

   `for ... in`循环由于历史遗留问题，它遍历的实际上是对象的属性名称。一个`Array`数组实际上也是一个对象，它的每个元素的索引被视为一个属性。

   当我们手动给`Array`对象添加了额外的属性后，`for ... in`循环将带来意想不到的意外效果：

```js
var a = ['A', 'B', 'C'];
a.name = 'Hello';
for (var x in a) {
    console.log(x); // '0', '1', '2', 'name'
}

```

​	`for ... in`循环将把`name`包括在内，但`Array`的`length`属性却不包括在内。

​	`for ... of`循环则完全修复了这些问题，它只循环集合本身的元素：

```js
var a = ['A', 'B', 'C'];
a.name = 'Hello';
for (var x of a) {
    console.log(x); // 'A', 'B', 'C'
}
```

3.  更好的方法

   更好的方式是直接使用`iterable`内置的`forEach`方法，``forEach()``方法是ES5.1标准引入的，它接收一个函数，每次迭代就自动回调该函数。

```js
var a = ['A', 'B', 'C'];
a.forEach(function (element, index, array) {
    // element: 指向当前元素的值
    // index: 指向当前索引
    // array: 指向Array对象本身
    console.log(element + ', index = ' + index);
});
```

​	4.set和map的遍历

​	`Set`与`Array`类似，但`Set`没有索引，因此回调函数的前两个参数都是元素本身：

```js
var s = new Set(['A', 'B', 'C']);
s.forEach(function (element, sameElement, set) {
    console.log(element);
});

```

​	`Map`的回调函数参数依次为`value`、`key`和`map`本身：

```js
var m = new Map([[1, 'x'], [2, 'y'], [3, 'z']]);
m.forEach(function (value, key, map) {
    console.log(value);
});
```



### 字符串

``之间包裹的也是字符串，而且可以支持换行，不用拼接

类型判断： type of

### 箭头函数的this指向

1. 箭头函数本身没有this指向。
2. 如果this指向无法找到对应的对象，那么this函数指向window对象，即当前窗口
3. 由于js的缺陷，传统function(){}中进行闭包，内层的function无法指向外层函数所在对象，而this修复了这个bug
4. 箭头函数this的寻找，是向外层作用域一层一层查找，直至找到this。

详细点，可以看<https://www.liaoxuefeng.com/wiki/1022910821149312/1031549578462080>

### promise

可以参考promise的帖子：<https://www.jianshu.com/p/1b63a13c2701>

简单定义和理解：ES6中的一种异步解决方案

对于promise，有以下理解就可以，能够帮助会写代码

1. promise是一个对象，所以`let p=new Promise((resolve,reject)=>{})` （当然js中对象也是通过函数构造的，具体原理我也还不清楚），
2. promise的构造器大概长这样，`Promise(executor(resolve,reject))`，executor是promise已经定义好的构造参数函数，executor接受resolve和reject两个函数参数，在promise对象执行时候，executor即调用它两
3. resolve和reject，分别用于将promise对象的状态从pending变成fulfilled或rejected
4. 调用`resolve(param)`函数，传入的参数，一般是作为promise的结果，可以传入到then()中去
5. 一旦promise对象执行过程中抛出任何异常，都会直接跳过then，去执行catch方法
6. 不管帖子还是视频教程中都说，promise有三个状态，pending, fulfilled, rejected，，但又会提到执行了resolve未执行完then是resolved状态，所以我觉得也可以说是有四个状态，pending, resolved, fulfilled, rejected
7. promise有两个重要静态方法all和race
8. Promise.all([p1, p2, p3])用于将多个promise实例，包装成一个新的Promise实例，返回的实例就是普通的promise，它接收一个数组作为参数。数组里可以是Promise对象，也可以是别的值，只有Promise会等待状态改变。当所有的子Promise都完成，该Promise完成，返回值是全部值得数组，有任何一个失败，该Promise失败，返回值是第一个失败的子Promise结果。（这儿有些像是数据库事务）

实际上代码一般这样写

````js
let p1  = new Promise((resovle,reject)=>{
  {
    //todo,顺利执行之后获取result
    let res;
    //其实这儿的resolve就相当于return，
    //但实际上promise对象中return的是new Promise以提供链式调用
    resovle(res)
  }
  {
    //todo,执行失败之后获取result
    let res;
    //将res返回
    reject(res)
  }

}).then(res=>{
  //这儿的res即是resolve函数调用时的参数res
}).catch(err=>{
  //这儿catch错误，只要在promise对象执行过程中出现抛出任何异常，都会直接跳过then()来这儿处理
})

let p2= new Promise(()=>{})

//promise静态方法，等待所有完成后返回结果
Promise.all([p1,p2])
//promise静态方法，哪个先执行完就返回哪个结果，后执行完的结果直接丢弃。
Promise.race([p1,p2])
````



## TypeScript

typescript的type指的是类型，而非打字

如果使用typescript，对应打包的webpack配置就会有所差异。所以我们看看webpack怎么对typescript进行打包支持。新建一个项目， 初始化package.json，安装webpack。typescript的后缀是index.tsx

index.tsx

```
class Greeter {
　　greeting: string;
　　constructor(message: string) {
　　　　this.greeting = message;
　　}
　　greet() {
　　　　return "Hello, " + this.greeting;
　　}
}

let greeter = new Greeter("world");

alert(greeter.greet())
```

这段代码是官网的例子<http://www.typescriptlang.org/play/index.html>。这段代码直接在浏览器里是运行不起来的。需要通过编译，webpack进行配置

安装 ·

```
npm install ts-loader typescript --save-dev
```

webpack.config.js

```
const path = require('path');
module.exports = {
　　mode: 'production',
　　entry: './src/index.tsx',
　　module: {
　　　　rules: [{
　　　　　　test: /\.tsx?$/,
　　　　　　// ts-loader是官方提供的处理tsx的文件
　　　　　　use: 'ts-loader',
　　　　　　exclude: /node_modules/
　　　　}]
　　},
　　output: {
　　　　filename: 'bundle.js',
　　　　path: path.resolve(__dirname, 'dist')
　　}
}
```

package.json

```
"scripts": {
　　"build": "webpack"
},
```

运行npm run build。这样是否打包成功了，打包试试，发现报错了

提示说缺少一个tsconfig.json文件。

```
tsconfig.json
{
　　"compilerOptions": {
　　　　"outDir": "./dist", // 这块写不写都可以，webpack.config.js里面已经配置了output
　　　　"module": "es6", // 指的是用的es module的引入方式
　　　　"target": "es5", // 指的是打包成es5代码
　　　　"allowJs": true, // 允许tsx引入js文件
　　}
}
```

配置好之后，再运行npm run build。发现打包成功了，出现了dist,bundle.js。这个时候将bundle.js复制到控制台，能弹出hello world。说明打包生成的文件没有任何问题。