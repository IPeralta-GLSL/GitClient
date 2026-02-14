import { setBoolean } from './local-storage'

const HasShownWelcomeFlowKey = 'has-shown-welcome-flow'

export function hasShownWelcomeFlow(): boolean {
  return true
}

export function markWelcomeFlowComplete() {
  setBoolean(HasShownWelcomeFlowKey, true)
}
