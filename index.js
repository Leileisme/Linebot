// 引入環境套件
import 'dotenv/config'
import linebot from 'linebot'
import vegetable from './reply/vegetable.js'
import market from './reply/market.js'
import closedDay from './reply/closedDay.js'
import { scheduleJob } from 'node-schedule'
import * as vegetables from './data/vegetables_data.js'

// 定期更新
scheduleJob('0 0 * * *', () => {
  vegetables.update()
})

vegetables.update()

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
    // 若我這邊的字很多，放另外一個檔案匯入會更好嗎?
    if (event.message.text === '我可以去哪裡買呢~') {
      market(event)
    } else if (event.message.text === '休市日') {
      closedDay(event)
    } else {
      vegetable(event)
    }
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
