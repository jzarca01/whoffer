import axios from 'axios'
import config from '../../config/config.json'

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
  const dateRegex = /(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-9]{4}/g

  let matches = [];
  let match;
  while ((match = dateRegex.exec(text)) !== null) {
    matches.push(match[0]);
  }
  return matches[0]
}
