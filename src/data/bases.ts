import type { Shape } from 'kaplay'

import { Sprite } from '../constants'

export const island = {
  sprite: Sprite.Island,
  width: 212,
  height: 106,
  shape: new Polygon([vec2(0, -50), vec2(90, 10), vec2(-80, 5)]) as Shape,
}
