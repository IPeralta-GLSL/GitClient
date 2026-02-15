import * as React from 'react'

/**
 * Map of file extensions to icon colors, mimicking VS Code's file icon theme.
 * Each entry maps an extension (without the dot) to a hex color.
 */
const extensionColors: ReadonlyMap<string, string> = new Map([
  // TypeScript
  ['ts', '#3178C6'],
  ['tsx', '#3178C6'],
  ['d.ts', '#3178C6'],
  // JavaScript
  ['js', '#F1E05A'],
  ['jsx', '#F1E05A'],
  ['mjs', '#F1E05A'],
  ['cjs', '#F1E05A'],
  // JSON
  ['json', '#A87832'],
  ['jsonc', '#A87832'],
  ['json5', '#A87832'],
  // HTML
  ['html', '#E44D26'],
  ['htm', '#E44D26'],
  // CSS / SCSS / LESS
  ['css', '#563D7C'],
  ['scss', '#CD6799'],
  ['sass', '#CD6799'],
  ['less', '#1D365D'],
  // Python
  ['py', '#3572A5'],
  ['pyw', '#3572A5'],
  ['pyi', '#3572A5'],
  // Ruby
  ['rb', '#CC342D'],
  ['erb', '#CC342D'],
  ['gemspec', '#CC342D'],
  // Go
  ['go', '#00ADD8'],
  // Rust
  ['rs', '#DEA584'],
  // Java
  ['java', '#B07219'],
  ['class', '#B07219'],
  ['jar', '#B07219'],
  // Kotlin
  ['kt', '#A97BFF'],
  ['kts', '#A97BFF'],
  // Swift
  ['swift', '#F05138'],
  // C / C++
  ['c', '#555555'],
  ['h', '#555555'],
  ['cpp', '#F34B7D'],
  ['cxx', '#F34B7D'],
  ['cc', '#F34B7D'],
  ['hpp', '#F34B7D'],
  // C#
  ['cs', '#178600'],
  // PHP
  ['php', '#4F5D95'],
  // Shell
  ['sh', '#89E051'],
  ['bash', '#89E051'],
  ['zsh', '#89E051'],
  ['fish', '#89E051'],
  // Markdown
  ['md', '#083FA1'],
  ['mdx', '#083FA1'],
  ['markdown', '#083FA1'],
  // YAML
  ['yml', '#CB171E'],
  ['yaml', '#CB171E'],
  // XML
  ['xml', '#0060AC'],
  ['xsl', '#0060AC'],
  ['xslt', '#0060AC'],
  ['svg', '#FFB13B'],
  // Docker
  ['dockerfile', '#384D54'],
  // SQL
  ['sql', '#E38C00'],
  // Lua
  ['lua', '#000080'],
  // Perl
  ['pl', '#0298C3'],
  ['pm', '#0298C3'],
  // R
  ['r', '#198CE7'],
  ['rmd', '#198CE7'],
  // Dart
  ['dart', '#00B4AB'],
  // Vue
  ['vue', '#41B883'],
  // Svelte
  ['svelte', '#FF3E00'],
  // Elixir
  ['ex', '#6E4A7E'],
  ['exs', '#6E4A7E'],
  // Haskell
  ['hs', '#5E5086'],
  // Scala
  ['scala', '#C22D40'],
  // Clojure
  ['clj', '#DB5855'],
  ['cljs', '#DB5855'],
  // Erlang
  ['erl', '#B83998'],
  // Zig
  ['zig', '#EC915C'],
  // Nim
  ['nim', '#FFE953'],
  // Terraform
  ['tf', '#5C4EE5'],
  ['tfvars', '#5C4EE5'],
  // Config files
  ['toml', '#9C4121'],
  ['ini', '#9C4121'],
  ['cfg', '#9C4121'],
  ['conf', '#9C4121'],
  ['env', '#ECD53F'],
  // Images
  ['png', '#A074C4'],
  ['jpg', '#A074C4'],
  ['jpeg', '#A074C4'],
  ['gif', '#A074C4'],
  ['ico', '#A074C4'],
  ['bmp', '#A074C4'],
  ['webp', '#A074C4'],
  // Fonts
  ['ttf', '#A074C4'],
  ['otf', '#A074C4'],
  ['woff', '#A074C4'],
  ['woff2', '#A074C4'],
  // Archives
  ['zip', '#EC915C'],
  ['tar', '#EC915C'],
  ['gz', '#EC915C'],
  // Misc
  ['txt', '#6A737D'],
  ['log', '#6A737D'],
  ['lock', '#6A737D'],
  ['patch', '#6A737D'],
  ['diff', '#6A737D'],
  ['gitignore', '#F54D27'],
  ['gitattributes', '#F54D27'],
  ['editorconfig', '#FEFEFA'],
  ['prettier', '#56B3B4'],
  ['eslint', '#4B32C3'],
  ['npmrc', '#CB3837'],
  ['nvmrc', '#3C873A'],
])

/**
 * Special filename matches for files without typical extensions
 * (e.g. Makefile, Dockerfile, etc.)
 */
const specialFileNames: ReadonlyMap<string, string> = new Map([
  ['makefile', '#6D8086'],
  ['dockerfile', '#384D54'],
  ['docker-compose.yml', '#384D54'],
  ['docker-compose.yaml', '#384D54'],
  ['.gitignore', '#F54D27'],
  ['.gitattributes', '#F54D27'],
  ['.editorconfig', '#FEFEFA'],
  ['.prettierrc', '#56B3B4'],
  ['.eslintrc', '#4B32C3'],
  ['.npmrc', '#CB3837'],
  ['.nvmrc', '#3C873A'],
  ['.env', '#ECD53F'],
  ['license', '#D4AC0D'],
  ['readme', '#083FA1'],
  ['changelog', '#083FA1'],
  ['rakefile', '#CC342D'],
  ['gemfile', '#CC342D'],
  ['procfile', '#6E4A7E'],
  ['vagrantfile', '#1563FF'],
  ['cmakelists.txt', '#064F8C'],
])

/** Default icon color for unknown file types */
const defaultColor = '#6A737D'

/**
 * Get the icon color for a file based on its path.
 */
function getFileIconColor(path: string): string {
  const basename = path.split('/').pop()?.toLowerCase() ?? ''

  // Check special file names first
  const specialColor = specialFileNames.get(basename)
  if (specialColor !== undefined) {
    return specialColor
  }

  // Check for compound extensions like .d.ts
  const parts = basename.split('.')
  if (parts.length > 2) {
    const compoundExt = parts.slice(-2).join('.')
    const compoundColor = extensionColors.get(compoundExt)
    if (compoundColor !== undefined) {
      return compoundColor
    }
  }

  // Check single extension
  const ext = parts.length > 1 ? parts[parts.length - 1] : ''
  if (ext !== '') {
    const extColor = extensionColors.get(ext)
    if (extColor !== undefined) {
      return extColor
    }
  }

  return defaultColor
}

/**
 * Get a short label for a file extension (used as text inside the icon).
 * Returns 1-3 uppercase characters for the most common languages.
 */
function getFileIconLabel(path: string): string {
  const basename = path.split('/').pop()?.toLowerCase() ?? ''
  const parts = basename.split('.')
  const ext = parts.length > 1 ? parts[parts.length - 1] : ''

  switch (ext) {
    case 'ts':
    case 'tsx':
      return 'TS'
    case 'js':
    case 'jsx':
    case 'mjs':
    case 'cjs':
      return 'JS'
    case 'py':
    case 'pyw':
    case 'pyi':
      return 'PY'
    case 'rb':
    case 'erb':
      return 'RB'
    case 'go':
      return 'GO'
    case 'rs':
      return 'RS'
    case 'java':
      return 'JV'
    case 'kt':
    case 'kts':
      return 'KT'
    case 'swift':
      return 'SW'
    case 'c':
      return 'C'
    case 'h':
      return 'H'
    case 'cpp':
    case 'cxx':
    case 'cc':
      return 'C+'
    case 'hpp':
      return 'H+'
    case 'cs':
      return 'C#'
    case 'css':
      return 'CS'
    case 'scss':
    case 'sass':
      return 'SC'
    case 'less':
      return 'LS'
    case 'html':
    case 'htm':
      return '<>'
    case 'json':
    case 'jsonc':
      return '{}'
    case 'md':
    case 'mdx':
    case 'markdown':
      return 'MD'
    case 'yml':
    case 'yaml':
      return 'YM'
    case 'xml':
    case 'xsl':
      return 'XM'
    case 'svg':
      return 'SV'
    case 'php':
      return 'PH'
    case 'sh':
    case 'bash':
    case 'zsh':
    case 'fish':
      return 'SH'
    case 'sql':
      return 'SQ'
    case 'lua':
      return 'LU'
    case 'vue':
      return 'VU'
    case 'svelte':
      return 'SV'
    case 'dart':
      return 'DA'
    case 'r':
    case 'rmd':
      return 'R'
    case 'ex':
    case 'exs':
      return 'EX'
    case 'hs':
      return 'HS'
    case 'scala':
      return 'SC'
    case 'clj':
    case 'cljs':
      return 'CL'
    case 'erl':
      return 'ER'
    case 'zig':
      return 'ZG'
    case 'nim':
      return 'NM'
    case 'tf':
    case 'tfvars':
      return 'TF'
    case 'toml':
      return 'TM'
    case 'ini':
    case 'cfg':
    case 'conf':
      return 'CF'
    case 'env':
      return 'EN'
    case 'txt':
    case 'log':
      return 'TX'
    case 'lock':
      return 'LK'
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'bmp':
    case 'ico':
    case 'webp':
      return 'IM'
    case 'zip':
    case 'tar':
    case 'gz':
      return 'ZP'
    default: {
      // For unknown extensions, use first 2 chars of extension
      if (ext.length > 0) {
        return ext.substring(0, 2).toUpperCase()
      }
      // For files without extension, use first 2 chars of name
      return basename.substring(0, 2).toUpperCase()
    }
  }
}

interface IFileIconProps {
  /** The file path used to determine the icon */
  readonly path: string
}

/**
 * A small colored icon that represents a file type based on its extension,
 * similar to VS Code's file icons in the explorer and file lists.
 *
 * Renders a 16x16 SVG with a rounded rectangle background colored by
 * file extension, and a short label (1-3 chars) of the language inside.
 */
export class FileIcon extends React.Component<IFileIconProps, {}> {
  public render() {
    const { path } = this.props
    const color = getFileIconColor(path)
    const label = getFileIconLabel(path)
    const fontSize = label.length > 2 ? 5.5 : 6.5

    return (
      <svg
        className="file-icon"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="1"
          y="1"
          width="14"
          height="14"
          rx="2"
          ry="2"
          fill={color}
          opacity="0.85"
        />
        <text
          x="8"
          y="8.5"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#fff"
          fontSize={fontSize}
          fontWeight="bold"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          {label}
        </text>
      </svg>
    )
  }
}
