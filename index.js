// 引入環境套件
import 'dotenv/config'
import linebot from 'linebot'
import vegetable from './reply/vegetable.js'
// import fs from 'fs'
// import vegetableTemplates from './templates/vegetable_templates.js'

// 我的機器人
const bot = linebot({
  channelID: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', (event) => {
  if (process.env.DEBUG === 'true') {
    console.log(event)
  }

  if (event.message.type === 'text') {
    if (event.message.text === '蔬菜') {
      vegetable(event)
    }
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
