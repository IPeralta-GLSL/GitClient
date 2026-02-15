import { git } from './core'
import { Repository } from '../../models/repository'
import * as Path from 'path'

/**
 * Track one or more file patterns with Git LFS.
 *
 * This runs `git lfs track <pattern>` for each pattern provided
 * and stages the updated .gitattributes file.
 */
export async function trackFilesWithLFS(
  repository: Repository,
  patterns: ReadonlyArray<string>
): Promise<void> {
  for (const pattern of patterns) {
    await git(['lfs', 'track', pattern], repository.path, 'trackFilesWithLFS')
  }

  // Stage the .gitattributes file so changes are included in the next commit
  const gitattributesPath = Path.join(repository.path, '.gitattributes')
  await git(['add', gitattributesPath], repository.path, 'stageLFSAttributes')
}

/**
 * Track specific file paths with Git LFS by their file extension.
 *
 * Given a list of file paths, this extracts unique extensions and
 * calls `git lfs track "*.ext"` for each.
 */
export async function trackPathsByExtensionWithLFS(
  repository: Repository,
  filePaths: ReadonlyArray<string>
): Promise<ReadonlyArray<string>> {
  const extensions = new Set<string>()

  for (const filePath of filePaths) {
    const ext = Path.extname(filePath)
    if (ext) {
      extensions.add(`*${ext}`)
    } else {
      // No extension — track the file directly
      extensions.add(filePath)
    }
  }

  const patterns = Array.from(extensions)
  await trackFilesWithLFS(repository, patterns)
  return patterns
}

/**
 * Get the list of currently tracked LFS patterns.
 */
export async function getLFSTrackedPatterns(
  repository: Repository
): Promise<ReadonlyArray<string>> {
  const env = {
    GIT_LFS_TRACK_NO_INSTALL_HOOKS: '1',
  }
  const result = await git(['lfs', 'track'], repository.path, 'getLFSTrackedPatterns', {
    env,
  })

  const patterns: string[] = []
  const lines = result.stdout.split('\n')
  for (const line of lines) {
    // Lines look like: "    *.psd (.gitattributes)"
    const match = /^\s+(.+)\s+\(/.exec(line)
    if (match) {
      patterns.push(match[1])
    }
  }

  return patterns
}

/**
 * Check whether Git LFS is installed and available.
 */
export async function isGitLFSInstalled(): Promise<boolean> {
  try {
    await git(['lfs', 'version'], __dirname, 'isGitLFSInstalled')
    return true
  } catch {
    return false
  }
}

/** Install the global LFS filters. */
export async function installGlobalLFSFilters(force: boolean): Promise<void> {
  const args = ['lfs', 'install', '--skip-repo']
  if (force) {
    args.push('--force')
  }

  await git(args, __dirname, 'installGlobalLFSFilter')
}

/** Install LFS hooks in the repository. */
export async function installLFSHooks(
  repository: Repository,
  force: boolean
): Promise<void> {
  const args = ['lfs', 'install']
  if (force) {
    args.push('--force')
  }

  await git(args, repository.path, 'installLFSHooks')
}

/** Is the repository configured to track any paths with LFS? */
export async function isUsingLFS(repository: Repository): Promise<boolean> {
  const env = {
    GIT_LFS_TRACK_NO_INSTALL_HOOKS: '1',
  }
  const result = await git(['lfs', 'track'], repository.path, 'isUsingLFS', {
    env,
  })
  return result.stdout.length > 0
}

/**
 * Check if a provided file path is being tracked by Git LFS
 *
 * This uses the Git plumbing to read the .gitattributes file
 * for any LFS-related rules that are set for the file
 *
 * @param repository repository with
 * @param path relative file path in the repository
 */
export async function isTrackedByLFS(
  repository: Repository,
  path: string
): Promise<boolean> {
  const { stdout } = await git(
    ['check-attr', 'filter', path],
    repository.path,
    'checkAttrForLFS'
  )

  // "git check-attr -a" will output every filter it can find in .gitattributes
  // and it looks like this:
  //
  // README.md: diff: lfs
  // README.md: merge: lfs
  // README.md: text: unset
  // README.md: filter: lfs
  //
  // To verify git-lfs this test will just focus on that last row, "filter",
  // and the value associated with it. If nothing is found in .gitattributes
  // the output will look like this
  //
  // README.md: filter: unspecified

  const lfsFilterRegex = /: filter: lfs/

  const match = lfsFilterRegex.exec(stdout)

  return match !== null
}

/**
 * Query a Git repository and filter the set of provided relative paths to see
 * which are not covered by the current Git LFS configuration.
 *
 * @param repository
 * @param filePaths List of relative paths in the repository
 */
export async function filesNotTrackedByLFS(
  repository: Repository,
  filePaths: ReadonlyArray<string>
): Promise<ReadonlyArray<string>> {
  const filesNotTrackedByGitLFS = new Array<string>()

  for (const file of filePaths) {
    const isTracked = await isTrackedByLFS(repository, file)

    if (!isTracked) {
      filesNotTrackedByGitLFS.push(file)
    }
  }

  return filesNotTrackedByGitLFS
}
