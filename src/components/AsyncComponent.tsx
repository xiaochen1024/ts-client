import React from 'react'

type componentType = React.ComponentType | null

// tslint:disable-next-line:ban-types
export default function(getComponent: Function): React.ComponentType {
  return class AsyncComponent extends React.Component {
    public static Component: componentType = null
    public state = { Component: AsyncComponent.Component }

    public componentDidMount() {
      if (!this.state.Component) {
        getComponent().then(
          ({ default: Component }: { default: componentType }) => {
            AsyncComponent.Component = Component
            this.setState({ Component })
          }
        )
      }
    }
    public render() {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }
}
