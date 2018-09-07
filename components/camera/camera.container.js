import CameraComponent from './camera.component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loadCamera, capturePhoto, isErrorCamera, isLoading } from './camera.actions';

function mapStateToProps(state) {
  return state.camera;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadCamera, capturePhoto, isErrorCamera, isLoading }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraComponent)