import * as React from 'react'
import { t } from '../../lib/i18n'
import { DialogContent } from '../dialog'
import { Button } from '../lib/button'

interface IAddAccountDialogProps {
  readonly onConnect: (provider: 'github' | 'gitlab' | 'bitbucket' | 'codeberg') => void
  readonly onDismiss?: () => void
}

const ProviderCard: React.FunctionComponent<{
  name: string
  providerKey: 'github' | 'gitlab' | 'bitbucket' | 'codeberg'
  onConnect: (p: any) => void
  children?: React.ReactNode
}> = ({ name, providerKey, onConnect, children }) => {
  return (
    <div className="provider-card">
      <div className="provider-card-left">
        <div className="provider-icon" aria-hidden>
          {providerIcon(providerKey)}
        </div>
        <div className="provider-info">
          <div className="provider-name">{name}</div>
          <div className="provider-desc">{children}</div>
        </div>
      </div>
      <Button onClick={() => onConnect(providerKey)}>{t('connect')}</Button>
    </div>
  )
}

function providerIcon(provider: string) {
  switch (provider) {
    case 'gitlab':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l2.4 5.6L20 8.2l-4 3.9L17 18l-5-3-5 3 1-5.9L4 8.2l5.6-.6L12 2z" fill="#FC6D26" />
        </svg>
      )
    case 'bitbucket':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 3l-2 13-7 5-7-5L3 3h18z" fill="#205081" />
        </svg>
      )
    case 'codeberg':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#5A8F7B" />
          <path d="M7 12c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="#fff" strokeWidth="1.5" fill="none" />
        </svg>
      )
    default:
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.49 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.115 2.51.337 1.9-1.3 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .27.16.59.67.49A10 10 0 0022 12c0-5.52-4.48-10-10-10z" fill="#24292e" />
        </svg>
      )
  }
}

export class AddAccountDialog extends React.Component<IAddAccountDialogProps, {}> {
  public render() {
    return (
      <DialogContent>
        <h2>{t('addAccountDialogTitle')}</h2>

        <ProviderCard name={t('githubCom')} providerKey="github" onConnect={this.props.onConnect}>
          {t('connectGithubDesc')}
        </ProviderCard>

        <ProviderCard name={t('gitlab')} providerKey="gitlab" onConnect={this.props.onConnect}>
          {t('connectGitlabDesc')}
        </ProviderCard>

        <ProviderCard name={t('bitbucket')} providerKey="bitbucket" onConnect={this.props.onConnect}>
          {t('connectBitbucketDesc')}
        </ProviderCard>

        <ProviderCard name={t('codeberg')} providerKey="codeberg" onConnect={this.props.onConnect}>
          {t('connectCodebergDesc')}
        </ProviderCard>
      </DialogContent>
    )
  }
}
