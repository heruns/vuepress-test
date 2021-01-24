const http = require('http')
const packageJson = require('../package.json')
// 部署接口参数，可根据 config.default.js 文件修改
const config = require('./config')

// body 数据，与 Github Webhooks 的 Payload 格式保持一致，忽略不必要的字段
const postData = JSON.stringify({
  repository: {
    name: packageJson.name
  }
})

const options = Object.assign(
  {
    headers: {
      'Content-Type': 'application/json'
    }
  },
  config
)

const req = http.request(options, res => {
  console.log('状态码: ', res.statusCode)
  res.setEncoding('utf8')
  res.on('data', chunk => {
    console.log('响应主体：')
    console.log(JSON.parse(chunk))
  })
})

req.on('error', e => {
  console.error(`请求失败: ${e.message}`)
})

// 将数据写入请求主体。
req.write(postData)
req.end()
