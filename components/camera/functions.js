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
    console.log(labels)
    return labels.data
  }
  catch(err) {
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