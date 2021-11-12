const { readdir, lstat } = require('fs/promises')
const cmd = require('node-cmd')

cmd.run(`wow-cli g test2.vue -c config.json`, (err, data) => {
  console.log(err, data)
})
// const test = async () => {
//   try {
//     // const files = await readdir('./')
//     // for (const file of files) {
//     //   console.log(file)
//     //  }
//     console.log(process.cwd() )
//     const stat = await lstat('../ui')
//     console.log(stat.isDirectory())
//   } catch (err) {
//     console.error(err)
//   }
// }

// test()
