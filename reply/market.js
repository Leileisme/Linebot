import marketTemplates from '../templates/market_templates.js'

export const markets = []

export default async (e) => {
  try {
    const template = marketTemplates()
    template.quickReply.items[0].action.uri = 'https://www.google.com/maps/search/市場/'
    template.quickReply.items[0].action.label = '傳統市場'
    template.quickReply.items[1].action.uri = 'https://www.google.com/maps/search/家樂福/'
    template.quickReply.items[1].action.label = '家樂福'
    template.quickReply.items[2].action.uri = 'https://www.google.com/maps/search/全聯/'
    template.quickReply.items[2].action.label = '全聯'
    template.quickReply.items[3].action.uri = 'https://www.google.com/maps/search/愛買/'
    template.quickReply.items[3].action.label = '愛買'
    template.quickReply.items[4].action.uri = 'https://www.google.com/maps/search/大潤發/'
    template.quickReply.items[4].action.label = '大潤發'
    template.quickReply.items[5].action.uri = 'https://www.google.com/maps/search/costco/'
    template.quickReply.items[5].action.label = 'costco'

    markets.push(template)

    const result = await e.reply(markets)
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}
