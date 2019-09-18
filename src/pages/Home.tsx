import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { renderRoutes } from 'react-router-config'
import { Button } from '@teambition/clarity-design'

import { ITestStore } from '../stores/testStore'
import styles from './Home.module.styl'

import { get } from 'src/utils/request'
// import axios from 'axios'

interface Props {
  testStore: ITestStore
  route: { routes: [] }
}

@inject((stores: Props) => ({
  testStore: stores.testStore,
}))
@observer
class Home extends Component<Props> {
  public async componentDidMount() {
    const r = await get(`demo`)
    console.log(r)
  }
  public render() {
    const { testStore, route } = this.props
    return (
      <div className="homePage">
        <div>{testStore.count}</div>
        {/* <Card
          className="card-demo"
          headerTitle="滕王阁序"
          headerMenu={<div>11</div>}
          footer="显示全部"
          // onClickFooter={'12'}
        >
          {121}
        </Card> */}
        <Button onClick={testStore.add}>add</Button>
        <div className={styles.aa}>{process.env.NODE_ENV}</div>
        <div>{renderRoutes(route.routes)}</div>
      </div>
    )
  }
}

export default Home
