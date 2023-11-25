import axios from 'axios'
import * as cheerio from 'cheerio'
import vegetableTemplates from '../templates/vegetable_templates.js'
// import puppeteer from 'puppeteer'

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
      // console.log('更新水果: ' + i)
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
      // console.log('更新蔬菜: ' + i)
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
        template.footer.contents[0].action.text = '我可以去哪裡買呢~'
        vegetablesData.push(template)
      })
    }
    console.log('更新完成')

    // 另一個網站的資料
    // 這邊會跑不出來，因為跑太久了嗎
    // const browser = await puppeteer.launch({ headless: 'new' })
    // const pageFruit = await browser.newPage()
    // const pageVegetable = await browser.newPage()
    // console.log('browser')

    // await pageFruit.goto('https://www.tapmc.com.tw/Pages/Trans/Price1')
    // await pageVegetable.goto('https://www.tapmc.com.tw/Pages/Trans/Price1')
    // console.log('goto')

    // await pageFruit.select('#DDL_FV_Code', 'F')
    // await pageFruit.evaluate(() => {
    //   __doPostBack('ctl00$ContentPlaceHolder1$btnQuery', '')
    // })
    // await pageVegetable.evaluate(() => {
    //   __doPostBack('ctl00$ContentPlaceHolder1$btnQuery', '')
    // })
    // console.log('evaluate')

    // const delay = (ms) => {
    //   return new Promise((resolve) => setTimeout(resolve, ms))
    // }
    // await delay(5000)
    // console.log('delay')

    // const dataFruit = await pageFruit.content()
    // const dataVegetable = await pageVegetable.content()
    // console.log('content')
    // const $F = cheerio.load(dataFruit)
    // const $V = cheerio.load(dataVegetable)

    // console.log('預警水果', $F('tbody').find('tr').eq(0).find('td').eq(1).text())
    // console.log('預警蔬菜', $V('tbody').find('tr').eq(0).find('td').eq(1).text())
    // await browser.close()
    // console.log('解析完網站')
  } catch (error) {
    console.log(error)
  }
}
