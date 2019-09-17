import React from 'react'
import { Route, Switch } from 'react-router-dom'
// import storage from '../utils/storage'
// import { LOGIN_INFO, MENU } from '../constants/index'

export type routeItemType =
  | {
      path: string
      component: any
      key?: string
      exact?: boolean
      strict?: string
      children?: []
    }
  | undefined
const renderRoutes = (routes: routeItemType[]) => {
  // const { pathname } = window.location
  // const menus = JSON.parse(storage.getItem(MENU) || '[]')
  // const loginInfo = JSON.parse(storage.getItem(LOGIN_INFO) || '{}')

  // const findIterator = (arr: routeItemType[]): routeItemType => {
  //   return arr.find((v: routeItemType): boolean => {
  //     if (v && v.path && v.path === pathname) {
  //       return !!v
  //     } else if (v && v.children) {
  //       return v.children && !!findIterator(v && v.children)
  //     } else {
  //       return false
  //     }
  //   })
  // }
  // const findFirseMenu = (arr: routeItemType[]): routeItemType => {
  //   return arr.find((v: routeItemType): boolean => {
  //     if (v && v.path) {
  //       return !!v
  //     } else if (v && v.children) {
  //       return v.children && !!findIterator(v.children)
  //     } else {
  //       return false
  //     }
  //   })
  // }

  // if (pathname !== '/login' && !loginInfo.token) {
  //   window.location.replace('/login')
  //   return
  // }
  // let hasMenuAuth
  // if (pathname === '/login') {
  //   hasMenuAuth = '/login'
  // } else if (pathname === '/') {
  //   hasMenuAuth = '/'
  // } else {
  //   hasMenuAuth = findIterator(menus)
  // }
  // if (!hasMenuAuth) {
  //   const firseMenu = findFirseMenu(menus)
  //   window.location.href = firseMenu ? firseMenu.path : '/login'
  //   return
  // } else {
  return (
    <Switch>
      {routes.map((route: routeItemType, i: number) => (
        <Route
          key={(route && route.key) || i}
          path={route && route.path}
          exact={route && route.exact}
          render={(props: {}) =>
            route && <route.component {...props} route={route} />
          }
        />
      ))}
    </Switch>
  )
  // }
}

export default renderRoutes
