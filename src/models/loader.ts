
const model = {
  name: 'loader',
  state: {
    loading: false,
  },
  reducers: {
    loaderStart() {
      return {
        loading: true,
      }
    },
    loaderEnd() {
      return {
        loading: false,
      }
    },
  },
  effects: {},
}

export default model
