import * as React from 'react'
import { Repository } from '../../models/repository'
import { CloningRepository } from '../../models/cloning-repository'
import { Octicon } from '../octicons'
import * as octicons from '../octicons/octicons.generated'
import { Button } from '../lib/button'
import { t } from '../../lib/i18n'

interface IStartTabProps {
  readonly repositories: ReadonlyArray<Repository | CloningRepository>
  readonly recentRepositories: ReadonlyArray<number>
  readonly onSelectRepository: (
    repository: Repository | CloningRepository
  ) => void
  readonly onClone: () => void
  readonly onCreate: () => void
  readonly onAdd: () => void
}

interface IStartTabState {
  readonly searchQuery: string
}

export class StartTab extends React.Component<
  IStartTabProps,
  IStartTabState
> {
  public constructor(props: IStartTabProps) {
    super(props)
    this.state = { searchQuery: '' }
  }

  private getRecentRepos(): ReadonlyArray<Repository | CloningRepository> {
    const { repositories, recentRepositories } = this.props
    const recentRepos: Array<Repository | CloningRepository> = []

    for (const id of recentRepositories) {
      const repo = repositories.find(
        r => r instanceof Repository && r.id === id
      )
      if (repo) {
        recentRepos.push(repo)
      }
    }

    if (recentRepos.length === 0) {
      return repositories.slice(0, 20)
    }

    return recentRepos
  }

  private getAllRepos(): ReadonlyArray<Repository | CloningRepository> {
    const { repositories } = this.props
    return [...repositories].sort((a, b) => a.name.localeCompare(b.name))
  }

  private filterRepos(
    repos: ReadonlyArray<Repository | CloningRepository>
  ): ReadonlyArray<Repository | CloningRepository> {
    const query = this.state.searchQuery.trim().toLowerCase()
    if (query.length === 0) {
      return repos
    }

    return repos.filter(repo => {
      const name = repo.name.toLowerCase()
      const path =
        repo instanceof Repository ? repo.path.toLowerCase() : ''
      return name.includes(query) || path.includes(query)
    })
  }

  private onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value })
  }

  private onRepoClick = (repo: Repository | CloningRepository) => {
    this.props.onSelectRepository(repo)
  }

  private renderRepoItem(repo: Repository | CloningRepository) {
    const name = repo.name
    const path = repo instanceof Repository ? repo.path : ''
    const key =
      repo instanceof Repository ? `repo-${repo.id}` : `clone-${repo.id}`

    return (
      <li
        key={key}
        className="recent-repo-item"
        onClick={() => this.onRepoClick(repo)}
        title={path}
      >
        <Octicon symbol={octicons.repo} className="repo-icon" />
        <div className="repo-info">
          <span className="repo-name">{name}</span>
          {path && <span className="repo-path">{path}</span>}
        </div>
      </li>
    )
  }

  private renderRepoList(
    repos: ReadonlyArray<Repository | CloningRepository>
  ) {
    if (repos.length === 0) {
      return (
        <p className="no-recent">{t('noRepositoriesFound')}</p>
      )
    }

    return (
      <ul className="recent-repo-list">
        {repos.map(repo => this.renderRepoItem(repo))}
      </ul>
    )
  }

  public render() {
    const isSearching = this.state.searchQuery.trim().length > 0
    const recentRepos = this.getRecentRepos()
    const allRepos = this.getAllRepos()

    const filteredRecent = this.filterRepos(recentRepos)
    const filteredAll = this.filterRepos(allRepos)

    return (
      <div className="start-tab">
        <div className="start-tab-content">
          <div className="start-tab-header">
            <Octicon symbol={octicons.markGithub} className="start-tab-logo" />
            <h1>Git Client</h1>
          </div>

          <div className="start-tab-sections">
            <div className="start-tab-recent">
              <div className="start-tab-search">
                <Octicon symbol={octicons.search} className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder={t('searchRepositories')}
                  value={this.state.searchQuery}
                  onChange={this.onSearchChange}
                  autoFocus={true}
                />
              </div>

              <div className="start-tab-repo-lists">
                {!isSearching && (
                  <div className="repo-section">
                    <h2>
                      <Octicon symbol={octicons.history} />
                      {t('recentRepositories')}
                    </h2>
                    {filteredRecent.length > 0 ? (
                      this.renderRepoList(filteredRecent)
                    ) : (
                      <p className="no-recent">
                        {t('noRecentRepositories')}
                      </p>
                    )}
                  </div>
                )}

                <div className="repo-section">
                  <h2>
                    <Octicon symbol={octicons.repo} />
                    {t('allRepositories')}
                  </h2>
                  {this.renderRepoList(filteredAll)}
                </div>
              </div>
            </div>

            <div className="start-tab-actions">
              <h2>{t('start')}</h2>
              <Button
                className="start-action-btn"
                onClick={() => this.props.onClone()}
              >
                <Octicon symbol={octicons.repoClone} />
                <div className="action-text">
                  <span className="action-title">
                    {t('cloneRepository')}
                  </span>
                  <span className="action-desc">
                    {t('cloneRepositoryDesc')}
                  </span>
                </div>
              </Button>
              <Button
                className="start-action-btn"
                onClick={this.props.onCreate}
              >
                <Octicon symbol={octicons.plus} />
                <div className="action-text">
                  <span className="action-title">{t('newRepository')}</span>
                  <span className="action-desc">
                    {t('newRepositoryDesc')}
                  </span>
                </div>
              </Button>
              <Button
                className="start-action-btn"
                onClick={this.props.onAdd}
              >
                <Octicon symbol={octicons.fileDirectory} />
                <div className="action-text">
                  <span className="action-title">
                    {t('addLocalRepository')}
                  </span>
                  <span className="action-desc">
                    {t('addLocalRepositoryDesc')}
                  </span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
