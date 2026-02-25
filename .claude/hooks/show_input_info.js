#!/usr/bin/env node

const { exec } = require('child_process')

// 读取标准输入的JSON数据
let input = ''
process.stdin.setEncoding('utf8')
process.stdin.on('data', chunk => {
  input += chunk
})

process.stdin.on('end', () => {
  try {
    // 解析JSON数据
    const jsonData = JSON.parse(input)

    // 提取tool_input.file_path字段
    const filePath = jsonData?.tool_input?.file_path

    if (filePath) {
      console.log('File Path:', filePath)

      // 简单的文件格式化处理
      const fileName = filePath.split('/').pop()
      const fileExtension = fileName.split('.').pop()

      console.log('File Name:', fileName)
      console.log('File Extension:', fileExtension)

      // 根据文件扩展名调用相应的格式化脚本
      let formatCommand = ''
      switch (fileExtension) {
        case 'js':
          formatCommand = 'npm run format:js'
          console.log('Format: JavaScript file - using format:js script')
          break
        case 'html':
          formatCommand = 'npm run format:html'
          console.log('Format: HTML file - using format:html script')
          break
        case 'json':
          formatCommand = 'npm run format'
          console.log('Format: JSON file - using format script')
          break
        default:
          formatCommand = 'npm run format'
          console.log('Format: Unknown file type - using default format script')
      }

      // 执行格式化命令
      if (formatCommand) {
        console.log('Executing format command:', formatCommand)

        exec(formatCommand, (error, stdout, stderr) => {
          if (error) {
            console.error('Format error:', error.message)
            return
          }
          if (stderr) {
            console.error('Format stderr:', stderr)
            return
          }
          console.log('Format output:', stdout)
        })
      }

      // 检查文件路径是否包含特定目录
      if (filePath.includes('.claude')) {
        console.log('Note: This is a Claude configuration file')
      }
    } else {
      console.log('Error: tool_input.file_path not found in JSON data')
      console.log('Available keys:', Object.keys(jsonData || {}))
    }
  } catch (error) {
    console.error('Error:', error.message)
    console.log('Received data:', input)
  }
})
