import type { Shape } from 'kaplay'

import { Sprite } from '../constants'

export const beachball = {
  sprite: Sprite.Beachball,
  width: 100,
  height: 100,
  shape: new Circle(vec2(), 50) as Shape,
  damage: 1,
  speed: 300,
}
