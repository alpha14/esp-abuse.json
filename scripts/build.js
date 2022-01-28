#!/bin/env node

const fs = require('fs')
const path = require('path')
const cpy = require('cpy')

function deleteBuild (dir) {
  if (fs.existsSync(dir)) {
    fs.rm(dir, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error while deleting ${dir}.`)
      }
    })
  }
}

async function copyFiles () {
  await cpy('front/*', 'build', {
    flat: true
  })

  await cpy('esp-abuse.json', 'build', {
    flat: true
  })
}

deleteBuild(path.resolve(__dirname, '..', 'build'))
copyFiles()
