import { Sound, Sprite } from '../constants'
import { addModal } from '.'

const PADDING = 20
const WIDTH = 600
const HEIGHT = 300

export function addReward() {
  const modal = addModal()

  const { x, y } = center()

  const menu = modal.add([
    rect(WIDTH, HEIGHT),
    color(BLACK),
    outline(4, CYAN),
    pos(x - WIDTH / 2, y - HEIGHT / 2),
    opacity(0.8),
    z(modal.z),
  ])

  menu.add([text('Choose a reward:'), color(GREEN), pos(PADDING), z(modal.z)])

  menu.add([
    text('Select an entity to increase damage by 20%.', {
      size: 30,
      width: WIDTH,
    }),
    pos(PADDING, PADDING * 4),
    z(modal.z),
  ])

  const reward = menu.add([
    sprite(Sprite.Guard, {
      width: 100,
      height: 114,
    }),
    pos(PADDING, PADDING * 8),
    area(),
    color(),
    scale(),
    z(modal.z),
  ])

  reward.onHover(() => {
    setCursor('pointer')
    reward.color = YELLOW
    reward.scaleTo(1.03)
    play(Sound.Hover, { volume: 0.5 })
  })

  reward.onHoverEnd(() => {
    setCursor('default')
    reward.color = WHITE
    reward.scaleTo(1)
  })

  reward.onClick(() => {
    play(Sound.Click)
    modal.destroy()
  })
}
