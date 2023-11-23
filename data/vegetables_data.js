import axios from 'axios'
import * as cheerio from 'cheerio'
import vegetableTemplates from '../templates/vegetable_templates.js'

// 這個檔案是把網路的HTML資料存下來，以便機器人搜尋資料回覆
// 另外在 index 檔案有使用 scheduleJob ，設定時更新
// 原本都是 line訊息 進來時，機器人再去網站上抓取資料，但怕資料太大反應太慢

// 這個「具名匯出」是為了給  reply > vegetable 資料用的
export const vegetablesData = []

// 這個「具名匯出」是為了給 index 定時更新
export const update = async () => {
  console.log('更新資料')
  // 每次清空陣列 (從第?個，刪除長度(數量))
  vegetablesData.splice(0, vegetablesData.length)
  try {
    for (let i = 1; i <= 31; i++) {
      console.log('更新水果: ' + i)
      const { data } = await axios.get(`https://www.twfood.cc/fruit?page=${i}&per-page=5`)
      // console.log(data)
      const $ = cheerio.load(data)
      $('#vege_chart').each(function (index) {
        const template = vegetableTemplates()
        const img = $(this).find('img').attr('src')
        const imgUrl = new URL(img, 'https://www.twfood.cc/')
        const title = $(this).find('img').attr('alt')
        const dayPrice = $(this).find('table').find('tr').eq(5).find('th').eq(0).text()
        const weekPrice = $(this).find('table').find('tr').eq(2).find('th').eq(0).text()
        template.body.contents[1].contents[0].contents[0].text = '預估零售價'
        template.body.contents[1].contents[0].contents[1].text = dayPrice
        template.body.contents[1].contents[0].contents[2].text = '元 /台斤'
        template.body.contents[1].contents[1].contents[0].text = '平均批發價(本周)'
        template.body.contents[1].contents[1].contents[1].text = weekPrice
        template.body.contents[1].contents[1].contents[2].text = '元 /台斤'
        template.hero.url = imgUrl
        template.body.contents[0].text = title
        vegetablesData.push(template)
      })
    }

    for (let i = 1; i <= 57; i++) {
      console.log('更新蔬菜: ' + i)
      const { data } = await axios.get(`https://www.twfood.cc/vege?page=${i}&per-page=5`)
      // console.log(data)
      const $ = cheerio.load(data)
      $('#vege_chart').each(function (index) {
        const template = vegetableTemplates()
        const img = $(this).find('img').attr('src')
        const imgUrl = new URL(img, 'https://www.twfood.cc/')
        const title = $(this).find('img').attr('alt')
        const dayPrice = $(this).find('table').find('tr').eq(5).find('th').eq(0).text()
        const weekPrice = $(this).find('table').find('tr').eq(2).find('th').eq(0).text()
        template.body.contents[1].contents[0].contents[0].text = '預估零售價'
        template.body.contents[1].contents[0].contents[1].text = dayPrice
        template.body.contents[1].contents[0].contents[2].text = '元 /台斤'
        template.body.contents[1].contents[1].contents[0].text = '平均批發價(本周)'
        template.body.contents[1].contents[1].contents[1].text = weekPrice
        template.body.contents[1].contents[1].contents[2].text = '元 /台斤'
        template.hero.url = imgUrl
        template.body.contents[0].text = title
        // 以下待更新
        template.footer.contents[0].action.label = '我現在就想要！'
        template.footer.contents[0].action.text = '傳統市場vs量販店'
        vegetablesData.push(template)
      })
    }
    console.log('更新完成')
  } catch (error) {
    console.log(error)
  }
}
