import type { Shape } from 'kaplay'

import { Sprite } from '../constants'

export const arrow = {
  sprite: Sprite.Arrow,
  width: 17,
  height: 100,
  shape: new Rect(vec2(), 5, 100) as Shape,
  damage: 1,
  health: 1,
  speed: 300,
  timer: {
    wait: 3,
    interval: 3,
  },
}

export const beachball = {
  sprite: Sprite.Beachball,
  width: 100,
  height: 100,
  shape: new Circle(vec2(), 50) as Shape,
  damage: 2,
  health: 2,
  speed: 150,
  timer: {
    wait: 5,
    interval: 5,
  },
}

export const sword = {
  sprite: Sprite.Sword,
  width: 100,
  height: 60,
  shape: new Polygon([vec2(-100, -30), vec2(), vec2()]),
  damage: 0.5,
  health: 10,
  speed: 150,
  timer: {
    wait: 5,
    interval: 5,
  },
}
