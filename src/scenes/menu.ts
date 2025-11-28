import { Music, Scene, Sprite } from '../constants'
import { addButton } from '../gameobjects'

scene(Scene.Menu, () => {
  const { x, y } = center()

  add([sprite(Sprite.Menu), anchor('center'), pos(x, y)])

  addButton({
    label: 'Play',
    size: 36,
    width: 200,
    height: 60,
    comps: [pos(x, y + 190)],
    onClick() {
      const music = play(Music.Theme, { loop: true })
      music.volume = 0.6
      go(Scene.Game)
    },
  })
})
