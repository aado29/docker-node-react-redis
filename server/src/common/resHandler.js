export default class ResponsesHandler {
  constructor (config) {
    this.config = config || {}
  }

  errorCollection (res, error, collections, dataError) {
    if (error) {
      return res.status(500)
        .send({
          message: 'Internal Server Error',
          data: error
        })
    }

    if (!collections || collections.length < 1) {
      return res.status(dataError.statusCode)
        .send(dataError.res)
    }

    return false
  }

  error (res, dataError) {
    return res.status(dataError.statusCode)
      .send(dataError.res)
  }

  success (res, data, type) {
    switch (type) {
      case 'json':
        return res.status(200)
          .set('Content-Type', 'application/json')
          .send(data)
      default:
        return res.status(200)
          .set('Content-Type', 'application/json')
          .send(data)
    }
  }
}
