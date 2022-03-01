#!/bin/env node

import fs from 'fs'
import path from 'path'
import inspector from 'schema-inspector'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const validation = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 5 },
    providers: {
      type: 'array',
      minLength: 10,

      items: {
        type: 'object',
        properties: {
          name: { type: 'string', minLength: 3, someKeys: ['sendinblue', 'mailjet'] },
          email: { type: 'string', pattern: 'email', optional: true },
          form: { type: 'string', pattern: 'url', optional: true },
          policy: { type: 'string', pattern: 'url', optional: true }
        }
      }
    }
  }
}

const validateFile = (file) => {
  let jsonData = {}

  try {
    const data = fs.readFileSync(file, 'utf-8')
    jsonData = JSON.parse(data)
  } catch (e) {
    console.log(e)
    return false
  }

  const result = inspector.validate(validation, jsonData)
  if (!result.valid) {
    console.log(result.format())
    return false
  }
  return true
}

const testJsonFile = (filePath) => {
  if (validateFile(filePath) === false) {
    process.exit(1)
  } else {
    console.log('file ' + path.parse(filePath).name + ' is valid')
  }
}

testJsonFile(path.resolve(__dirname, '..', 'esp-abuse.json'))
