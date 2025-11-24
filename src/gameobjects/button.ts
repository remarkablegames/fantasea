import type { Comp } from 'kaplay'

export function addButton({
  label,
  comps = [],
  width = 300,
  height = 80,
  radius = 8,
  size,
  onClick,
}: {
  label: string
  comps?: Comp[]
  width?: number
  height?: number
  radius?: number
  size?: number
  onClick?: () => void
}) {
  const button = add([
    rect(width, height, { radius }),
    area(),
    scale(1),
    anchor('center'),
    outline(4),
    color(),
    opacity(0.8),
    ...comps,
  ])

  button.add([text(label, { size }), anchor('center'), color(BLACK)])

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
