import Mock from './config'

const baseUrl = process.env.REACT_APP_API_URL
Mock.mock(`${baseUrl}todo/list`, {
  'todoList|3': [
    {
      description: '@title(3, 5)',
      'completed|1-2': true,
    },
  ],
})
