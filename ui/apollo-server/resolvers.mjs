import cmd from 'node-cmd'
import { cwd } from 'process'
import { readdir, lstat } from 'fs/promises'
import path from 'path'
const isPlatformWindows = process.platform.indexOf('win') === 0

const isDir = (file) => {
  file = file.replace(/\\/g, path.sep)
  return lstat(file).then((res) => res.isDirectory())
}

// function isDir (file) {
//   return lstat(file).then((res) => res.isDirectory())
// }

const list = async (base) => {
  const _isDir = isDir
  base = base || cwd()
  if (isPlatformWindows) {
    if (base.match(/^([A-Z]{1}:)$/)) {
      base = path.join(base, '\\')
    }
  }
  const files = await readdir(base, 'utf-8')

  let f = files.map(async (file) => {
    const folderPath = path.join(base, file)
    const isDir = await _isDir(folderPath)
    if (!isDir) {
      return null
    }
    return {
      name: file,
      path: folderPath,
    }
  })
  let _f = f.filter((item) => !!item)
  return {
    path: base,
    children: _f,
  }
}

const resolvers = {
  Query: {
    getPerson: (parent, args, context, info) => {
      console.log(args)
      cmd.run(`w-cli g test2.vue -c config.json`, (err, data) => {
        console.log(err, data)
      })

      return args.age
    },
    generator: (parent, { config }) => {
      console.log(config)
      return true
    },
    getFileList: (parent, { base }) => {
      return list(base)
    },
  },
}

export default resolvers
