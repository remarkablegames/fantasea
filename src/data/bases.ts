import type { Shape } from 'kaplay'

import { Sprite } from '../constants'

type Base = typeof blackrock
export type BaseMultiplier = Base['multiplier']

export const blackrock = {
  sprite: Sprite.Blackrock,
  width: 162,
  shape: new Polygon([vec2(-25, -50), vec2(65, 35), vec2(-70, 35)]) as Shape,
  droppable: vec2(0, 12),
  multiplier: {
    cooldown: 1,
    damage: 0.5,
    health: 1.5,
    lifespan: 1.5,
    scale: 1.5,
    speed: 1,
  },
}

export const island = {
  sprite: Sprite.Island,
  width: 216,
  shape: new Polygon([vec2(0, -50), vec2(90, 10), vec2(-80, 5)]) as Shape,
  droppable: vec2(0, -12),
  multiplier: {
    cooldown: 1,
    damage: 1,
    health: 1.5,
    lifespan: 1.5,
    scale: 1,
    speed: 1,
  },
}

export const yellowstone = {
  sprite: Sprite.Yellowstone,
  width: 200,
  shape: new Polygon([vec2(-15, -50), vec2(90, 30), vec2(-80, 30)]) as Shape,
  droppable: vec2(-16, -5),
  multiplier: {
    cooldown: 0.5,
    damage: 1,
    health: 1,
    lifespan: 1,
    scale: 0.75,
    speed: 1.5,
  },
}
