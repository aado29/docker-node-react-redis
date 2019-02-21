// import sanitize from 'mongo-sanitize'
import _ from 'underscore'

export default class Validations {
  constructor (req, rules) {
    this.errors = {}
    this.areValids(req, rules)
  }

  isEmail (value) {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(value)
  }

  isEmpty (value) {
    return (value == null || value.length === 0 || /^\s+$/.test(value))
  }

  isNumber (value) {
    return /^[0-9]+$/.test(value)
  }

  firstOrLastName (value) {
    return /^[A-Za-záéíóúñ]{2,}([\s][A-Za-záéíóúñ]{2,})?$/.test(value)
  }

  isDate (value) {
    let date = new Date(value)
    return (date.toString() !== 'Invalid Date')
  }

  isString (value) {
    return (typeof value === 'string')
  }

  object (fields, rules) {
    return (typeof fields === 'object') ? this.areValids(fields, rules) : false
  }

  isPhone (value) {
    return (/^\(([0-9]{3,3})\)\s([0-9]{3,3})-([0-9]{4,4})$/.test(value))
  }

  isArray (value) {
    return (value instanceof Array)
  }

  selectOrRadio (value, values) {
    return (values.indexOf(value) !== -1)
  }

  checkbox (checkboxT, checkboxF) {
    return !(checkboxT === true && checkboxF === true)
  }

  intervalsOfYears (value) {
    return (/^[0-9]{4}\s-\s[0-9]{4}$/.test(value))
  }

  boolean (value) {
    return (typeof value === 'boolean')
  }

  optionallyRequired (fields) {
    let empty = 0

    for (let field in fields) {
      if (this.isEmpty(fields[field])) {
        empty++
      }
    }
    return (empty === _.size(fields) || empty === 0)
  }

  areValids (req, rules) {
    let errors
    for (let field in rules) {
      errors = []
      if (!this.isEmpty(req[field])) {
        // req[field] = sanitize(req[field])
        req[field] = req[field]
      }

      for (let property in rules[field]) {
        if (rules[field]['required'] === undefined && property !== 'object' && property !== 'checkbox') {
          if (this.isEmpty(req[field])) {
            continue
          }
        }

        if (property === 'email' && this.isEmail(req[field]) === false) {
          let error = {
            property: property,
            message: 'Error of validation: Fail email ' + field + ' of value ' + req[field]
          }
          errors.push(error)
        }

        if (property === 'required' && this.isEmpty(req[field]) === true) {
          let error = {
            property: property,
            message: 'Error of validation: Fail required ' + field + ' of value ' + req[field]
          }
          errors.push(error)
        }

        if (property === 'number' && this.isNumber(req[field]) === false) {
          let error = {
            property: property,
            message: 'Error of validation: Fail number ' + field + ' of value ' + req[field]
          }
          errors.push(error)
        }

        if (property === 'firstOrLastName' && this.firstOrLastName(req[field]) === false) {
          let error = {
            property: property,
            message: 'Error of validation: Fail firstOrLastName ' + field + ' of value ' + req[field]
          }
          errors.push(error)
        }

        if (property === 'date' && this.isDate(req[field]) === false) {
          let error = {
            property: property,
            message: 'Error of validation: Fail date ' + field + ' of value ' + req[field]
          }
          errors.push(error)
        }

        if (property === 'string' && this.isString(req[field]) === false) {
          let error = {
            property: property,
            message: 'Error of validation: Fail string ' + field + ' of value ' + req[field]
          }
          errors.push(error)
        }

        if (property === 'object' && this.object(req[field], rules[field]['fields']) === false) {
          let error = {
            property: property,
            message: 'Error of validation: Fail object ' + field + ' of value ' + req[field]
          }
          errors.push(error)
        }

        if (property === 'radio' && this.selectOrRadio(req[field], rules[field]['values']) === false) {
          let error = {
            property: property,
            message: 'Error of validation: Fail radio ' + field + ' of value ' + req[field]
          }
          errors.push(error)
        }

        if (property === 'select' && this.selectOrRadio(req[field], rules[field]['values']) === false) {
          let error = {
            property: property,
            message: 'Error of validation: Fail select ' + field + ' of value ' + req[field]
          }
          errors.push(error)
        }

        if (property === 'checkbox' && this.checkbox(req[field + 'T'], req[field + 'F']) === false) {
          let error = {
            property: property,
            message: 'Error of validation: Fail checkbox ' + field + ' of value ' + req[field]
          }
          errors.push(error)
        }

        if (property === 'intervalsOfYears' && this.intervalsOfYears(req[field]) === false) {
          let error = {
            property: property,
            message: 'Error of validation: Fail intervalsOfYears ' + field + ' of value ' + req[field]
          }
          errors.push(error)
        }

        if (property === 'boolean' && this.boolean(req[field]) === false) {
          let error = {
            property: property,
            message: 'Error of validation: Fail boolean ' + field + ' of value ' + req[field]
          }
          errors.push(error)
        }

        if (property === 'optionallyRequired' && this.optionallyRequired(req[field]) === false) {
          let error = {
            property: property,
            message: 'Error of validation: Fail optionallyRequired ' + field + ' of value ' + req[field]
          }
          errors.push(error)
        }

        if (property === 'phone' && this.isPhone(req[field]) === false) {
          let error = {
            property: property,
            message: 'Error of validation: Fail isPhone ' + field + ' of value ' + req[field]
          }
          errors.push(error)
        }

        if (property === 'array' && this.isArray(req[field]) === false) {
          let error = {
            property: property,
            message: 'Error of validation: Fail Array Required ' + field + ' of value ' + req[field]
          }
          errors.push(error)
        }
      }

      if (errors.length > 0) {
        this.errors[field] = errors
      }
    }
  }

  hasError () {
    if (Object.keys(this.errors).length === 0 && this.errors.constructor === Object) {
      return false
    }
    return true
  }
}
