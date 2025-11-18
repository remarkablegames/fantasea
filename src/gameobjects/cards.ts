import { Z } from '../constants'
import type { Hero } from '../data'
import { addDraggable } from '.'

const HEIGHT = 150

export function addCards(heroes: Hero[]) {
  const background = add([
    rect(width(), HEIGHT),
    pos(0, height() - HEIGHT),
    color(BLACK),
    opacity(0.7),
    z(Z.UI),
  ])

  heroes.forEach((data, index) => {
    const card = background.add([
      sprite(data.hero.sprite, {
        width: data.hero.width,
        height: data.hero.height,
      }),
      pos(index * 10, 10),
      area(),
      z(Z.UI),
    ])

    card.onClick(() => {
      setCursor('grab')
      addDraggable(data)
    })
  })
}
