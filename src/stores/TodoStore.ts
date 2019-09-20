import { computed, observable } from 'mobx'
import TodoTask from './TodoTask'

export class TodoStore {
  @observable public todos: TodoTask[] = []
  @observable public pendingRequests: number = 0

  @computed get completedTodosCount(): number {
    return this.todos.filter(todo => todo.completed).length
  }

  @computed get report(): string {
    if (this.todos.length === 0) {
      return '<none>'
    }

    return (
      `Next todo: "${this.todos[0].description}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`
    )
  }

  public addTodo(task: string) {
    this.todos.push(new TodoTask(task))
  }
}

export default TodoStore
