import { Music, Scene } from '../constants'
import { state } from '../data'
import { addButton } from '../gameobjects'

const OFFSET_Y = 60

scene(Scene.Menu, () => {
  if (import.meta.env.DEV) {
    const level = parseInt(
      new URLSearchParams(location.search).get('level') || '',
    )
    if (level > 0) {
      state.level = level - 1
    }
  }

  const { x, y } = center()

  add([
    text('FantaSea', { size: 72 }),
    color(BLACK),
    anchor('center'),
    pos(x, y - OFFSET_Y),
  ])

  add([
    text('Heroes on Vacation', { size: 36 }),
    color(BLACK),
    anchor('center'),
    pos(x, y),
  ])

  addButton({
    label: 'Play',
    size: 36,
    width: 200,
    height: 60,
    comps: [pos(x, y + OFFSET_Y + 30)],
    onClick() {
      const music = play(Music.Theme, { loop: true })
      music.volume = 0.75
      go(Scene.Game)
    },
  })
})
