import * as path from 'path'
import { BrowserCheck } from 'checkly/constructs'
import { emailChannel } from '../email-alert-channel'

const alertChannels = [
  emailChannel,
]

new BrowserCheck('homepage-browser-check', {
  name: 'Home page',
  alertChannels,
  code: {
    entrypoint: path.join(__dirname, 'homepage.spec.ts')
  },
  runParallel: true,
})
