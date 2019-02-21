import MainRoutes from './routes'
import ResHandler from '../../common/resHandler'
import Validations from '../../common/validations'

export default class Controller {
  constructor (config) {
    this.config = config || {}
    this.routes = new MainRoutes({ controller: this }).routes
    this.response = new ResHandler()
    this.error = {}
    this.resetDataError()
  }

  resetDataError () {
    // the error parameters are set for fields validation first
    this.error = {
      res: {
        message: 'Bad request.',
        data: {}
      },
      statusCode: 400
    }
  }

  main (req, res) {
    this.resetDataError()
    // rules are set for validation
    const rules = {}
    // validation
    const query = req.body
    const validate = new Validations(query, rules)
    if (validate.hasError()) {
      this.error.res.data = validate.errors
      return this.response.error(res, this.error)
    }

    const response = {
      message: 'success',
      data: ['data']
    }
    return this.response.success(res, response, 'json')
  }
}
