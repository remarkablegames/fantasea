import type { BaseMultiplier } from '../data'

export const getMultiplierText = (multiplier: BaseMultiplier) =>
  `Cooldown: ×${multiplier.cooldown.toFixed(2)}
Damage: ×${multiplier.damage.toFixed(2)}
Penetration: ×${multiplier.health.toFixed(2)}
Duration: ×${multiplier.lifespan.toFixed(2)}
Size: ×${multiplier.scale.toFixed(2)}
Speed: ×${multiplier.speed.toFixed(2)}`
