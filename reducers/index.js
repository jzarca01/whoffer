import { combineReducers } from 'redux';
import cameraReducer from './camera.reducer';

// Root Reducer
const rootReducer = combineReducers({
  camera: cameraReducer
});

export default rootReducer;