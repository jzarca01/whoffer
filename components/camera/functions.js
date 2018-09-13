import axios from 'axios'
import config from '../../config/config.json'

const DATE_REGEX = /(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-9]{4}/g
const TIME_REGEX = /([0-2]{0,1}[0-9]{1}:[0-5][0-9]*)/g
const SUBWAY_STORE_REGEX = /([0-9]{5}-+[0-9]{1})/g

export async function checkForLabels(base64) {
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
    return labels.data
  } catch (err) {
    console.error(err)
  }
}

export function filterLabelsList(response) {
  let resultArr = []
  response.textAnnotations.forEach((label) => {
    resultArr.push(label)
  })
  return resultArr
}

export function extractDateFromText(text) {
  return extractFromText(text, DATE_REGEX)
}

export function extractTimeFromText(text) {
  return extractFromText(text, TIME_REGEX)
}

export function extractStoreFromText(text) {
  return extractFromText(text, SUBWAY_STORE_REGEX)
}

function extractFromText(text, regex) {
  let matches = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    matches.push(match[0]);
  }
  return matches[0]
}
