import { IAPIRepository } from '../../lib/api'
import { IFilterListGroup, IFilterListItem } from '../lib/filter-list'
import { OcticonSymbol } from '../octicons'
import * as octicons from '../octicons/octicons.generated'
import entries from 'lodash/entries'
import groupBy from 'lodash/groupBy'
import { compare } from '../../lib/compare'

/** The identifier for the "Your Repositories" grouping. */
import { Account } from '../../models/account'

export const YourRepositoriesIdentifier = 'your-repositories'

export interface ICloneableRepositoryListItem extends IFilterListItem {
  /** The identifier for the item. */
  readonly id: string

  /** The search text. */
  readonly text: ReadonlyArray<string>

  /** The name of the repository. */
  readonly name: string

  /** The icon for the repo. */
  readonly icon: OcticonSymbol

  /** The clone URL. */
  readonly url: string

  /** Whether or not the repository is archived */
  readonly archived?: boolean
}

function getIcon(gitHubRepo: IAPIRepository): OcticonSymbol {
  if (gitHubRepo.private) {
    return octicons.lock
  }
  if (gitHubRepo.fork) {
    return octicons.repoForked
  }

  return octicons.repo
}

const toListItems = (repositories: ReadonlyArray<IAPIRepository>) =>
  repositories
    .map<ICloneableRepositoryListItem>(repo => ({
      id: repo.html_url,
      text: [`${repo.owner.login}/${repo.name}`],
      url: repo.clone_url,
      name: repo.name,
      icon: getIcon(repo),
      archived: repo.archived,
    }))
    .sort((x, y) => compare(x.name, y.name))

function getServiceName(endpoint: string): string {
  if (endpoint === 'https://api.github.com') {
    return 'GitHub'
  }
  try {
    const { hostname } = new window.URL(endpoint)
    if (hostname.includes('gitlab')) return 'GitLab'
    if (hostname.includes('bitbucket')) return 'Bitbucket'
    if (hostname.includes('codeberg') || hostname.endsWith('.gitea')) return 'Codeberg'
  } catch (e) {}
  return 'Enterprise'
}

export function groupRepositories(
  repositories: ReadonlyArray<IAPIRepository & { _account?: Account }>,
  login: string
): ReadonlyArray<IFilterListGroup<ICloneableRepositoryListItem>> {
  const groups = groupBy(repositories, x => {
    const serviceName = x._account ? getServiceName(x._account.endpoint) : 'GitHub'
    return `${x.owner.login} (${serviceName})`
  })

  return entries(groups)
    .map(([identifier, repos]) => ({ identifier, items: toListItems(repos) }))
    .sort((x, y) => compare(x.identifier, y.identifier))
}

