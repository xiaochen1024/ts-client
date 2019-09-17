import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { renderRoutes } from 'react-router-config'
import { Button, Card } from '@teambition/clarity-design'

import { ITestStore } from '../stores/testStore'

interface Props {
  testStore: ITestStore
  route: { routes: [] }
}

@inject((stores: Props) => ({
  testStore: stores.testStore
}))
@observer
class Home extends Component<Props> {
  public render() {
    const { testStore, route } = this.props
    return (
      <div className="homePage">
        <div>{testStore.count}</div>
        <Card
          className="card-demo"
          headerTitle="滕王阁序"
          headerMenu={<div>11</div>}
          footer="显示全部"
          // onClickFooter={'12'}
        >
          {121}
        </Card>
        <Button onClick={testStore.add}>add</Button>
        <div>{renderRoutes(route.routes)}</div>
      </div>
    )
  }
}

export default Home
