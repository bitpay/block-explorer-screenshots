const fs = require('fs')
const webshotgun = require('webshotgun')
const async = require('async')

const files = fs.readdirSync('./urls')
const sets = files.map((i) => i.split('.')[0])
const sizes = [640, 2000]
const tasks = []

sizes.forEach((size, sizeIndex) => {
  sets.forEach((set, setIndex) => {
    // if (sizeIndex === 0 && setIndex === 0) // (re-run only one capture)
    tasks.push((callback) => {
      webshotgun.shoot({
        dest: 'out/' + size + '/' + set,
        urls: fs.readFileSync('./urls/' + set + '.csv', 'utf8').replace(/^\s*[\r\n]/gm, '').trim().split('\n'),
        // quiet: true,
        // tree: true,
        width: size
      }, () => {
        console.log('Task complete.')
        callback()
      });
    })
  })
})

async.series(tasks, () => {
    console.log('Capture complete.')
})
