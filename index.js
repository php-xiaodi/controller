const Joi = require('@hapi/joi')
const dayjs = require('@pg/dayjs')
const log4js = require('@pg/log4js')

class Controller {
  constructor() {
    this.code = 0
    this.message = ''
    this.data = {}
  }

  json(ctx) {
    ctx.body = {
      code: this.code,
      message: this.message,
      data: this.data
    }
  }
}

/**
 * 通用的响应定义
 */
Controller.responses = {
  401: {
    description: 'Unauthorized',
    type: 'object',
    properties: {
      code: {
        type: 'number',
        example: 401,
        description: '状态码'
      },
      message: {
        type: 'string',
        example: 'Unauthorized',
        description: '错误提示'
      }
    }
  },
  500: {
    description: 'Server Error',
    type: 'object',
    properties: {
      code: {
        type: 'number',
        example: 500,
        description: '状态码'
      },
      message: {
        type: 'string',
        example: 'Server Error',
        description: '错误提示'
      }
    }
  }
}

/**
 * 通用请求参数（主要是签名那几个）
 */
Controller.requests = {
  timestamp: {
    type: 'string',
    description: '时间戳（10位整数）',
    required: true
  },
  nonce: {
    type: 'string',
    description: '随机数',
    required: true
  },
  sig: {
    type: 'string',
    description: '签名',
    required: true
  }
}

/**
 * 通用的几个Joi规则
 */
Controller.Jois = {
  timestamp: Joi.string().required(),
  nonce: Joi.string().required(),
  sig: Joi.string().required()
}

module.exports = Controller
