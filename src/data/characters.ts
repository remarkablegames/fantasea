import { Sprite } from '../constants'
import { addBullet } from '../gameobjects'

export type Character = (typeof characters)[0]

export const characters = [
  {
    sprite: Sprite.Guard,
    width: 100,
    height: 114,
    loop: {
      time: 3,
      action: addBullet,
    },
  },
]
