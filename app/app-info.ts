import { getSHA } from './git-info'
import { getUpdatesURL, getChannel } from '../script/dist-info'
import { version, productName } from './package.json'

const devClientId = '3a723b10ac5575cc5bb9'
const devClientSecret = '22c34d87789a365981ed921352a7b9a8c3f69d54'

const channel = getChannel()

const s = JSON.stringify

export function getReplacements() {
  const isDevBuild = channel === 'development'

  return {
    __OAUTH_CLIENT_ID__: s(process.env.DESKTOP_OAUTH_CLIENT_ID || devClientId),
    __OAUTH_SECRET__: s(
      process.env.DESKTOP_OAUTH_CLIENT_SECRET || devClientSecret
    ),
    // Provider-specific OAuth placeholders - set via env vars when available
    __OAUTH_CLIENT_ID_GITLAB__: s(process.env.DESKTOP_OAUTH_CLIENT_ID_GITLAB || ''),
    __OAUTH_SECRET_GITLAB__: s(process.env.DESKTOP_OAUTH_CLIENT_SECRET_GITLAB || ''),
    __OAUTH_CLIENT_ID_BITBUCKET__: s(process.env.DESKTOP_OAUTH_CLIENT_ID_BITBUCKET || ''),
    __OAUTH_SECRET_BITBUCKET__: s(process.env.DESKTOP_OAUTH_CLIENT_SECRET_BITBUCKET || ''),
    __OAUTH_CLIENT_ID_CODEBERG__: s(process.env.DESKTOP_OAUTH_CLIENT_ID_CODEBERG || ''),
    __OAUTH_SECRET_CODEBERG__: s(process.env.DESKTOP_OAUTH_CLIENT_SECRET_CODEBERG || ''),
    __DARWIN__: process.platform === 'darwin',
    __WIN32__: process.platform === 'win32',
    __LINUX__: process.platform === 'linux',
    __APP_NAME__: s(productName),
    __APP_VERSION__: s(version),
    __DEV__: isDevBuild,
    __DEV_SECRETS__: isDevBuild || !process.env.DESKTOP_OAUTH_CLIENT_SECRET,
    __RELEASE_CHANNEL__: s(channel),
    __UPDATES_URL__: s(getUpdatesURL()),
    __SHA__: s(getSHA()),
    'process.platform': s(process.platform),
    'process.env.NODE_ENV': s(process.env.NODE_ENV || 'development'),
    'process.env.TEST_ENV': s(process.env.TEST_ENV),
  }
}
