import { Sound, Sprite, Z } from '../constants'
import { type Hero, state } from '../data'
import { onRootDestroy } from '../events'
import { getMultiplierText } from '../helpers'
import { addDraggable, addTooltip } from '.'

const HERO_OFFSET_X = 35
const HERO_OFFSET_Y = 15

const getShorePos = () => vec2(0, height() - 150)

export function addCards(heroes: Hero[]) {
  const shore = add([
    sprite(Sprite.Shore, { width: width() }),
    pos(getShorePos()),
    z(Z.UI),
  ])

  heroes.forEach((data, index) => {
    const card = shore.add([
      sprite(data.sprite, {
        width: 115,
      }),
      pos(index * (data.width + HERO_OFFSET_X) + HERO_OFFSET_X, HERO_OFFSET_Y),
      area(),
      scale(),
      color(),
      z(Z.UI),
    ])

    card.onHover(() => {
      setCursor('pointer')
      card.color = YELLOW
      card.scaleTo(1.03)
      play(Sound.Hover, { volume: 0.5 })
    })

    card.onHoverEnd(() => {
      setCursor('default')
      card.color = WHITE
      card.scaleTo(1)
    })

    card.onClick(() => {
      setCursor('grab')
      play(Sound.Drag)
      addDraggable(data)
    })

    addTooltip({
      width: 240,
      height: 140,
      text: getMultiplierText(state.multiplier[data.sprite]),
      anchor: 'botleft',
      parent: card,
    })
  })

  const resizeController = onResize(() => {
    shore.width = width()
    shore.pos = getShorePos()
  })

  onRootDestroy(() => {
    resizeController.cancel()
  })
}
