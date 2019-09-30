import React, { Component } from 'react'
import { connect } from 'react-redux'

import { IRootState, Dispatch, select } from '@/store'
import { TTodoItem } from '@/models/todo'
import styles from './Rematch_Home.module.styl'
import { Button } from '@teambition/clarity-design'

interface IAddprops {
  addTodo: (t: string) => void
}

class AddTodoForm extends React.Component<IAddprops> {
  public state = { text: '' }

  public handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value
    this.setState({ text })
  }

  public handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    this.props.addTodo(this.state.text)
    this.setState({ text: '' })
  }

  public render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <input value={this.state.text} onChange={this.handleTextChange} />
        <button type="submit">Add todo</button>
      </form>
    )
  }
}

const mapAddTodoDispatch = (dispatch: Dispatch) => ({
  addTodo: (description: string) => dispatch.todo.add(description),
})

const ConnectedAddTodoForm = connect(
  null,
  mapAddTodoDispatch,
)(AddTodoForm)

type IProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>

class App extends Component<IProps> {
  public componentDidMount() {
    this.props.fetchTodos()
  }
  public render() {
    const {
      completedTodos,
      total,
      todoList,
      toggleDone,
      remove,
      asyncRemove,
    } = this.props
    return (
      <div className={styles.todoPage}>
        <div className={styles.container}>
          <div className={styles.headerCon}>
            {completedTodos} of
            {total} todos are done!
          </div>
          <ul>
            {todoList.map((todoI: TTodoItem) => (
              <li key={todoI.id}>
                <span
                  style={{
                    cursor: 'pointer',
                    textDecoration: todoI.completed ? 'line-through' : 'none',
                  }}
                  onClick={() => toggleDone(todoI.id)}
                >
                  {todoI.description}
                </span>{' '}
                <Button
                  size="smaller"
                  onClick={() => {
                    remove(todoI.id)
                  }}
                >
                  delete
                </Button>{' '}
                <Button size="smaller" onClick={() => asyncRemove(todoI.id)}>
                  async delete (1 second delay)
                </Button>
              </li>
            ))}
          </ul>
          <ConnectedAddTodoForm />
        </div>
      </div>
    )
  }
}

const mapState = (state: IRootState) => {
  return {
    todoList: state.todo.todoList,
    total: select.todo.total(state),
    completedTodos: select.todo.completedTodos(state),
  }
}

const mapDispatch = (dispatch: Dispatch) => ({
  toggleDone: (id: string) => dispatch.todo.toggleDone(id),
  remove: (id: string) => dispatch.todo.remove(id),
  asyncRemove: (id: string) => dispatch.todo.asyncRemove(id),
  fetchTodos: () => dispatch.todo.fetchTodos(),
})

export default connect(
  mapState,
  mapDispatch,
)(App)
