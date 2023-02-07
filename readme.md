# React-Router-Dom 的简易实现

## TODO LIST
- [x] history 模式
- [ ] hash 模式

## 目录
1. Router 的功能点分析
    1. 如何修改 URL ？
    2. 如何监听 URL 变化并匹配路由？
2. 实现-1
    1. 实现 handleLink 功能
    2. 实现 refresh 功能
3. 重构
    1. 实现 context 和 hooks
    2. 实现 BrowserRouter 容器
    3. 实现 Link 组件
    4. 实现 Routes Route 组件

# React Router 的实现原理

本质上，前端路由所提供的，就是一个 `修改 URL` 及 `渲染与 URL 对应组件` 的功能集合。

## 功能分析

首先来看下 `Router` 实现的基础功能：
1. 修改 URL ；
2. 监听 URL 的变化，并根据新的 URL 来匹配对应的路由组件进行渲染；

### 如何修改 URL ？
修改 URL 很容易，用 `a` 标签或者修改 `window.location.href` 都可以实现。但用这些方法修改 URL 后，浏览器会向服务端发送请求，引起页面的刷新。这不符合 `Router` 功能的需求。

但通过以下两个办法，可以做到修改 URL 且不发送请求：
1. 修改 `hash` ；
2. 通过 `history` 的 `pushState`，`replaceState`，`go` 这几个 API 来修改 URL ；

可以发现，上面两种修改 URL 的方式，刚好对应了 React-Router-Dom 的两种模式： `Hash模式` 和 `History模式` 。

### 如何监听 URL 变化并匹配路由？
1. 页面跳转或刷新后，即新打开页面时：遍历所有路由组件，将 `location.pathname === path` 的路由组件渲染出来即可；
2. 若是通过 `history` API 修改的 URL ，则可以在修改 URL 时，同步调用匹配路由的方法，以触发匹配；当然更好的方法时单独管理一份 `location` 的状态，修改 URL 时更新该 `location` 状态，所有引用该状态的路由组件，自动触发重新渲染，进而自动重新匹配。

下面是这个过程的一个流程图

<img src="https://cdn.jsdelivr.net/gh/SikyChen/figure-bed@master/images/simple_react_router_process.png" width="400">


下面将通过 `history` API 来实现一个基础的 `History模式` 的 `Router` 功能，并支持如下路由配置：

``` javascript
const routes = [
  {
    path: '/aa',
    component: <AA />,
  },
  {
    path: '/bb',
    component: <BB />,
  },
  {
    path: '/cc',
    component: <CC />,
  },
  {
    path: '/dd',
    component: <DD />,
  },
]
```

## 实现-1

有了上述的 routes 配置，使用如下的代码结构进行渲染。为方便理解，暂不对功能点进行封装：

``` javascript
export default function App() {

  // 匹配成功后，需要渲染的组件
  const [content, useContent] = useContent(null)

  //...

  return (
    <>
      <div className="menu">
        <ul>
          <li><a href="/aa" onClick={handleLink}>AA</a></li>
          <li><a href="/bb" onClick={handleLink}>BB</a></li>
          <li><a href="/cc" onClick={handleLink}>CC</a></li>
          <li><a href="/dd" onClick={handleLink}>DD</a></li>
        </ul>
      </div>
      <div className="content">
        {content}
      </div>
    </>
  )
}
```

### 实现 handleLink

前面功能分析时说过，路由的第一个功能点是修改 URL ，而 `handleLink` 方法的目的，就是修改 URL 。

`handleLink` 方法，时绑定在 `a` 标签上的，点击 `a` 标签的默认行为，会造成浏览器请求进而导致刷新，所以这里用 `event.preventDefault()` 来禁用默认行为；

禁用默认行为后，再通过 `history.pushState` 方法来修改 URL ；

URL 被修改后，需要同步的调用匹配路由的方法，以渲染匹配的路由，这里给该方法取名为 `refresh` ，意为匹配路由并渲染。

代码如下：

``` javascript
function handleLink(e) {
  e.preventDefault()
  window.history.pushState({}, '', e.target.href)
  refresh()
}
```

### 实现 refresh

匹配路由并渲染的过程如下：
1. 获取当前 URL 的 path；
2. 通过 path 跟 routes 中的所有 route.path 进行对比，匹配对应 route；
3. 将匹配到的 route 对应的组件，通过 `setContent` 设为当前显示的组件，触发重新渲染；

根据上述过程，代码如下

``` javascript
function refresh() {
  const pathname = window.location.pathname
  const content = routes.find(route => route.path === pathname)
  setContent(content)
}
```

现在已经基本实现了点击 `a` 标签，切换路由的功能。不过还差一点，当刷新页面或者前进后退时，会把页面重置为初始状态，这是因为在刷新页面后并未进行匹配，加上对页面刷新的监听即可：

``` javascript
useEffect(() => {
  refresh() // 刷新时触发匹配
  window.addEventListener('popstate', () => { refresh() })  // 浏览器前进后退时触发匹配
}, [])
```

完整代码可查看的 [ReactRouterDemo](https://github.com/SikyChen/simple-react-router/blob/main/src/ReactRouterDemo/index.jsx) 组件。
