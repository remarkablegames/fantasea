import './game'
import './lose'
import './menu'
import './preload'
import './win'

import { Scene } from '../constants'
import { state } from '../data'

export function start() {
  if (import.meta.env.DEV) {
    const level = parseInt(
      new URLSearchParams(location.search).get('level') || '',
    )

    if (level > 0) {
      state.level = level - 1
    }
  }

  go(Scene.Preload)
}
