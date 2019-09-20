import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
// import registerServiceWorker from './pwa/registerServiceWorker'
// import { renderRoutes } from "react-router-config";
import renderRoutes, { routeItemType } from './utils/renderRoutes'
import { createBrowserHistory } from 'history'
import { Provider } from 'mobx-react'
// import { ConfigProvider } from 'antd'
// import zh_CN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
import 'lib-flexible'

import asyncComponent from './components/AsyncComponent'
import './styles/index.styl'
import TodoStore from './stores/TodoStore'

if (process.env.REACT_APP_MOCK === '1') {
  import('./mock/index')
}

const history = createBrowserHistory()
const stores = {
  todoStore: new TodoStore(),
}
const routes: routeItemType[] = [
  {
    path: '/',
    component: asyncComponent(() => import('./pages/Home')),
  },
]

ReactDOM.render(
  // <ConfigProvider locale={zh_CN}>
  <Provider {...stores}>
    <Router history={history}>{renderRoutes(routes)}</Router>
  </Provider>,
  // </ConfigProvider>,
  document.getElementById('root')
)
// registerServiceWorker()
