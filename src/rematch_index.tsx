// import { ConfigProvider } from 'antd'
// import { renderRoutes } from "react-router-config";
// import registerServiceWorker from './pwa/registerServiceWorker'
// import zh_CN from 'antd/lib/locale-provider/zh_CN'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import renderRoutes, { routeItemType } from './utils/renderRoutes'
import { createBrowserHistory } from 'history'
import 'moment/locale/zh-cn'
import 'lib-flexible'
import { Loading } from '@teambition/clarity-design'
import { connect } from 'react-redux'

import asyncComponent from './components/AsyncComponent'
import './styles/index.styl'
import { store } from './store'
import { IRootState } from '@/store'

function mountApp() {
  const history = createBrowserHistory()
  const routes: routeItemType[] = [
    {
      path: '/',
      component: asyncComponent(() => import('./pages/PC/Rematch_Todo')),
    },
  ]

  type IProps = ReturnType<typeof mapState>

  const LoaderWapper = (props: IProps) => (
    <Loading spinning={props.loading} color="blue">
      <Router history={history}>{renderRoutes(routes)}</Router>
    </Loading>
  )

  const mapState = (state: IRootState) => {
    return {
      loading: state.loader.loading,
    }
  }

  const ConnectLoader = connect(
    mapState,
    null,
  )(LoaderWapper)
  class App extends Component {
    public render() {
      return (
        // <ConfigProvider locale={zh_CN}>
        <div style={{ height: '100vh' }}>
          <Provider store={store}>
            <ConnectLoader />
          </Provider>
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
