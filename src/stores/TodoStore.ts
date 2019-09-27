import { computed, action, observable } from 'mobx'
import TodoTask from './TodoTask'
import todoApi from '@/api/todoApi'

export class TodoStore {
  @observable public todos: TodoTask[] = []

  @action public async fetchTodo() {
    const result: any = await todoApi.fetchTodoReq()
    this.todos = result
  }

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

  @action public addTodo(task: string) {
    this.todos.push(new TodoTask(task))
  }
}

export default TodoStore
