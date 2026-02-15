import * as React from 'react'
import { t } from '../../lib/i18n'
import {
    Account,
    isDotComAccount,
    isEnterpriseAccount,
} from '../../models/account'
import { IAvatarUser } from '../../models/avatar'
import { lookupPreferredEmail } from '../../lib/email'
import { Button } from '../lib/button'
import { Row } from '../lib/row'
import { DialogContent, DialogPreferredFocusClassName } from '../dialog'
import { Avatar } from '../lib/avatar'
import { CallToAction } from '../lib/call-to-action'
import { getHTMLURL } from '../../lib/api'

type ProviderKey = 'github' | 'gitlab' | 'bitbucket' | 'codeberg'

interface IAccountsProps {
  readonly accounts: ReadonlyArray<Account>

  readonly onDotComSignIn: () => void
  readonly onEnterpriseSignIn: () => void
  readonly onProviderSignIn: (provider: ProviderKey) => void
  readonly onLogout: (account: Account) => void
}

/** Inline SVG icons for each provider */
function providerIcon(provider: ProviderKey): JSX.Element {
  switch (provider) {
    case 'github':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.49 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.115 2.51.337 1.9-1.3 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .27.16.59.67.49A10 10 0 0022 12c0-5.52-4.48-10-10-10z" fill="var(--text-color)" />
        </svg>
      )
    case 'gitlab':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 01-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 014.82 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0118.6 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.51L23 13.45a.84.84 0 01-.35.94z" fill="#FC6D26" />
        </svg>
      )
    case 'bitbucket':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.65 3C2.3 3 2 3.3 2 3.65v.12l2.73 16.5c.07.42.43.73.85.73h13.05c.32 0 .59-.23.64-.54L22 3.77v-.12c0-.36-.3-.65-.65-.65H2.65zM14.1 14.95H9.94L8.81 9.07h6.3l-1.01 5.88z" fill="#2684FF" />
        </svg>
      )
    case 'codeberg':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#2185D0" />
          <path d="M12 6C8.69 6 6 8.69 6 12s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z" fill="#fff" />
        </svg>
      )
  }
}

/** Check if an account belongs to a specific third-party provider */
function isProviderAccount(account: Account, provider: ProviderKey): boolean {
  const ep = account.endpoint.toLowerCase()
  switch (provider) {
    case 'gitlab':
      return ep.includes('gitlab')
    case 'bitbucket':
      return ep.includes('bitbucket')
    case 'codeberg':
      return ep.includes('codeberg')
    default:
      return false
  }
}

export class Accounts extends React.Component<IAccountsProps, {}> {
  public render() {
    const { accounts } = this.props
    const dotComAccount = accounts.find(isDotComAccount)

    const gitlabAccount = accounts.find(a => isProviderAccount(a, 'gitlab'))
    const bitbucketAccount = accounts.find(a => isProviderAccount(a, 'bitbucket'))
    const codebergAccount = accounts.find(a => isProviderAccount(a, 'codeberg'))

    return (
      <DialogContent className="accounts-tab">
        {/* GitHub.com */}
        {this.renderProviderSection(
          'github',
          t('githubCom'),
          t('connectGithubDesc'),
          dotComAccount,
          this.onDotComSignIn,
          true
        )}

        {/* GitHub Enterprise */}
        <div className="provider-section">
          <div className="provider-section-header">
            <div className="provider-icon" aria-hidden={true}>
              {providerIcon('github')}
            </div>
            <h2>{t('githubEnterprise')}</h2>
          </div>
          {this.renderMultipleEnterpriseAccounts()}
        </div>

        {/* GitLab */}
        {this.renderProviderSection(
          'gitlab',
          t('gitlab'),
          t('connectGitlabDesc'),
          gitlabAccount,
          () => this.props.onProviderSignIn('gitlab')
        )}

        {/* Bitbucket */}
        {this.renderProviderSection(
          'bitbucket',
          t('bitbucket'),
          t('connectBitbucketDesc'),
          bitbucketAccount,
          () => this.props.onProviderSignIn('bitbucket')
        )}

        {/* Codeberg */}
        {this.renderProviderSection(
          'codeberg',
          t('codeberg'),
          t('connectCodebergDesc'),
          codebergAccount,
          () => this.props.onProviderSignIn('codeberg')
        )}
      </DialogContent>
    )
  }

  private renderProviderSection(
    provider: ProviderKey,
    title: string,
    description: string,
    account: Account | undefined,
    onSignIn: () => void,
    isPrimary: boolean = false
  ) {
    return (
      <div className="provider-section">
        <div className="provider-section-header">
          <div className="provider-icon" aria-hidden={true}>
            {providerIcon(provider)}
          </div>
          <h2>{title}</h2>
        </div>
        {account
          ? this.renderAccountRow(account, isPrimary)
          : (
            <CallToAction
              actionTitle={t('connect') + ' ' + title}
              onAction={onSignIn}
              buttonClassName={isPrimary ? DialogPreferredFocusClassName : undefined}
            >
              <div>{description}</div>
            </CallToAction>
          )}
      </div>
    )
  }

  private renderMultipleEnterpriseAccounts() {
    const enterpriseAccounts = this.props.accounts
      .filter(isEnterpriseAccount)
      .filter(a =>
        !isProviderAccount(a, 'gitlab') &&
        !isProviderAccount(a, 'bitbucket') &&
        !isProviderAccount(a, 'codeberg')
      )

    return (
      <>
        {enterpriseAccounts.map(account =>
          this.renderAccountRow(account, false)
        )}
        {enterpriseAccounts.length === 0 ? (
          <CallToAction
            actionTitle={t('signIn') + ' GitHub Enterprise'}
            onAction={this.onEnterpriseSignIn}
          >
            <div>
              If you are using GitHub Enterprise at work, sign in to it to get
              access to your repositories.
            </div>
          </CallToAction>
        ) : (
          <Button onClick={this.props.onEnterpriseSignIn}>
            Add GitHub Enterprise account
          </Button>
        )}
      </>
    )
  }

  private renderAccountRow(account: Account, isPrimary: boolean) {
    const avatarUser: IAvatarUser = {
      name: account.name,
      email: lookupPreferredEmail(account),
      avatarURL: account.avatarURL,
      endpoint: account.endpoint,
    }

    const className = isPrimary ? DialogPreferredFocusClassName : undefined

    return (
      <Row className="account-info" key={account.id}>
        <div className="user-info-container">
          <Avatar accounts={this.props.accounts} user={avatarUser} />
          <div className="user-info">
            {isEnterpriseAccount(account) ? (
              <>
                <div className="account-title">
                  {account.name === account.login
                    ? `@${account.login}`
                    : `@${account.login} (${account.name})`}
                </div>
                <div className="endpoint">{getHTMLURL(account.endpoint)}</div>
              </>
            ) : (
              <>
                <div className="name">{account.name}</div>
                <div className="login">@{account.login}</div>
              </>
            )}
          </div>
        </div>
        <Button onClick={this.logout(account)} className={className}>
          {t('signOut')}
        </Button>
      </Row>
    )
  }

  private onDotComSignIn = () => {
    this.props.onDotComSignIn()
  }

  private onEnterpriseSignIn = () => {
    this.props.onEnterpriseSignIn()
  }

  private logout = (account: Account) => {
    return () => {
      this.props.onLogout(account)
    }
  }
}
