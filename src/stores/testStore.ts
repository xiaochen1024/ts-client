import { observable, action } from 'mobx'

export interface ITestStore {
  count: string
  add: (event: {}) => void
}

export default class TestStore {
  @observable public count = 0

  @action
  public add = async () => {
    this.count += 1
  }
}
