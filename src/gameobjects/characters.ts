import { Z } from '../constants'
import { characters } from '../data'

const HEIGHT = 150

export function addCharacters() {
  const background = add([
    rect(width(), HEIGHT),
    pos(0, height() - HEIGHT),
    color(0, 0, 0),
    opacity(0.7),
    z(Z.UI),
  ])

  characters.map((character, index) => {
    background.add([
      sprite(character.sprite),
      scale(character.scale),
      pos(index * 10, 10),
      z(Z.UI),
    ])
  })
}
