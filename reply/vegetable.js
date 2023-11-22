import axios from 'axios'
import * as cheerio from 'cheerio'
import vegetableTemplates from '../templates/vegetable_templates.js'

export default async (e) => {
  try {
    const { data } = await axios.get('https://www.twfood.cc/fruit?page=1&per-page=5')
    console.log(data)
    const $ = cheerio.load(data)
    const replies = []
    const template = vegetableTemplates()
    $('#vege_chart').each(function (index) {
      const img = $(this).find('img').attr('src')
      const imgUrl = new URL(img, 'https://www.twfood.cc/')
      const title = $(this).find('img').attr('alt')
      const dayPrice = $(this).find('table').find('tr').eq(5).find('th').eq(0).text()
      const weekPrice = $(this).find('table').find('tr').eq(2).find('th').eq(0).text()
      template.body.contents[1].contents[0].contents[0].text = '預估零售價'
      template.body.contents[1].contents[0].contents[1].text = dayPrice
      template.body.contents[1].contents[0].contents[2].text = '元 /台斤'
      template.body.contents[1].contents[1].contents[0].text = '平均批發價/本周'
      template.body.contents[1].contents[1].contents[1].text = weekPrice
      template.body.contents[1].contents[1].contents[2].text = '元 /台斤'

      replies.push(template)
      template.hero.url = imgUrl
      template.body.contents[0].text = title
      replies.push(template)
    })

    const result = await e.reply({
      type: 'flex',
      altText: '蔬果時價',
      contents: template
    })
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}
