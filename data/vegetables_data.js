import axios from 'axios'
import * as cheerio from 'cheerio'
import vegetableTemplates from '../templates/vegetable_templates.js'

// 這個「具名匯出」是為了給  reply > vegetable 資料用的
export const vegetablesData = []

// 這個「具名匯出」是為了給 index 定時更新
export const update = async () => {
  console.log('更新資料')
  // 每次清空陣列 (從第?個，刪除長度(數量))
  vegetablesData.splice(0, vegetablesData.length)
  try {
    // 預警蔬果的資料
    // 查詢日期，會有預設查詢換日的問題

    // 【把蔬菜改成 axios 請求 會加速資料提取嗎?】
    // const pageVegetable = await browser.newPage()
    // await pageVegetable.goto('https://www.tapmc.com.tw/Pages/Trans/Signal')
    // await pageVegetable.evaluate(() => {
    //   __doPostBack('ctl00$ContentPlaceHolder1$btnQuery', '')
    // })
    // const dataVegetable = await pageVegetable.content()
    // const $V = cheerio.load(dataVegetable)
    // const trVegetable = $V('tbody').find('tr').length - 1

    for (let i = 1; i <= 31; i++) {
      // console.log('更新水果: ' + i)
      const { data } = await axios.get(`https://www.twfood.cc/fruit?page=${i}&per-page=5`)
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
        // 先把放入模板了
        template.body.contents[1].contents[2].contents[0].text = '行情預警'
        template.body.contents[1].contents[3].contents[0].text = '近5年同月批發價'

        for (let j = 1; j <= trFruit; j++) {
          if (title.includes($F('tbody').find('tr').eq(j).find('td').eq(2).text())) {
            console.log(j, '+', title)
            console.log(j, '+', $F('tbody').find('tr').eq(j).find('td').eq(2).text())

            const priceF = $F('tbody').find('tr').eq(j).find('td').eq(5).text()
            template.body.contents[1].contents[2].contents[1].text = '警戒'
            template.body.contents[1].contents[2].contents[1].color = '#ff0000'
            template.body.contents[1].contents[3].contents[1].text = priceF * 0.6
          } else {
            template.body.contents[1].contents[2].contents[1].text = '無警戒'
            template.body.contents[1].contents[3].contents[1].text = '---'
          }
        }

        // 用字待更新
        template.footer.contents[0].action.label = '我現在就想要！'
        template.footer.contents[0].action.text = '我可以去哪裡買呢~'
        vegetablesData.push(template)
      })
    }

    for (let i = 1; i <= 57; i++) {
      // console.log('更新蔬菜: ' + i)
      const { data } = await axios.get(`https://www.twfood.cc/vege?page=${i}&per-page=5`)
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
        // 用字待更新
        template.footer.contents[0].action.label = '我現在就想要！'
        template.footer.contents[0].action.text = '我可以去哪裡買呢~'
        vegetablesData.push(template)
      })

      // console.log('預警蔬菜-品種', $F('tbody').find('tr').eq(1).find('td').eq(2).text())
      // console.log('前五年同月批發價格(公斤)', $F('tbody').find('tr').eq(1).find('td').eq(6).text())
      // console.log('預警水果-品種', $V('tbody').find('tr').eq(1).find('td').eq(2).text())
      // console.log('前五年同月批發價格(公斤)', $V('tbody').find('tr').eq(1).find('td').eq(6).text())
      console.log('解析完畢' + i)
    }
    console.log('更新完成')
  } catch (error) {
    console.log(error)
  }
}
