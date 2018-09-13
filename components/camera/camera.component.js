import React, {
    Component,
    PropTypes
  } from 'react'
  import {
    StyleSheet,
    Image,
    View,
    Text,
    TouchableOpacity,
    Alert,
  } from 'react-native'
  import Spinner from 'react-native-spinkit'
  import Camera from 'react-native-camera'

  import axios from 'axios'
  import config from '../../config/config.json'

  export default class CameraComponent extends Component {

    constructor(props) {
      super(props)
    }

    componentDidMount() {
      this.props.loadCamera()
    }

    async takePicture() {
          try {
            const data = await this.camera.capture()
            await this.props.capturePhoto(data.data)
            await this.displayResult(this.props.ticketInfos)
          }
          catch(err) {
            console.error(err)
          }
      }

    displayResult(filteredResult) {
      if (filteredResult) {
        axios({
          method: 'POST',
          url: config.backendUrl,
          headers: {
            "Content-Type":"application/json"
          },
          data: {
            email: 'zz@zz.com',
            storeNumber: filteredResult.store,
            date: filteredResult.date,
            time: filteredResult.time
          }
        })
        .then(response =>
          Alert.alert(response.data)
        )
        .catch(err =>
          Alert.alert(JSON.stringify(err))
        )
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
          captureTarget={Camera.constants.CaptureTarget.memory}
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

    renderError() {
      return (
        <View>
            <Text>${this.props.errorDetails}</Text>
          </View>
      )
    }

    render() {
      return <View style={styles.container}>
        {this.renderCamera()}
        {this.props.error ? this.renderError() : null}
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
