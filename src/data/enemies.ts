import type { Shape } from 'kaplay'

import { Sprite } from '../constants'

export const goblin = {
  sprite: Sprite.Enemy,
  width: 100,
  height: 100,
  shape: new Circle(vec2(), 50) as Shape,
}
