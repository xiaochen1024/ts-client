import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { renderRoutes } from 'react-router-config'

import TodoStore from '@/stores/TodoStore'
import { get } from '@/utils/request'

import TodoList from '@/components/Todo/TodoList'
interface Props {
  todoStore: TodoStore
  route: { routes: [] }
}

@inject((stores: Props) => ({
  todoStore: stores.todoStore,
}))
@observer
class Home extends Component<Props> {
  public async componentDidMount() {
    const r = await get(`demo`)
    console.log(r)
  }
  public render() {
    const { route, todoStore } = this.props
    return (
      <div className="homePage">
        <TodoList store={todoStore} />
        <div>{renderRoutes(route.routes)}</div>
      </div>
    )
  }
}

export default Home
