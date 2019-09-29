import { RematchDispatch } from '@rematch/core'

import todoApi from '@/api/rematch_todoApi'

export type TTodoItem = { id: string; description: string; completed: boolean }
export type Istate = {
  todoList: TTodoItem[]
}

const delay = (time: number) =>
  new Promise(resolve => setTimeout(() => resolve(), time))

const model = {
  name: 'todo',
  state: {
    todoList: [],
  },
  reducers: {
    toggleDone(state: Istate, id: string) {
      const { todoList } = state
      const index = todoList.findIndex((v: TTodoItem) => v.id === id)
      const item = todoList[index]
      todoList[index] = { ...item, completed: !item.completed }
      return state
    },
    add(state: Istate, text: string) {
      return {
        ...state,
        todoList: state.todoList.concat([
          {
            id: `${Date.now()}`,
            description: text,
            completed: false,
          },
        ]),
      }
    },
    remove(state: Istate, id: string) {
      const index = state.todoList.findIndex((v: TTodoItem) => v.id === id)
      state.todoList.splice(index, 1)
      return state
    },
    setTodoData(state: Istate, todoList: TTodoItem[]) {
      state.todoList = todoList
      return state
    },
  },
  effects: (dispatch: RematchDispatch) => ({
    async asyncRemove(id: string) {
      await delay(1000)
      dispatch.todo.remove(id)
    },
    async fetchTodos() {
      const r = await todoApi.fetchTodoReq()
      dispatch.todo.setTodoData(r)
    },
  }),
  selectors: (slice: any) => ({
    total() {
      return slice((state: Istate) => state.todoList.length)
    },
    completedTodos() {
      return slice(
        (state: Istate) =>
          state.todoList.filter((item: TTodoItem) => item.completed).length,
      )
    },
  }),
}

export default model
