export default () => {
  return {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'image',
          url: 'https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip1.jpg',
          size: 'full',
          aspectMode: 'cover',
          aspectRatio: '2:3',
          gravity: 'top'
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: 'SALE',
              color: '#ffffff',
              align: 'center',
              size: 'xs',
              offsetTop: '3px'
            }
          ],
          position: 'absolute',
          cornerRadius: '20px',
          offsetTop: '18px',
          backgroundColor: '#ff334b',
          offsetStart: '18px',
          height: '25px',
          width: '53px'
        }
      ],
      paddingAll: '0px'
    }
  }
}
