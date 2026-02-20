import { git } from './app/src/lib/git/core'

async function run() {
  const result = await git(['rev-list', '--count', 'HEAD', '--not', '--remotes'], __dirname, 'test')
  console.log('Result:', result.stdout.trim())
}
run()
