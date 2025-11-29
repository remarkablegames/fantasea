import { Anim, Music, Scene, Sound, Sprite } from '../constants'

scene(Scene.Preload, () => {
  Object.values(Sprite).forEach((sprite) => {
    switch (sprite) {
      case Sprite.Sword:
        loadSprite(sprite, `sprites/${sprite}.png`, {
          // Define how the spritesheet is sliced (e.g., 4 columns, 1 row)
          sliceX: 3,
          sliceY: 1,
          anims: {
            // "idle" animation: frames 0 to 0 (single frame)
            [Anim.Idle]: { from: 0, to: 0 },
            // "attack" animation: frames 0 to 2, looping
            [Anim.Attack]: { from: 0, to: 2, loop: true, speed: 10 },
          },
        })
        break

      default:
        loadSprite(sprite, `sprites/${sprite}.png`)
        break
    }
  })

  Object.values(Sound).forEach((sound) => {
    loadSound(sound, `sounds/${sound}.mp3`)
  })

  Object.values(Music).forEach((music) => {
    loadMusic(music, `music/${music}.mp3`)
  })

  go(Scene.Menu)
})
