import type { Vec2 } from 'kaplay'

import { Sound } from '../constants'

export function addButton({
  height = 80,
  label,
  onClick,
  position = vec2(),
  radius = 8,
  size,
  width = 300,
  zIndex = 0,
}: {
  height?: number
  label: string
  onClick?: () => void
  radius?: number
  size?: number
  width?: number
  zIndex?: number
  position?: Vec2
}) {
  const button = add([
    anchor('center'),
    area(),
    color(),
    opacity(0.8),
    outline(4),
    pos(position),
    rect(width, height, { radius }),
    scale(),
    z(zIndex),
  ])

  button.add([text(label, { size }), anchor('center'), color(BLACK), z(zIndex)])

  button.onHover(() => {
    setCursor('pointer')
    play(Sound.Hover, { volume: 0.5 })
  })

  button.onHoverUpdate(() => {
    const t = time() * 10
    button.color = hsl2rgb((t / 10) % 1, 0.6, 0.7)
    button.scale = vec2(1.05)
  })

  button.onHoverEnd(() => {
    setCursor('default')
    button.color = WHITE
    button.scaleTo(1)
  })

  if (typeof onClick === 'function') {
    button.onClick(() => {
      play(Sound.Click)
      onClick()
    })
  }

  return button
}
