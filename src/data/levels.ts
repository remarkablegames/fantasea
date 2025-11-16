import { goblin } from '.'

export type Enemy = (typeof levels)[0]['enemies'][0]['enemy']

export const levels = [
  // 1
  {
    enemies: [
      {
        total: 10,
        enemy: {
          ...goblin,
          damage: 5,
          get speed() {
            return randi(50, 100)
          },
          health: 10,
        },
        timer: {
          wait: 3,
          interval: 5,
        },
      },
    ],
  },
]
