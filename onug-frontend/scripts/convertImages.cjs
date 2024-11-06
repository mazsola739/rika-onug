const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const inputDir = 'public/assets/tokens'
const outputDir = 'public/assetsWebp/tokens'

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err)
    return
  }

  files.forEach(file => {
    const inputFilePath = path.join(inputDir, file)
    const outputFilePath = path.join(outputDir, `${path.parse(file).name}.webp`)

    sharp(inputFilePath)
      .webp({ lossless: true })
      .toFile(outputFilePath, (err, info) => {
        if (err) {
          console.error(`Error processing file ${file}:`, err)
        } else {
          console.log(`Converted ${file} to WebP:`, info)
        }
      })
  })
})
