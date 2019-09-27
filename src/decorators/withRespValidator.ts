import { Validator } from 'jsonschema'

import schema from '@/typings/response.json'

const v = new Validator()
v.addSchema(schema, '/api')

const validateResponseData = (data: any, type: string) => {
  const result = v.validate(data, {
    $ref: `api#/definitions/${type}`
  })
  if (!result.valid) {
    console.log('data is ', data)
    console.log('errors', result.errors.map((item) => item.toString()))
  }
  return data
}

export default function withRespValidator(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const oldFunction = target[propertyKey] // 获取方法引用
  const newFunction = async (...args: any[]) => {
    const response = await oldFunction.call(target, ...args)
    validateResponseData(response, `ApiRes.todos`)
    return response
  }
  descriptor.value = newFunction // 替换原声明
}
