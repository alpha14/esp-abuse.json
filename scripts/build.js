#!/bin/env node

import fs from 'fs'
import path from 'path'
import cpy from 'cpy'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const deleteBuild = async (dir) => {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true }, (err) => {
      if (err) {
        console.error(` ${err}.`)
      }
    })
  }
}

const copyFiles = async () => {
  await cpy('front/*', 'build', {
    flat: true
  })

  await cpy('esp-abuse.json', 'build', {
    flat: true
  })
}

deleteBuild(path.resolve(__dirname, '..', 'build'))
  .then(copyFiles())
