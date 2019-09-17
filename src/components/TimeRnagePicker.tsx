import React, { Component } from 'react'
import { TimePicker } from 'antd'
import moment from 'moment'

const format = 'HH:mm'

type valueType = {
  start: moment.Moment
  end: moment.Moment
}

interface Props {
  disabled: boolean
  // tslint:disable-next-line:ban-types
  onChange: Function
  value: valueType
}
interface State {
  start: moment.Moment
  end: moment.Moment
}

class TimeRnagePicker extends Component<Props, State> {
  public static getDerivedStateFromProps(nextProps: Props) {
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {})
      }
    }
    return null
  }

  constructor(props: Props) {
    super(props)

    const value = props.value || {}
    this.state = {
      start: value.start,
      end: value.end
    }
  }

  public handleStartChange = (start: moment.Moment) => {
    if (!('value' in this.props)) {
      this.setState({ start })
    }
    this.triggerChange({ start })
  }

  public handleEndChange = (end: moment.Moment) => {
    if (!('value' in this.props)) {
      this.setState({ end })
    }
    this.triggerChange({ end })
  }

  public triggerChange = (changedValue: object) => {
    const onChange = this.props.onChange
    if (onChange) {
      onChange({ ...this.state, changedValue })
    }
  }

  public render() {
    const { start, end } = this.state
    const { disabled } = this.props
    return (
      <span>
        <TimePicker
          disabled={disabled}
          onChange={this.handleStartChange}
          value={start}
          format={format}
        />
        <span style={{ marginLeft: '20px' }}>~</span>
        <TimePicker
          disabled={disabled}
          style={{ marginLeft: 20 }}
          onChange={this.handleEndChange}
          value={end}
          format={format}
        />
      </span>
    )
  }
}

export default TimeRnagePicker
