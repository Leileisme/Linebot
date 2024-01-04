// import axios from 'axios'
// import cheerio from 'cheerio'
import closedDayTemplates from '../templates/closedDay_templates.js'

export const closedDayData = []

export const closedDayUpload = async (e) => {
  try {
    const now = new Date()
    const nowYear = now.getFullYear()
    const nowMonth = now.getMonth() + 1
    // console.log(nowYear, nowMonth)

    for (let i = nowMonth; i <= 24; i++) {
      const template = closedDayTemplates()
      if (i <= 12) {
        if (i >= 10) {
          template.body.contents[0].url = `https://raw.githubusercontent.com/Leileisme/Linebot/main/images/date/date_${nowYear}_${i}.jpg`
          closedDayData.push(template)
        } else {
          template.body.contents[0].url = `https://raw.githubusercontent.com/Leileisme/Linebot/main/images/date/date_${nowYear}_0${i}.jpg`
          closedDayData.push(template)
        }
        console.log(template.body.contents[0].url)
      } else if (i > 12) {
        const j = i - 12
        if (j >= 10) {
          template.body.contents[0].url = `https://raw.githubusercontent.com/Leileisme/Linebot/main/images/date/date_${
            nowYear + 1
          }_${j}.jpg`
          closedDayData.push(template)
        } else if (j < 10) {
          template.body.contents[0].url = `https://raw.githubusercontent.com/Leileisme/Linebot/main/images/date/date_${
            nowYear + 1
          }_0${j}.jpg`
          closedDayData.push(template)
        }
        // console.log(template.body.contents[0].url)
      }
    }

    // console.log(closedDayData[7].body.contents[0].url)
  } catch (error) {
    console.log(error)
  }
}

closedDayUpload()
