import { useEffect, useState } from 'react'
import './App.css'
import AAAA from './pages/AAAA'
import BBBB from './pages/BBBB'
import CCCC from './pages/CCCC'
import DDDD from './pages/DDDD'

const routes = [
  {
    path: '/aaaa',
    component: <AAAA />,
  },
  {
    path: '/bbbb',
    component: <BBBB />,
  },
  {
    path: '/cccc',
    component: <CCCC />,
  },
  {
    path: '/dddd',
    component: <DDDD />,
  },
]

function App() {

  useEffect(() => {
    window.addEventListener('popstate', (res) => {
      refresh()
    })
    window.addEventListener('load', (res) => {
      refresh()
    })
  }, [])

  const [content, setContent] = useState(null)

  function refresh() {
    const pathname = window.location.pathname
    const match = routes.find(route => {
      return [route.path, route.path + '/'].includes(pathname)
    })
    setContent((match || {}).component)
  }

  function handlePush(e) {
    e.preventDefault();
    window.history.pushState({}, '', e.target.href)
    refresh()
  }

  return (
    <div className="App">
      <div className="menu">
        <ul>
          <li><a href="/aaaa" onClick={handlePush}>AAAA</a></li>
          <li><a href="/bbbb" onClick={handlePush}>BBBB</a></li>
          <li><a href="/cccc" onClick={handlePush}>CCCC</a></li>
          <li><a href="/dddd" onClick={handlePush}>DDDD</a></li>
        </ul>
      </div>
      <div className="content">
        {content}
      </div>
    </div>
  )
}

export default App
