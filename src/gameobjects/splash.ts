import type { SpriteData, Vec2 } from 'kaplay'

import { Sprite } from '../constants'

let particleSpriteData: SpriteData

export type Splash = ReturnType<typeof addSplash>

export function addSplash(position: Vec2, direction: Vec2) {
  particleSpriteData = particleSpriteData || getSprite(Sprite.Particle)!.data!

  const splash = add([
    pos(position),
    particles(
      {
        max: 20,
        speed: [200, 250],
        lifeTime: [0.2, 0.75],
        colors: [WHITE],
        opacities: [1.0, 0.0],
        angle: [0, 360],
        texture: particleSpriteData.tex,
        quads: [particleSpriteData.frames[0]],
      },
      {
        lifetime: 0.75,
        rate: 0,
        direction: direction.scale(-1).angle(),
        spread: 45,
        position,
      },
    ),
  ])

  splash.emit(10)
  splash.onEnd(() => splash.destroy())

  return splash
}
