import './App.css'
import AAAA from './pages/AAAA'
import BBBB from './pages/BBBB'
import CCCC from './pages/CCCC'
import DDDD from './pages/DDDD'
import ReactRouterDemo from './ReactRouterDemo'
import SimpleReactRouterDemo from './SimpleReactRouterDemo'

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

  return (
    <>
      <div className="App">
        <ReactRouterDemo routes={routes} />
      </div>
      <div className="App">
        <SimpleReactRouterDemo routes={routes} />
      </div>
    </>
  )
}

export default App
