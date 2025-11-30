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
    heroes: [guard],
    bases: [
      {
        ...island,
        health: 3,
        pos: center(),
      },
    ],
    enemies: [
      {
        total: 3,
        enemy: {
          ...slime,
          damage: 1,
          get speed() {
            return randi(80, 100)
          },
          health: 1,
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
    heroes: [guard],
    bases: [
      {
        ...island,
        health: 3,
        pos: center().sub(0, 100),
      },
      {
        ...island,
        health: 3,
        pos: center().add(0, 100),
      },
    ],
    enemies: [
      {
        total: 8,
        enemy: {
          ...slime,
          damage: 1,
          get speed() {
            return randi(80, 100)
          },
          health: 1,
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
    heroes: [guard, witch],
    bases: [
      {
        ...island,
        health: 3,
        pos: center().sub(200, 0),
      },
      {
        ...island,
        health: 3,
        pos: center().add(200, 0),
      },
    ],
    enemies: [
      {
        total: 6,
        enemy: {
          ...slime,
          damage: 1,
          get speed() {
            return randi(80, 100)
          },
          health: 1,
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
          damage: 2,
          get speed() {
            return randi(100, 120)
          },
          health: 2,
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
    heroes: [guard, witch],
    bases: [
      {
        ...island,
        health: 3,
        pos: center().sub(150, -100),
      },
      {
        ...blackrock,
        health: 3,
        pos: center().sub(0, 100),
      },
      {
        ...yellowstone,
        health: 3,
        pos: center().add(150, 100),
      },
    ],
    enemies: [
      {
        total: 5,
        enemy: {
          ...slime,
          damage: 1,
          get speed() {
            return randi(80, 100)
          },
          health: 1,
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
          damage: 2,
          get speed() {
            return randi(100, 120)
          },
          health: 2,
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
    heroes: [guard, witch, archer],
    bases: [
      {
        ...island,
        health: 3,
        pos: center().add(-150),
      },
      {
        ...blackrock,
        health: 3,
        pos: center().add(150, -150),
      },
      {
        ...yellowstone,
        health: 3,
        pos: center().add(-150, 150),
      },
      {
        ...island,
        health: 3,
        pos: center().add(150),
      },
    ],
    enemies: [
      {
        total: 5,
        enemy: {
          ...slime,
          damage: 1,
          get speed() {
            return randi(80, 100)
          },
          health: 1,
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
          damage: 2,
          get speed() {
            return randi(100, 120)
          },
          health: 2,
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
          damage: 3,
          get speed() {
            return randi(80, 100)
          },
          health: 5,
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
    heroes: [guard, witch, archer],
    bases: [
      {
        ...island,
        health: 3,
        pos: center().sub(200),
      },
      {
        ...blackrock,
        health: 3,
        pos: center().add(200, -200),
      },
      {
        ...island,
        health: 3,
        pos: center(),
      },
      {
        ...yellowstone,
        health: 3,
        pos: center().add(-200, 200),
      },
      {
        ...island,
        health: 3,
        pos: center().add(200),
      },
    ],
    enemies: [
      {
        total: 5,
        enemy: {
          ...slime,
          damage: 1,
          get speed() {
            return randi(80, 100)
          },
          health: 1,
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
          damage: 2,
          get speed() {
            return randi(100, 120)
          },
          health: 2,
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
          damage: 3,
          get speed() {
            return randi(80, 100)
          },
          health: 5,
        },
        timer: {
          wait: 6,
          interval: 5,
        },
      },
    ],
  },

  // end
]
