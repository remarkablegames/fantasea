import { goblin, guard, island } from '.'

type Level = (typeof levels)[0]
export type Base = Level['bases'][0]
export type Enemy = Level['enemies'][0]['enemy']
export type Hero = Level['heroes'][0]

export const levels = [
  // 0
  {
    enemies: [
      {
        total: 10,
        enemy: {
          ...goblin,
          damage: 1,
          get speed() {
            return randi(50, 60)
          },
          health: 1,
        },
        timer: {
          wait: 3,
          interval: 5,
        },
      },
    ],
    heroes: [
      {
        hero: guard,
        timer: {
          wait: 1,
          interval: 3,
        },
      },
    ],
    bases: [
      {
        ...island,
        pos: center(),
      },
    ],
  },
]
