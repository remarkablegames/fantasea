import { Sprite, Z } from '../constants'
import type { Hero } from '../data'
import { addDraggable } from '.'

const SHORE_OFFSET_Y = 150
const HERO_OFFSET_X = 20
const HERO_OFFSET_Y = 25

export function addCards(heroes: Hero[]) {
  const shore = add([
    sprite(Sprite.Shore, { width: width() }),
    pos(0, height() - SHORE_OFFSET_Y),
    z(Z.UI),
  ])

  heroes.forEach((data, index) => {
    const hero = shore.add([
      sprite(data.hero.sprite, {
        width: data.hero.width,
        height: data.hero.height,
      }),
      pos(
        index * (data.hero.width + HERO_OFFSET_X) + HERO_OFFSET_X,
        HERO_OFFSET_Y,
      ),
      area(),
      z(Z.UI),
    ])

    hero.onClick(() => {
      setCursor('grab')
      addDraggable(data)
    })
  })
}
