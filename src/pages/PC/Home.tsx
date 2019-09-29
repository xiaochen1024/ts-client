import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { renderRoutes } from 'react-router-config'

import TodoStore from '@/stores/TodoStore'

import TodoList from '@/components/B_Todo/TodoList'
import styles from './Home.module.styl'
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
    this.props.todoStore.fetchTodo()
  }
  public render() {
    const { route, todoStore } = this.props
    return (
      <div className={styles.homePage}>
        <TodoList store={todoStore} />
        <div>{renderRoutes(route.routes)}</div>
      </div>
    )
  }
}

export default Home
