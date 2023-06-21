// actions.js

import axios from 'axios'

export const downloadFile = (url) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(url, { responseType: 'blob' })
      const blob = new Blob([response.data])
      const downloadUrl = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = getFileNameFromUrl(url)
      a.click()

      URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.log('Error downloading file:', error)
    }
  }
}
