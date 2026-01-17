import {
  archer,
  blackrock,
  goblin,
  guard,
  island,
  orc,
  slime,
  witch,
  yellowstone,
} from '.'

type Level = (typeof levels)[0]
export type Base = Level['bases'][0]
export type Enemies = Level['enemies']
export type Enemy = Enemies[0]['enemy']
export type Hero = Level['heroes'][0]

export const levels = [
  // start

  // 1
  {
    hint: {
      text: 'Drag and drop the hero (bottom) to your base (center) and press "Start"',
      width: 400,
      height: 80,
    },
    heroes: [guard],
    bases: [
      {
        ...island,
        health: 3,
        get pos() {
          return center()
        },
      },
    ],
    enemies: [
      {
        total: 3,
        enemy: {
          ...slime,
          health: 1,
          get speed() {
            return randi(80, 100)
          },
        },
        timer: {
          wait: 0,
          interval: 2,
        },
      },
    ],
  },

  // 2
  {
    hint: {
      text: 'You can attach the same hero to multiple bases',
      width: 400,
      height: 60,
    },
    heroes: [guard],
    bases: [
      {
        ...island,
        health: 3,
        get pos() {
          return center().sub(0, 100)
        },
      },
      {
        ...island,
        health: 3,
        get pos() {
          return center().add(0, 100)
        },
      },
    ],
    enemies: [
      {
        total: 8,
        enemy: {
          ...slime,
          health: 1,
          get speed() {
            return randi(80, 100)
          },
        },
        timer: {
          wait: 0,
          interval: 2,
        },
      },
    ],
  },

  // 3
  {
    hint: {
      text: "Each hero's attack is different",
      width: 400,
      height: 40,
    },
    heroes: [guard, witch],
    bases: [
      {
        ...island,
        health: 3,
        get pos() {
          return center().sub(200, 0)
        },
      },
      {
        ...island,
        health: 3,
        get pos() {
          return center().add(200, 0)
        },
      },
    ],
    enemies: [
      {
        total: 6,
        enemy: {
          ...slime,
          health: 1,
          get speed() {
            return randi(80, 100)
          },
        },
        timer: {
          wait: 0,
          interval: 2,
        },
      },
      {
        total: 2,
        enemy: {
          ...goblin,
          health: 2,
          get speed() {
            return randi(100, 120)
          },
        },
        timer: {
          wait: 3,
          interval: 0,
        },
      },
    ],
  },

  // 4
  {
    hint: {
      text: 'Hover over your base to see its multiplier effects',
      width: 400,
      height: 60,
    },
    heroes: [guard, witch],
    bases: [
      {
        ...island,
        health: 3,
        get pos() {
          return center().sub(150, -100)
        },
      },
      {
        ...blackrock,
        health: 3,
        get pos() {
          return center().sub(0, 100)
        },
      },
      {
        ...yellowstone,
        health: 3,
        get pos() {
          return center().add(150, 100)
        },
      },
    ],
    enemies: [
      {
        total: 5,
        enemy: {
          ...slime,
          health: 1,
          get speed() {
            return randi(80, 100)
          },
        },
        timer: {
          wait: 0,
          interval: 2,
        },
      },
      {
        total: 5,
        enemy: {
          ...goblin,
          health: 2,
          get speed() {
            return randi(100, 120)
          },
        },
        timer: {
          wait: 3,
          interval: 0,
        },
      },
    ],
  },

  // 5
  {
    hint: {
      text: 'Come up with strategies to defeat the enemies',
      width: 350,
      height: 60,
    },
    heroes: [guard, witch, archer],
    bases: [
      {
        ...island,
        health: 3,
        get pos() {
          return center().add(-150)
        },
      },
      {
        ...blackrock,
        health: 3,
        get pos() {
          return center().add(150, -150)
        },
      },
      {
        ...yellowstone,
        health: 3,
        get pos() {
          return center().add(-150, 150)
        },
      },
      {
        ...island,
        health: 3,
        get pos() {
          return center().add(150)
        },
      },
    ],
    enemies: [
      {
        total: 5,
        enemy: {
          ...slime,
          health: 1,
          get speed() {
            return randi(80, 100)
          },
        },
        timer: {
          wait: 0,
          interval: 3,
        },
      },
      {
        total: 5,
        enemy: {
          ...goblin,
          health: 2,
          get speed() {
            return randi(100, 120)
          },
        },
        timer: {
          wait: 3,
          interval: 3,
        },
      },
      {
        total: 1,
        enemy: {
          ...orc,
          health: 5,
          get speed() {
            return randi(80, 100)
          },
        },
        timer: {
          wait: 6,
          interval: 5,
        },
      },
    ],
  },

  // 6
  {
    hint: {
      text: 'Protect the president',
      width: 280,
      height: 40,
    },
    heroes: [guard, witch, archer],
    bases: [
      {
        ...island,
        health: 3,
        get pos() {
          return center().sub(200)
        },
      },
      {
        ...blackrock,
        health: 3,
        get pos() {
          return center().add(200, -200)
        },
      },
      {
        ...island,
        health: 3,
        get pos() {
          return center()
        },
      },
      {
        ...yellowstone,
        health: 3,
        get pos() {
          return center().add(-200, 200)
        },
      },
      {
        ...island,
        health: 3,
        get pos() {
          return center().add(200)
        },
      },
    ],
    enemies: [
      {
        total: 5,
        enemy: {
          ...slime,
          health: 1,
          get speed() {
            return randi(80, 100)
          },
        },
        timer: {
          wait: 0,
          interval: 3,
        },
      },
      {
        total: 5,
        enemy: {
          ...goblin,
          health: 2,
          get speed() {
            return randi(100, 120)
          },
        },
        timer: {
          wait: 3,
          interval: 3,
        },
      },
      {
        total: 2,
        enemy: {
          ...orc,
          health: 5,
          get speed() {
            return randi(80, 100)
          },
        },
        timer: {
          wait: 6,
          interval: 5,
        },
      },
    ],
  },

  // 7
  {
    hint: {
      text: 'Survive the horde',
      width: 230,
      height: 40,
    },
    heroes: [archer],
    bases: [
      {
        ...yellowstone,
        health: 20,
        get pos() {
          return center()
        },
      },
    ],
    enemies: [
      {
        total: 10,
        enemy: {
          ...slime,
          get speed() {
            return randi(80, 100)
          },
          health: 1,
        },
        timer: {
          wait: 0,
          interval: 0,
        },
      },
      {
        total: 5,
        enemy: {
          ...slime,
          health: 1,
          get speed() {
            return randi(80, 100)
          },
        },
        timer: {
          wait: 3,
          interval: 3,
        },
      },
      {
        total: 10,
        enemy: {
          ...goblin,
          health: 2,
          get speed() {
            return randi(100, 120)
          },
        },
        timer: {
          wait: 5,
          interval: 2,
        },
      },
    ],
  },

  // 8
  {
    hint: {
      text: 'Watch out for fast enemies',
      width: 340,
      height: 40,
    },
    heroes: [guard, witch, archer],
    bases: [
      {
        ...yellowstone,
        health: 6,
        get pos() {
          return center().sub(0, 100)
        },
      },
      {
        ...blackrock,
        health: 6,
        get pos() {
          return center().add(0, 100)
        },
      },
    ],
    enemies: [
      {
        total: 10,
        enemy: {
          ...slime,
          health: 1,
          get speed() {
            return randi(160, 180)
          },
        },
        timer: {
          wait: 1,
          interval: 2,
        },
      },
      {
        total: 5,
        enemy: {
          ...slime,
          health: 1,
          get speed() {
            return randi(80, 100)
          },
        },
        timer: {
          wait: 0,
          interval: 1,
        },
      },
      {
        total: 5,
        enemy: {
          ...goblin,
          health: 2,
          get speed() {
            return randi(100, 120)
          },
        },
        timer: {
          wait: 5,
          interval: 2,
        },
      },
    ],
  },

  // 9
  {
    hint: {
      text: 'Some enemies have high health and damage',
      width: 400,
      height: 60,
    },
    heroes: [guard, witch, archer],
    bases: [
      {
        ...yellowstone,
        health: 5,
        get pos() {
          return center().sub(0, 100)
        },
      },
      {
        ...blackrock,
        health: 5,
        get pos() {
          return center().add(0, 100)
        },
      },
      {
        ...island,
        health: 5,
        get pos() {
          return center().sub(250, 0)
        },
      },
      {
        ...island,
        health: 5,
        get pos() {
          return center().add(250, 0)
        },
      },
    ],
    enemies: [
      {
        total: 15,
        enemy: {
          ...slime,
          health: 1,
          get speed() {
            return randi(80, 100)
          },
        },
        timer: {
          wait: 0,
          interval: 1,
        },
      },
      {
        total: 3,
        enemy: {
          ...goblin,
          health: 5,
          scale: 1.5,
          get speed() {
            return randi(60, 80)
          },
        },
        timer: {
          wait: 3,
          interval: 3,
        },
      },
      {
        total: 3,
        enemy: {
          ...orc,
          health: 5,
          scale: 2,
          get speed() {
            return randi(40, 60)
          },
        },
        timer: {
          wait: 6,
          interval: 3,
        },
      },
    ],
  },

  // 10
  {
    hint: {
      text: 'Defeat the boss',
      width: 200,
      height: 40,
    },
    heroes: [guard, witch, archer],
    bases: [
      {
        ...blackrock,
        health: 5,
        get pos() {
          return center().sub(0, 200)
        },
      },
      {
        ...blackrock,
        health: 5,
        get pos() {
          return center().add(0, 200)
        },
      },
      {
        ...yellowstone,
        health: 5,
        get pos() {
          return center().sub(300, 0)
        },
      },
      {
        ...yellowstone,
        health: 5,
        get pos() {
          return center().add(300, 0)
        },
      },
      {
        ...island,
        health: 10,
        get pos() {
          return center()
        },
      },
    ],
    enemies: [
      {
        total: 30,
        enemy: {
          ...slime,
          health: 1,
          get speed() {
            return randi(80, 100)
          },
        },
        timer: {
          wait: 0,
          interval: 1,
        },
      },
      {
        total: 5,
        enemy: {
          ...goblin,
          health: 3,
          scale: 1.5,
          get speed() {
            return randi(60, 80)
          },
        },
        timer: {
          wait: 3,
          interval: 3,
        },
      },
      {
        total: 1,
        enemy: {
          ...orc,
          health: 25,
          scale: 4,
          get speed() {
            return randi(10, 20)
          },
        },
        timer: {
          wait: 6,
          interval: 0,
        },
      },
    ],
  },

  // end
]
