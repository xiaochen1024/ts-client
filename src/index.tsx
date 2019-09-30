// import { ConfigProvider } from 'antd'
// import { renderRoutes } from "react-router-config";
// import registerServiceWorker from './pwa/registerServiceWorker'
// import zh_CN from 'antd/lib/locale-provider/zh_CN'
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import renderRoutes, { routeItemType } from './utils/renderRoutes'
import { createBrowserHistory } from 'history'
import { Provider } from 'mobx-react'
import 'moment/locale/zh-cn'
import 'lib-flexible'
import { Loading } from '@teambition/clarity-design'

import asyncComponent from './components/AsyncComponent'
import './styles/index.styl'
import TodoStore from './stores/TodoStore'
import loaderStore from '@/stores/LoaderStore'

function mountApp() {
  const history = createBrowserHistory()
  const stores = {
    todoStore: new TodoStore(),
  }
  const routes: routeItemType[] = [
    {
      path: '/',
      component: asyncComponent(() => import('./pages/PC/Home')),
    },
  ]

  @observer
  class App extends Component {
    public render() {
      return (
        // <ConfigProvider locale={zh_CN}>
        <div style={{ height: '100vh' }}>
          <Loading spinning={loaderStore.loading} color="blue">
            <Provider {...stores}>
              <Router history={history}>{renderRoutes(routes)}</Router>
            </Provider>
          </Loading>
        </div>
        // </ConfigProvider>,
      )
    }
  }

  ReactDOM.render(<App />, document.getElementById('root'))
  // registerServiceWorker()
}

if (process.env.REACT_APP_MOCK === '1') {
  import('./mock/index').then(() => {
    mountApp()
  })
} else {
  mountApp()
}
