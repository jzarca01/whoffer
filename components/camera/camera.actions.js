import {
  CAMERA_LOADED,
  CAMERA_ERROR,
  CAPTURE_PHOTO,
  LOADING
} from './camera.action-names';

import {
  checkForLabels,
  filterLabelsList,
  extractDateFromText,
  extractTimeFromText
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
        dispatch({
            type: LOADING,
            payload: {
              loading: true
            }
          })
      const text = await checkForLabels(data)
      if(!text.responses) {
          throw new Error('Nothing')
      }
      const responses = await filterLabelsList(text.responses[0])
      const dateExtracted = extractDateFromText(responses[0].description)
      const timeExtracted = extractTimeFromText(responses[0].description)
      dispatch({
        type: CAPTURE_PHOTO,
        payload: {
          photoInfo: data,
          text: `${dateExtracted} à ${timeExtracted}`
        }
      });
      dispatch({
        type: LOADING,
        payload: {
          loading: false
        }
      })
    } catch (err) {
        dispatch({
            type: CAMERA_ERROR,
            payload: {
              error: true,
              errroDetails: err
            }
          });
      dispatch({
        type: LOADING,
        payload: {
          loading: false
        }
      })
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
