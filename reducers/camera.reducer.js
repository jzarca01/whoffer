import {
    CAMERA_LOADED,
    CAMERA_ERROR,
    CAPTURE_PHOTO,
    LOADING
  } from '../components/camera/camera.action-names';

  const initialState = {
    photoInfo: {},
    error: false,
    errorDetails: {},
    text: [],
    loading: false
  };

  const cameraReducer = (state = initialState, action) => {
    switch (action.type) {
      case CAMERA_LOADED: {
        return {
          ...state,
          ...action.payload,
          error: false,
          loading: false
        }
      }
      case CAPTURE_PHOTO: {
        return {
          ...state,
          loading: false,
          photoInfo: action.payload.photoInfo,
          text: action.payload.text
        };
      }
      case CAMERA_ERROR: {
        return {
          ...state,
          error: true,
          loading: false,
          errorDetails: action.payload.errorDetails
        };
      }
      case LOADING: {
        return {
          ...state,
          error: false,
          loading: action.payload.loading
        };
      }
      default: {
        return state;
      }
    }
  };
  
  export default cameraReducer;