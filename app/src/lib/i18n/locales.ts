export type AppLocale = 'en' | 'es'

export interface ITranslations {
  readonly currentBranch: string
  readonly noBranchSelected: string
  readonly openFolder: string
  readonly fetchOrigin: string
  readonly lastFetched: string
  readonly neverFetched: string
  readonly justNow: string
  readonly minutesAgo: string
  readonly hoursAgo: string
  readonly daysAgo: string
  readonly upToDate: string
  readonly pullOrigin: string
  readonly pushOrigin: string
  readonly forcePushOrigin: string
  readonly publishBranch: string
  readonly publishRepository: string
  readonly publishRepositoryDesc: string
  readonly publishBranchToGitHub: string
  readonly publishBranchToRemote: string
  readonly cannotPublishUnborn: string
  readonly cannotPublishDetached: string
  readonly rebaseInProgress: string

  readonly recentRepositories: string
  readonly noRecentRepositories: string
  readonly start: string
  readonly cloneRepository: string
  readonly cloneRepositoryDesc: string
  readonly newRepository: string
  readonly newRepositoryDesc: string
  readonly addLocalRepository: string
  readonly addLocalRepositoryDesc: string

  readonly changes: string
  readonly history: string

  readonly settings: string
  readonly options: string
  readonly accounts: string
  readonly integrations: string
  readonly git: string
  readonly appearance: string
  readonly notifications: string
  readonly prompts: string
  readonly advanced: string
  readonly accessibility: string
  readonly language: string

  readonly save: string
  readonly cancel: string

  readonly languageSelection: string
  readonly languageDescription: string
  readonly english: string
  readonly spanish: string

  readonly close: string
}
