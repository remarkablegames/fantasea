import type { GameObj, HealthComp, PosComp, SpriteComp } from 'kaplay'

const HEIGHT = 5

export type Health = ReturnType<typeof addHealth>

export function addHealth(
  gameObject: GameObj<HealthComp | PosComp | SpriteComp>,
) {
  const background = gameObject.add([rect(0, HEIGHT), pos(), color(0, 0, 0)])
  const health = background.add([rect(0, HEIGHT), pos(), color(255, 0, 0)])

  const backgroundEvent = background.onUpdate(() => {
    if (gameObject.width) {
      background.width = gameObject.width
      health.width = gameObject.width
      background.pos.x = -gameObject.width / 2
      background.pos.y = -gameObject.height / 2 - 8
      backgroundEvent.cancel()
    }
  })

  function updateHealth() {
    if (gameObject.width) {
      health.width = (gameObject.hp / gameObject.maxHP) * gameObject.width
    }
  }

  gameObject.onHurt(updateHealth)
  gameObject.onHeal(updateHealth)

  return health
}
