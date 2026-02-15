import * as React from 'react'
import { t } from '../../lib/i18n'
import { encodePathAsUrl } from '../../lib/path'
import { Ref } from '../lib/ref'
import { LinkButton } from '../lib/link-button'

const BlankSlateImage = encodePathAsUrl(
  __dirname,
  'static/empty-no-pull-requests.svg'
)

interface INoPullRequestsProps {
  /** The name of the repository. */
  readonly repositoryName: string

  /** Is the default branch currently checked out? */
  readonly isOnDefaultBranch: boolean

  /** Is this component being rendered due to a search? */
  readonly isSearch: boolean

  /* Called when the user wants to create a new branch. */
  readonly onCreateBranch: () => void

  /** Called when the user wants to create a pull request. */
  readonly onCreatePullRequest: () => void

  /** Are we currently loading pull requests? */
  readonly isLoadingPullRequests: boolean
}

/** The placeholder for when there are no open pull requests. */
export class NoPullRequests extends React.Component<INoPullRequestsProps, {}> {
  public render() {
    return (
      <div className="no-pull-requests">
        <img src={BlankSlateImage} className="blankslate-image" alt="" />
        {this.renderTitle()}
        {this.renderCallToAction()}
      </div>
    )
  }

  private renderTitle() {
      if (this.props.isSearch) {
      return <div className="title">{t('sorryCantFindPullRequest')}</div>
    } else if (this.props.isLoadingPullRequests) {
      return <div className="title">{t('hangTight')}</div>
    } else {
      return (
        <div>
          <div className="title">{t('youreAllSet')}</div>
          <div className="no-prs">
            {t('noOpenPullRequestsIn')} <Ref>{this.props.repositoryName}</Ref>
          </div>
        </div>
      )
    }
  }

  private renderCallToAction() {
    if (this.props.isLoadingPullRequests) {
      return (
        <div className="call-to-action">{t('loadingPullRequests')}</div>
      )
    }

    if (this.props.isOnDefaultBranch) {
      return (
        <div className="call-to-action">
          {t('wouldYouLike')}{' '}
          <LinkButton onClick={this.props.onCreateBranch}>
            {t('createANewBranch')}
          </LinkButton>{' '}
          {t('andGetGoing')}
        </div>
      )
    } else {
      return (
        <div className="call-to-action">
          {t('wouldYouLike')}{' '}
          <LinkButton onClick={this.props.onCreatePullRequest}>
            {t('createAPullRequest')}
          </LinkButton>{' '}
          {t('fromTheCurrentBranch')}
        </div>
      )
    }
  }
}
