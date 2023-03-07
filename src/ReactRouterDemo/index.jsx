import { useEffect, useState } from "react"

export default function ReactRouterDemo(props) {

  useEffect(() => {
    refresh()
    window.addEventListener('popstate', () => { refresh() })
    window.addEventListener('load', () => { refresh() })
  }, [])

  const [content, setContent] = useState(null)

  function refresh() {
    const pathname = window.location.pathname
    const match = props.routes.find(route => {
      return [route.path, route.path + '/'].includes(pathname)
    })
    setContent((match || {}).component)
  }

  function handleLink(e) {
    e.preventDefault();
    window.history.pushState({}, '', e.target.href)
    refresh()
  }

  return (
    <>
      <div className="menu">
        <div className="title">简易实现</div>
        <ul>
          <li><a href="/aaaa" onClick={handleLink}>AAAA</a></li>
          <li><a href="/bbbb" onClick={handleLink}>BBBB</a></li>
          <li><a href="/cccc" onClick={handleLink}>CCCC</a></li>
          <li><a href="/dddd" onClick={handleLink}>DDDD</a></li>
        </ul>
      </div>
      <div className="content">
        {content}
      </div>
    </>
  )

}
