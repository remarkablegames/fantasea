import { Scene, Sound, Sprite } from '../constants'
import { type BaseMultiplier, rewards, state } from '../data'
import { addModal } from '.'

const PADDING = 20
const WIDTH = 600
const HEIGHT = 300

export function addReward() {
  const modal = addModal()

  const menuCenter = center().sub(WIDTH / 2, HEIGHT / 2)

  const menu = modal.add([
    rect(WIDTH, HEIGHT),
    color(BLACK),
    outline(4, CYAN),
    pos(menuCenter.x, height()),
    opacity(0.8),
    z(modal.z),
  ])

  menu.add([text('Select 1 reward:'), color(GREEN), pos(PADDING), z(modal.z)])

  const rewards = getRewards()

  menu.add([
    text(rewards[0].text, {
      size: 30,
      width: WIDTH - PADDING * 2,
    }),
    pos(PADDING, PADDING * 4),
    z(modal.z),
  ])

  rewards.forEach((reward, index) => {
    const choice = menu.add([
      sprite(reward.sprite, {
        width: 100,
      }),
      pos(200 * index + PADDING, PADDING * 8),
      area(),
      color(),
      scale(),
      z(modal.z),
    ])

    choice.onHover(() => {
      setCursor('pointer')
      choice.color = YELLOW
      choice.scaleTo(1.03)
      play(Sound.Hover, { volume: 0.5 })
    })

    choice.onHoverEnd(() => {
      setCursor('default')
      choice.color = WHITE
      choice.scaleTo(1)
    })

    choice.onClick(() => {
      state.multiplier[reward.sprite] = {
        ...state.multiplier[reward.sprite],
        ...reward.multiplier,
      }
      play(Sound.Click)
      modal.destroy()
      go(Scene.Game)
    })
  })

  tween(
    menu.pos,
    menuCenter,
    1,
    (position) => (menu.pos = position),
    easings.easeOutElastic,
  )

  play(Sound.Bounce, { detune: 300 })
}

interface Reward {
  sprite: Sprite
  text: string
  multiplier: Partial<BaseMultiplier>
}

function getRewards(): Reward[] {
  const multipliers = chooseMultiple(rewards.multipliers, 1)
  const entities = chooseMultiple(rewards.entities, 3)

  return multipliers.reduce(
    (accumulator, { text, multiplier }) =>
      accumulator.concat(
        entities.map(({ sprite }) => ({
          sprite,
          multiplier,
          text,
        })),
      ),
    [] as Reward[],
  )
}
