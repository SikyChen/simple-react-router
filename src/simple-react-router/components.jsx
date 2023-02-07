import React, { Fragment, useEffect, useMemo, useState } from "react"
import { LocationContext, NavigationContext } from "./context"
import { useLocation, useNavigation } from "./hooks"

/**
 * # BroswerRouter 组件
 * 路由的容器组件，需要跳转的路由页面和Link等，都需要被此容器组件包裹，常写作
 * ``` javascript
 * <BrowserRouter>
 *   <App />
 * </BrowserRouter>
 * ```
 * @param {Array<ReactElement>} children 
 */
export const BroswerRouter = (props) => {
  
  const [location, setLocation] = useState(window.location)
  const navigation = {
    basename: '/',
    navigator: {
      push: handlePush,
      replace: handleReplace,
      go: handleGo,
    }
  }

  useEffect(() => {
    window.addEventListener('popstate', () => { updateLoaction() })
    window.addEventListener('load', () => { updateLoaction() })
  }, [])

  function updateLoaction() {
    setLocation({...window.location})
  }

  function handlePush(path) {
    const searchAndHash = location.href.split(location.pathname)[1];
    window.history.pushState({}, '', path + searchAndHash)
    updateLoaction()
  }

  function handleReplace(path) {
    const searchAndHash = location.href.split(location.pathname)[1];
    window.history.replaceState({}, '', path + searchAndHash)
    updateLoaction()
  }

  function handleGo(number) {
    window.history.go(number)
    updateLoaction()
  }

  return (
    <LocationContext.Provider value={location}>
      <NavigationContext.Provider value={navigation}>
        {props.children}
      </NavigationContext.Provider>
    </LocationContext.Provider>
  )
}

/**
 * # Link 组件
 * - 将会被渲染为 a 标签，但会阻止 a 标签的点击跳转行为。
 * - 当点击时，会使用 navigator.push 方法中的 history.poshState 切换 url。而后再根据 location.pathname 来切换匹配的路由 Route 组件
 * @param {String} to 
 * @param {Array<ReactElement>} children 
 */
export const Link = React.forwardRef((props, ref) => {

  const navigator = useNavigation()

  function handleClick(e) {
    e.preventDefault()
    navigator.push(props.to)
  }

  return <a href={props.to} onClick={handleClick} ref={ref}>{props.children}</a>
})

/**
 * # Routes 组件
 * Route 组件的容器，当 url 变化时，重新遍历其子 Route 组件，渲染对应 path 的 Route
 * @param {Array<ReactElement>} children 只接受 Route 作为其子组件
 */
export const Routes = React.forwardRef((props, ref) => {

  const location = useLocation()

  const match = useMemo(() => {
    return props.children.filter(child => child.props.path === location.pathname)
  }, [props.children, location.pathname])

  return <Fragment ref={ref}>{match}</Fragment>
})

/**
 * # Route 组件
 * @param {String} path 
 * @param {ReactElement} component
 */
export const Route = React.forwardRef((props, ref) => {

  if (!props.path) {
    throw new Error(`<Route> needs a path`)
  }

  return <Fragment ref={ref}>{props.component}</Fragment>
})
