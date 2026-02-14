import * as React from 'react'
import { Repository } from '../../models/repository'
import { CloningRepository } from '../../models/cloning-repository'
import { Octicon } from '../octicons'
import * as octicons from '../octicons/octicons.generated'

interface IRepositoryTabProps {
  readonly repository: Repository | CloningRepository
  readonly isActive: boolean
  readonly onSelectTab: (repository: Repository | CloningRepository) => void
  readonly onCloseTab: (repository: Repository | CloningRepository) => void
}

class RepositoryTab extends React.Component<IRepositoryTabProps> {
  private onSelect = () => {
    this.props.onSelectTab(this.props.repository)
  }

  private onClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    this.props.onCloseTab(this.props.repository)
  }

  private onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 1) {
      e.preventDefault()
      this.props.onCloseTab(this.props.repository)
    }
  }

  public render() {
    const { repository, isActive } = this.props
    const name =
      repository instanceof Repository ? repository.name : repository.name
    const className = isActive ? 'repo-tab active' : 'repo-tab'
    const icon =
      repository instanceof Repository
        ? octicons.repo
        : octicons.download

    return (
      <div
        className={className}
        onClick={this.onSelect}
        onMouseDown={this.onMouseDown}
        title={
          repository instanceof Repository ? repository.path : repository.name
        }
      >
        <Octicon symbol={icon} className="tab-icon" />
        <span className="tab-label">{name}</span>
        <button className="tab-close" onClick={this.onClose} aria-label="Close">
          <Octicon symbol={octicons.x} />
        </button>
      </div>
    )
  }
}

interface IRepositoryTabBarProps {
  readonly openTabs: ReadonlyArray<Repository | CloningRepository>
  readonly selectedRepository: Repository | CloningRepository | null
  readonly onSelectTab: (repository: Repository | CloningRepository) => void
  readonly onCloseTab: (repository: Repository | CloningRepository) => void
}

export class RepositoryTabBar extends React.Component<IRepositoryTabBarProps> {
  public render() {
    if (this.props.openTabs.length === 0) {
      return null
    }

    return (
      <div className="repository-tab-bar">
        {this.props.openTabs.map(repo => {
          const key =
            repo instanceof Repository ? `repo-${repo.id}` : `clone-${repo.id}`
          const isActive =
            this.props.selectedRepository !== null &&
            this.props.selectedRepository === repo
          return (
            <RepositoryTab
              key={key}
              repository={repo}
              isActive={isActive}
              onSelectTab={this.props.onSelectTab}
              onCloseTab={this.props.onCloseTab}
            />
          )
        })}
      </div>
    )
  }
}
