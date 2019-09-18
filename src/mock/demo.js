import Mock from 'mockjs'
const baseUrl = process.env.REACT_APP_API_URL
Mock.mock(`${baseUrl}demo`, {
  name: '@cname',
  'age|1-10': 10,
})
