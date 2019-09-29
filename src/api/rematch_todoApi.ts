import axios from './rematch_request'
import withRespValidator from 'decorators/withRespValidator'

class TodoApi {
  @withRespValidator
  public async fetchTodoReq() {
    return (await axios.get(`todo/list`)).data.todoList
  }
}

export default new TodoApi()
