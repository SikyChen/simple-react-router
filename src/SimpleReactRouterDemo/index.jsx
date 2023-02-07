import { BroswerRouter, Link, Route, Routes } from "../simple-react-router/components";


export default function SimpleReactRouterDemo(props) {

  return (
    <BroswerRouter>
      <div className="menu">
        <ul>
          <li><Link to="/aaaa">AAAA2</Link></li>
          <li><Link to="/bbbb">BBBB2</Link></li>
          <li><Link to="/cccc">CCCC2</Link></li>
          <li><Link to="/dddd">DDDD2</Link></li>
        </ul>
      </div>
      <div className="content">
        <Routes>
          {
            props.routes.map(route => <Route key={route.path} path={route.path} component={route.component} />)
          }
        </Routes>
      </div>
    </BroswerRouter>
  )
}
