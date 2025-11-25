import type { Comp } from 'kaplay'

export function addButton({
  comps = [],
  height = 80,
  label,
  onClick,
  radius = 8,
  size,
  width = 300,
  zIndex = 0,
}: {
  comps?: Comp[]
  height?: number
  label: string
  onClick?: () => void
  radius?: number
  size?: number
  width?: number
  zIndex?: number
}) {
  const button = add([
    rect(width, height, { radius }),
    area(),
    scale(1),
    anchor('center'),
    outline(4),
    color(),
    opacity(0.8),
    z(zIndex),
    ...comps,
  ])

  button.add([text(label, { size }), anchor('center'), color(BLACK), z(zIndex)])

  button.onHoverUpdate(() => {
    const t = time() * 10
    button.color = hsl2rgb((t / 10) % 1, 0.6, 0.7)
    button.scale = vec2(1.05)
    setCursor('pointer')
  })

  button.onHoverEnd(() => {
    setCursor('default')
    button.scale = vec2(1)
    button.color = rgb()
  })

  if (typeof onClick === 'function') {
    button.onClick(() => {
      setCursor('default')
      onClick()
    })
  }

  return button
}
