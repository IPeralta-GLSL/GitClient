export type AppLocale = 'en' | 'es'

export interface ITranslations {
  readonly currentBranch: string
  readonly noBranchSelected: string
  readonly openFolder: string
  readonly openTerminal: string
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
  readonly ok: string

  readonly languageSelection: string
  readonly languageDescription: string
  readonly english: string
  readonly spanish: string

  readonly close: string

  readonly detachedHead: string
  readonly currentlyOnDetachedHead: string
  readonly rebasingBranch: string
  readonly checkingOut: string

  readonly summary: string
  readonly description: string
  readonly commitTo: string
  readonly amend: string
  readonly amending: string
  readonly commit: string
  readonly committing: string
  readonly files: string
  readonly file: string
  readonly lastCommit: string
  readonly stopAmending: string
  readonly makeNewCommit: string
  readonly createFork: string
  readonly switchBranch: string
  readonly protectedBranch: string
  readonly noWriteAccess: string
  readonly commitMessageInput: string
  readonly descriptionInput: string
  readonly showCommitProgress: string
  readonly summaryLengthHint: string
  readonly summaryLengthHintDesc: string

  readonly quitAndInstall: string
  readonly checkForUpdates: string
  readonly devModeNoUpdates: string
  readonly checkingForUpdates: string
  readonly downloadingUpdate: string
  readonly updateReady: string
  readonly updateAvailable: string
  readonly version: string
  readonly build: string
  readonly releaseNotes: string
  readonly termsAndConditions: string
  readonly licenseAndNotices: string
  readonly betaChannel: string
  readonly lookingForLatest: string
  readonly about: string

  readonly clone: string
  readonly url: string
  readonly githubCom: string
  readonly githubEnterprise: string
  readonly signIn: string
  readonly signOut: string
  readonly connect: string
  readonly addAccountDialogTitle: string
  readonly connectGithubDesc: string
  readonly gitlab: string
  readonly connectGitlabDesc: string
  readonly bitbucket: string
  readonly connectBitbucketDesc: string
  readonly codeberg: string
  readonly connectCodebergDesc: string

  readonly addExistingRepository: string
  readonly localPath: string
  readonly choose: string
  readonly addRepository: string
  readonly createRepository: string
  readonly name: string
  readonly initializeReadme: string

  readonly theme: string
  readonly light: string
  readonly dark: string
  readonly systemTheme: string
  readonly highContrast: string
  readonly diff: string
  readonly tabSize: string

  readonly defaultBranchName: string
  readonly hooks: string
  readonly beta: string

  readonly backgroundUpdates: string
  readonly showStatusIcons: string
  readonly usage: string
  readonly helpImprove: string
  readonly networkAndCredentials: string
  readonly useCredentialManager: string
  readonly useSystemOpenSSH: string

  readonly enableNotifications: string

  readonly confirmBefore: string
  readonly removingRepositories: string
  readonly discardingChanges: string
  readonly discardingChangesPermanently: string
  readonly discardingStash: string
  readonly checkingOutCommit: string
  readonly forcePushing: string
  readonly undoCommit: string

  readonly underlineLinks: string
  readonly showCheckMarks: string

  readonly externalEditor: string
  readonly shell: string
  readonly applications: string
  readonly noEditorsFound: string
  readonly configureCustomEditor: string

  readonly noFileSelected: string
  readonly noLocalChanges: string
  readonly viewStash: string
  readonly publishRepo: string
  readonly createPullRequest: string
  readonly previewPullRequest: string
  readonly pull: string
  readonly push: string
  readonly fetch: string

  readonly menuFile: string
  readonly menuEdit: string
  readonly menuView: string
  readonly menuRepository: string
  readonly menuBranch: string
  readonly menuHelp: string
  readonly menuUndo: string
  readonly menuRedo: string
  readonly menuCut: string
  readonly menuCopy: string
  readonly menuPaste: string
  readonly menuSelectAll: string
  readonly menuFind: string
  readonly menuNewBranch: string
  readonly menuRename: string
  readonly menuDelete: string
  readonly menuShowChanges: string
  readonly menuShowHistory: string
  readonly menuShowRepoList: string
  readonly menuShowBranchesList: string
  readonly menuGoToSummary: string
  readonly menuToggleFullScreen: string
  readonly menuResetZoom: string
  readonly menuZoomIn: string
  readonly menuZoomOut: string
  readonly menuReportIssue: string
  readonly menuContactSupport: string
  readonly menuShowUserGuides: string
  readonly menuShowKeyboardShortcuts: string
  readonly menuAbout: string
  readonly menuViewOnGitHub: string
  readonly menuRepositorySettings: string
  readonly menuInstallCLI: string
  readonly menuExit: string
  readonly cloning: string
  readonly termsAndConditionsTitle: string
  readonly connectingToGitHub: string
  readonly openSourceLicensesAndNotices: string
  readonly contact: string
  readonly githubsLogos: string
  readonly logos: string
  readonly privacy: string
  readonly additionalServices: string
  readonly autoUpdateServices: string
  readonly disclaimersAndLimitations: string
  readonly miscellanea: string
  readonly supportEmail: string

  readonly sorryCantFindPullRequest: string
  readonly hangTight: string
  readonly youreAllSet: string
  readonly noOpenPullRequestsIn: string
  readonly loadingPullRequests: string
  readonly wouldYouLike: string
  readonly createANewBranch: string
  readonly andGetGoing: string
  readonly createAPullRequest: string
  readonly fromTheCurrentBranch: string

  readonly branches: string
  readonly pullRequestsDarwin: string
  readonly pullRequests: string
  readonly chooseBranchToMergeInto: string

  readonly baseLabel: string
  readonly chooseABaseBranch: string

  readonly fullNameLabel: string
  readonly lastModifiedLabel: string

  readonly sorryCantFindBranch: string
  readonly doYouWantToCreateNewBranch: string
  readonly createNewBranchDarwin: string
  readonly createNewBranch: string
  readonly protipPress: string
  readonly toQuicklyCreateNewBranch: string

  readonly locate: string
  readonly cloneAgain: string
  readonly trustRepositoryDarwin: string
  readonly trustRepository: string
  readonly remove: string
  readonly isPotentiallyUnsafe: string
  readonly itWasLastSeenAt: string
  readonly checkAgain: string

  readonly filesTooLarge: string
  readonly oversizedFilesWarning: string
  readonly lfsRecommendation: string
  readonly trackWithLFS: string
  readonly lfsNotInstalled: string
  readonly lfsTrackingSuccess: string
  readonly lfsTrackingSuccessHint: string
  readonly commitAnyway: string
  readonly commitNow: string
}
