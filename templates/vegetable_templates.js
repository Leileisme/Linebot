export default () => {
  return {
    type: 'bubble',
    hero: {
      type: 'image',
      url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
      size: 'full',
      aspectRatio: '20:13',
      aspectMode: 'cover'
    },
    body: {
      type: 'box',
      layout: 'vertical',
      backgroundColor: '#212529',
      contents: [
        {
          type: 'text',
          text: 'Brown Cafe',
          weight: 'bold',
          color: '#ffffff',
          size: 'xl'
        },
        {
          type: 'box',
          layout: 'vertical',
          margin: 'lg',
          spacing: 'sm',
          contents: [
            {
              type: 'box',
              layout: 'baseline',
              spacing: 'sm',
              contents: [
                {
                  type: 'text',
                  text: 'Place',
                  color: '#cccccc',
                  size: 'sm',
                  flex: 6
                },
                {
                  type: 'text',
                  text: 'Miraina Tower, 4-1-6 Shinjuku, Tokyo',
                  wrap: true,
                  color: '#ffc107',
                  weight: 'bold',
                  size: 'lg',
                  flex: 3,
                  margin: 'xxl'
                },
                {
                  type: 'text',
                  text: 'Miraina Tower, 4-1-6 Shinjuku, Tokyo',
                  wrap: true,
                  color: '#cccccc',
                  size: 'sm',
                  flex: 3
                }
              ]
            },
            {
              type: 'box',
              layout: 'baseline',
              spacing: 'sm',
              contents: [
                {
                  type: 'text',
                  text: 'Time',
                  color: '#cccccc',
                  size: 'sm',
                  flex: 6
                },
                {
                  type: 'text',
                  text: '10:00 - 23:00',
                  wrap: true,
                  color: '#ffc107',
                  weight: 'bold',
                  size: 'lg',
                  flex: 3,
                  margin: 'xxl'
                },
                {
                  type: 'text',
                  text: '10:00 - 23:00',
                  wrap: true,
                  color: '#cccccc',
                  size: 'sm',
                  flex: 3
                }
              ]
            }
          ]
        }
      ]
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      backgroundColor: '#212529',
      spacing: 'sm',
      flex: 0,
      contents: [
        {
          type: 'button',
          style: 'primary',
          height: 'sm',
          color: '#343a40',
          action: {
            type: 'message',
            label: 'action',
            text: 'hello'
          }
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [],
          margin: 'lg'
        }
      ]
    }
  }
}
