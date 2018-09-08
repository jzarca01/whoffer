import {
  CAMERA_LOADED,
  CAMERA_ERROR,
  CAPTURE_PHOTO,
  LOADING
} from './camera.action-names';

import {
  checkForLabels,
  filterLabelsList,
  extractDateFromText
} from './functions'

export function loadCamera() {
  return function (dispatch) {
    dispatch({
      type: CAMERA_LOADED
    });
  }
}

export function capturePhoto(data) {
  return async function (dispatch) {
    try {
      await isLoading(true)
      const text = await checkForLabels(data)
      dispatch({
        type: CAPTURE_PHOTO,
        payload: {
          photoInfo: data,
          text: extractDateFromText(filterLabelsList(text.responses[0])),
        }
      });
      await isLoading(false)
    } catch (err) {
      await isErrorCamera(err)
      await isLoading(false)
    }
  }
}

export function isErrorCamera(err) {
  return function (dispatch) {
    dispatch({
      type: CAMERA_ERROR,
      payload: {
        error: true,
        errroDetails: err
      }
    });
  }
}

export function isLoading(bool) {
  return function (dispatch) {
    dispatch({
      type: LOADING,
      payload: {
        loading: bool
      }
    })
  }
}
