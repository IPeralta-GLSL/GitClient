import * as React from 'react'
import { Dialog, DialogContent, DialogFooter } from '../dialog'
import { PathText } from '../lib/path-text'
import { Dispatcher } from '../dispatcher'
import { Repository } from '../../models/repository'
import { ICommitContext } from '../../models/commit'
import { DefaultCommitMessage } from '../../models/commit-message'
import { OkCancelButtonGroup } from '../dialog/ok-cancel-button-group'
import { t } from '../../lib/i18n'
import {
    trackPathsByExtensionWithLFS,
    isGitLFSInstalled,
} from '../../lib/git/lfs'
import { Button } from '../lib/button'
import { Loading } from '../lib/loading'

interface IOversizedFilesProps {
  readonly oversizedFiles: ReadonlyArray<string>
  readonly onDismissed: () => void
  readonly dispatcher: Dispatcher
  readonly context: ICommitContext
  readonly repository: Repository
}

interface IOversizedFilesState {
  readonly isTrackingWithLFS: boolean
  readonly lfsTrackingComplete: boolean
  readonly trackedPatterns: ReadonlyArray<string>
  readonly lfsAvailable: boolean | null
}

/** A dialog to display a list of files that are too large to commit. */
export class OversizedFiles extends React.Component<
  IOversizedFilesProps,
  IOversizedFilesState
> {
  public constructor(props: IOversizedFilesProps) {
    super(props)

    this.state = {
      isTrackingWithLFS: false,
      lfsTrackingComplete: false,
      trackedPatterns: [],
      lfsAvailable: null,
    }
  }

  public async componentDidMount() {
    const available = await isGitLFSInstalled()
    this.setState({ lfsAvailable: available })
  }

  public render() {
    return (
      <Dialog
        id="oversized-files"
        title={t('filesTooLarge')}
        onSubmit={this.onSubmit}
        onDismissed={this.props.onDismissed}
        type="warning"
      >
        <DialogContent>
          {this.state.lfsTrackingComplete
            ? this.renderLFSSuccess()
            : this.renderWarning()}
        </DialogContent>

        <DialogFooter>
          {this.state.lfsTrackingComplete
            ? this.renderSuccessFooter()
            : this.renderWarningFooter()}
        </DialogFooter>
      </Dialog>
    )
  }

  private renderWarning() {
    return (
      <>
        <p>
          {t('oversizedFilesWarning')}
        </p>
        {this.renderFileList()}
        {this.state.lfsAvailable === true && (
          <div className="lfs-recommendation">
            <p>{t('lfsRecommendation')}</p>
            <Button
              onClick={this.onTrackWithLFS}
              disabled={this.state.isTrackingWithLFS}
              className="lfs-track-button"
            >
              {this.state.isTrackingWithLFS && <Loading />}
              {t('trackWithLFS')}
            </Button>
          </div>
        )}
        {this.state.lfsAvailable === false && (
          <p className="recommendation">
            {t('lfsNotInstalled')}
          </p>
        )}
      </>
    )
  }

  private renderLFSSuccess() {
    return (
      <>
        <p>{t('lfsTrackingSuccess')}</p>
        <div className="files-list">
          <ul>
            {this.state.trackedPatterns.map(pattern => (
              <li key={pattern}>
                <code>{pattern}</code>
              </li>
            ))}
          </ul>
        </div>
        <p>{t('lfsTrackingSuccessHint')}</p>
      </>
    )
  }

  private renderWarningFooter() {
    return (
      <OkCancelButtonGroup
        destructive={true}
        okButtonText={t('commitAnyway')}
      />
    )
  }

  private renderSuccessFooter() {
    return (
      <OkCancelButtonGroup
        okButtonText={t('commitNow')}
        cancelButtonText={t('close')}
      />
    )
  }

  private renderFileList() {
    return (
      <div className="files-list">
        <ul>
          {this.props.oversizedFiles.map(fileName => (
            <li key={fileName}>
              <PathText path={fileName} />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  private onTrackWithLFS = async () => {
    this.setState({ isTrackingWithLFS: true })

    try {
      const patterns = await trackPathsByExtensionWithLFS(
        this.props.repository,
        this.props.oversizedFiles
      )

      this.setState({
        isTrackingWithLFS: false,
        lfsTrackingComplete: true,
        trackedPatterns: patterns,
      })

      // Refresh the repo to pick up .gitattributes changes
      this.props.dispatcher.refreshRepository(this.props.repository)
    } catch (error) {
      this.setState({ isTrackingWithLFS: false })
      this.props.dispatcher.postError(error)
    }
  }

  private onSubmit = async () => {
    this.props.onDismissed()

    await this.props.dispatcher.commitIncludedChanges(
      this.props.repository,
      this.props.context
    )

    this.props.dispatcher.setCommitMessage(
      this.props.repository,
      DefaultCommitMessage
    )
  }
}
