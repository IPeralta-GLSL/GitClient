import * as React from 'react'
import { Repository } from '../../models/repository'
import { CloningRepository } from '../../models/cloning-repository'
import { Octicon } from '../octicons'
import * as octicons from '../octicons/octicons.generated'
import { Button } from '../lib/button'

interface IStartTabProps {
  readonly repositories: ReadonlyArray<Repository | CloningRepository>
  readonly recentRepositories: ReadonlyArray<number>
  readonly onSelectRepository: (repository: Repository | CloningRepository) => void
  readonly onClone: () => void
  readonly onCreate: () => void
  readonly onAdd: () => void
}

export class StartTab extends React.Component<IStartTabProps> {
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
      return repositories.slice(0, 10)
    }

    return recentRepos.slice(0, 10)
  }

  private onRepoClick = (repo: Repository | CloningRepository) => {
    this.props.onSelectRepository(repo)
  }

  public render() {
    const recentRepos = this.getRecentRepos()

    return (
      <div className="start-tab">
        <div className="start-tab-content">
          <div className="start-tab-header">
            <Octicon symbol={octicons.markGithub} className="start-tab-logo" />
            <h1>Git Client</h1>
          </div>

          <div className="start-tab-sections">
            <div className="start-tab-recent">
              <h2>
                <Octicon symbol={octicons.history} />
                Recent Repositories
              </h2>
              {recentRepos.length > 0 ? (
                <ul className="recent-repo-list">
                  {recentRepos.map(repo => {
                    const name = repo instanceof Repository ? repo.name : repo.name
                    const path = repo instanceof Repository ? repo.path : ''
                    const key = repo instanceof Repository
                      ? `repo-${repo.id}`
                      : `clone-${repo.id}`
                    return (
                      <li
                        key={key}
                        className="recent-repo-item"
                        onClick={() => this.onRepoClick(repo)}
                      >
                        <Octicon symbol={octicons.repo} className="repo-icon" />
                        <div className="repo-info">
                          <span className="repo-name">{name}</span>
                          {path && <span className="repo-path">{path}</span>}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <p className="no-recent">No recent repositories</p>
              )}
            </div>

            <div className="start-tab-actions">
              <h2>Start</h2>
              <Button className="start-action-btn" onClick={this.props.onClone}>
                <Octicon symbol={octicons.repoClone} />
                <div className="action-text">
                  <span className="action-title">Clone Repository</span>
                  <span className="action-desc">Clone a repository from a URL</span>
                </div>
              </Button>
              <Button className="start-action-btn" onClick={this.props.onCreate}>
                <Octicon symbol={octicons.plus} />
                <div className="action-text">
                  <span className="action-title">New Repository</span>
                  <span className="action-desc">Create a new local repository</span>
                </div>
              </Button>
              <Button className="start-action-btn" onClick={this.props.onAdd}>
                <Octicon symbol={octicons.fileDirectory} />
                <div className="action-text">
                  <span className="action-title">Add Local Repository</span>
                  <span className="action-desc">Add an existing repository from disk</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
