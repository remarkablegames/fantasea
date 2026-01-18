import { getRoot } from '../gameobjects'

export function onRootDestroy(action: () => void) {
  getRoot().onDestroy(action)
}
