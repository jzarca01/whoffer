import React, { Component } from 'react'
import { View } from 'react-native'

import CameraContainer from '../camera/camera.container'

export default class ViewComponent extends Component {

  constructor() {
    super()
    this.state = {
    }
  }

  render () {
    return (
        <CameraContainer />
    )
  }
}
