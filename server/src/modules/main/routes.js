export default class Routes {
  constructor (config) {
    this.config = config || {}
    this.routes = [
      {
        url: '/main',
        methods: {
          get: [config.controller.main]
        }
      }
    ]
  }
}
