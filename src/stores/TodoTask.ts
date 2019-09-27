import { observable } from 'mobx'

export class TodoTask {
  @observable public description: string
  @observable public completed: boolean

  constructor(description: string) {
    this.description = description
    this.completed = false
  }
}

export default TodoTask
