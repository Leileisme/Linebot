import axios from 'axios'

const main = async () => {
  const { data } = await axios.post('https://www.tapmc.com.tw/Pages/Trans/Signal', {
    ctl00$ContentPlaceHolder1$txt: '112/11/29',
    ContentPlaceHolder1: 'F'
  })
  console.log(data)
}

main()
