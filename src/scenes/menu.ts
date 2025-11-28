import { Music, Scene, Sprite } from '../constants'
import { addButton } from '../gameobjects'

scene(Scene.Menu, () => {
  const colors = ['#8465ec', '#873e84', '#c97373', '#5ba675']
  const tileSize = 100 // sprite height
  const tilesSpeed = 60 // px per second
  let tilesOffset = 0 // current offset over time

  onDraw(() => {
    lerpBackgroundColor(colors)

    // Update tiles offset each frame before drawing the pattern
    // Modulo (%) wraps tileOffset to be between 0 and tileSize,
    // instead of increasing number yet keeping smooth loop
    tilesOffset = (tilesOffset + tilesSpeed * dt()) % tileSize
    drawPattern()
  })

  // Loops BGs[] smoothly using lerp and modulo (%) to wrap from last to first
  // over time, used in onDraw()
  function lerpBackgroundColor(colors: string[], speed = 0.3) {
    const t = time() * speed
    const i = Math.floor(t) % colors.length
    setBackground(
      lerp(
        rgb(colors[i]),
        rgb(colors[(i + 1) % colors.length]),
        t % 1, // normalized progress between each color index
      ),
    )
  }

  // Draws background pattern, used in onDraw()
  function drawPattern() {
    // Create rows/cols slightly larger than screen for seamless pattern scrolling
    for (let y = -tileSize; y < Math.ceil(height() / tileSize) + 2; y++) {
      for (let x = -tileSize; x < Math.ceil(width() / tileSize) + 2; x++) {
        // Draw tile only in even cells
        if ((x + y) % 2 == 0) {
          drawSprite({
            sprite: Sprite.Lifebuoy,
            anchor: 'center',
            height: tileSize,
            // Set pos of tile in grid cell of tileSize
            // Apply offset, wrapped to [0, tileSize] using modulo (%)
            pos: vec2(
              x * tileSize - (tilesOffset % tileSize), // negative scrolls left
              y * tileSize + (tilesOffset % tileSize), // positive scrolls down
            ),
            // color: BLACK,
            opacity: 0.1,
          })
        }
      }
    }
  }

  const { x, y } = center()

  add([sprite(Sprite.Menu), anchor('center'), pos(x, y)])

  addButton({
    label: 'Play',
    size: 36,
    width: 200,
    height: 60,
    comps: [pos(x, y + 190)],
    onClick() {
      const music = play(Music.Theme, { loop: true })
      music.volume = 0.6
      go(Scene.Game)
    },
  })
})
