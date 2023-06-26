export const getFileNameFromUrl = (url) => {
  const decodedUrl = decodeURIComponent(url)
  const fileNameRegex = /\/\d+-([^/]+)(?=\?)/
  const matches = decodedUrl.match(fileNameRegex)
  const fileName = matches[1]
  return fileName
}
