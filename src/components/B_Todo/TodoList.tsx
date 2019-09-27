import { observer } from 'mobx-react'
import * as React from 'react'
import TodoView from './TodoView'
import TodoStore from '@/stores/TodoStore'
import styles from './TodoList.module.styl'

export interface ITodoListProps {
  store: TodoStore
}
export interface ITodoListState {
  description: string
}

@observer
export class TodoList extends React.Component<ITodoListProps, ITodoListState> {
  constructor(props: ITodoListProps) {
    super(props)
    this.state = { description: '' }
  }

  public render() {
    const store = this.props.store
    return (
      <div className={styles.todoList}>
        <p>{store.report}</p>
        <form onSubmit={this.onNewTodo}>
          <label>
            New task:
            <input
              type="text"
              value={this.state.description}
              onChange={this.onDescriptionChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <ul>
          {store.todos.map((todo, idx) => (
            <TodoView todo={todo} key={idx} />
          ))}
        </ul>
        <small> (double-click a todo to edit)</small>
      </div>
    )
  }

  private onDescriptionChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ description: event.currentTarget.value })
  }
  private onNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    this.props.store.addTodo(this.state.description)
    this.setState({ description: '' })
    event.preventDefault()
  }
}

export default TodoList
