import { Sprite } from '../constants'
import type { BaseMultiplier, Enemies } from '../data'

const key = 'remarkablegames.fantasea'

class State {
  temp = {
    basesTotal: 0,
    enemies: [] as (Pick<Enemies[0], 'total' | 'timer'> & { sprite: Sprite })[],
    enemiesKilled: 0,
    enemiesTotal: 0,
    start: false,
  }

  private init() {
    return {
      level: 0,

      multiplier: [
        Sprite.Archer,
        Sprite.Blackrock,
        Sprite.Guard,
        Sprite.Island,
        Sprite.Witch,
        Sprite.Yellowstone,
      ].reduce(
        (multiplier, sprite) => {
          multiplier[sprite] = {
            cooldown: 1,
            damage: 1,
            health: 1,
            lifespan: 1,
            scale: 1,
            speed: 1,
          }

          return multiplier
        },
        {} as Record<Sprite, BaseMultiplier>,
      ),
    }
  }

  private persist: ReturnType<typeof this.init> = {
    ...this.init(),
    ...JSON.parse(getData(key)!),
  }

  private save() {
    setData(key, JSON.stringify(this.persist))
  }

  get level() {
    return this.persist.level
  }

  set level(level) {
    if (level === 0) {
      this.persist = this.init()
    } else {
      this.persist.level = level
    }
    this.save()
  }

  get multiplier() {
    return this.persist.multiplier
  }

  set multiplier(data) {
    Object.entries(data).forEach(([sprite, multiplier]) => {
      Object.entries(multiplier).forEach(([key, value]) => {
        this.persist.multiplier[sprite as Sprite][
          key as keyof BaseMultiplier
        ] *= value
      })
    })
    this.save()
  }
}

export const state = new State()
