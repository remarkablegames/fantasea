import { Sprite } from '../constants'

export function addBackground() {
  const background = add([sprite(Sprite.Background)])

  return background
}
