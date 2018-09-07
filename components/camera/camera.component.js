import React, {
    Component,
    PropTypes
  } from 'react'
  import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Alert,
  } from 'react-native'
  import Spinner from 'react-native-spinkit'
  import Camera from 'react-native-camera'

  export default class CameraComponent extends Component {

    constructor(props) {
      super(props)
      this.state = {
        flash: 'off',
        zoom: 0,
        autoFocus: 'on',
        depth: 0,
        type: 'back',
      }
    }

    componentDidMount() {
      this.props.loadCamera()
      console.log(this.props)
    }

    async takePicture() {
          try {
            const data = await this.camera.capture()
            await this.props.capturePhoto(data.data)
            await this.displayResult(this.props.text)
          }
          catch(err) {
            console.error(err)
          }
      }

    displayResult(filteredResult) {
      if (filteredResult.length) {
        Alert.alert(filteredResult[0].description)
      }
    }

    renderCamera() {
      return (<Camera
          ref={ref => {
            this.camera = ref
          }}
          style={{
            flex: 1,
          }}
          type={this.state.type}
          captureTarget={Camera.constants.CaptureTarget.memory}
          flashMode={this.state.flash}
          autoFocus={this.state.autoFocus}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
        >
          <View style={styles.buttons}>
          {!this.props.loading ?
            <TouchableOpacity
              style={[styles.flipButton, { flex: 0.3, alignSelf: 'flex-end' }]}
              onPress={this.takePicture.bind(this)}
            >
              <Image style={styles.camButton} source={require('../../assets/camera.png')} />
            </TouchableOpacity>
            :
            <Spinner
                    style={{alignSelf: 'flex-end' }}
                    isVisible={true}
                    size={70}
                    type={'Bounce'}
                    color={'white'}/>
          }
          </View>
        </Camera>)
    }

    render() {
      return <View style={styles.container}>
        {this.renderCamera()}
        </View>
      }
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#000',
      },
      navigation: {
        flex: 1,
      },
      buttons: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-around',
        bottom: 1
      },
      camButton: {
        width: 60,
        height: 60
      },
      flipButton: {
        flex: 0.3,
        height: 60,
        marginHorizontal: 2,
        marginBottom: 10,
        marginTop: 20,
        borderRadius: 8,
        borderColor: 'white',
        borderWidth: 0,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
      },
      item: {
        margin: 4,
        backgroundColor: 'indianred',
        height: 35,
        width: 80,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
      },
      row: {
        flexDirection: 'row',
      }
})
