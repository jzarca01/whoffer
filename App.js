import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import ImageResizer from 'react-native-image-resizer';
import Spinner from 'react-native-spinkit';
import Camera from 'react-native-camera';
import config from './config/config.json'


export default class App extends Component {
  state = {
    loading: false,
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    ratios: [],
    photoId: 1,
    showGallery: false,
    photos: [],
    faces: [],
  };

  async takePicture() {
    if (!this.state.loading) {
        this.setState({
            loading: true
        });

        try {
          const data = await this.camera.capture()
          let result = await this.checkForLabels(data.data);

          let filteredResult = this.filterLabelsList(result.responses[0], 0.3);
          this.displayResult(filteredResult);

          this.setState({
              loading: false
          });
        }
        catch(err) {
          console.error(err)
        }
    } else {
        console.log('NO GO' + this.state.loading)
    }
}

  displayResult(filteredResult) {
    if (filteredResult.length) {
      Alert.alert(filteredResult[0].description);
    }
  }

  filterLabelsList(response, minConfidence = 0) {
    let resultArr = [];
    response.textAnnotations.forEach((label) => {
        resultArr.push(label);
    });
    return resultArr;
  }

  async checkForLabels(base64) {
    try {
      const labels = await axios({
        method: 'POST',
        url: config.googleCloud.api,
        params: {
          key: config.googleCloud.apiKey
        },
        data: {
          requests: [{
            image: {
              content: base64
            },
            features: [{
              type: "TEXT_DETECTION"
            }]
          }]
        }
      })
      console.log(labels)
      return labels.data
    }
    catch(err) {
        console.error(err)
    };
  }

  renderCamera() {
    return (<Camera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
        }}
        type={this.state.type}
        captureTarget={Camera.constants.CaptureTarget.memory}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        onTextRecognized={this.onTextDetected}
        focusDepth={this.state.depth}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
      >
        <View style={styles.buttons}>
        {!this.state.loading ?
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.3, alignSelf: 'flex-end' }]}
            onPress={this.takePicture.bind(this)}
          >
            <Image style={styles.camButton} source={require('./assets/camera.png')} />
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
      </View>;
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
    },
  });