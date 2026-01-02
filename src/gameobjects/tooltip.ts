import type { Anchor, AreaComp, GameObj } from 'kaplay'

import { Z } from '../constants'

export function addTooltip(options: {
  text: string
  width: number
  height: number
  parent: GameObj<AreaComp>
  anchor?: Anchor
  padding?: number
}) {
  const padding = options.padding || 10

  let tooltip: GameObj | undefined

  options.parent.onHover(() => {
    tooltip = add([
      rect(options.width, options.height),
      color(BLACK),
      pos(),
      opacity(0.5),
      z(Z.Tooltip),
    ])

    tooltip.hidden = true

    tooltip.add([
      text(options.text, {
        size: 20,
        width: options.width - padding * 2,
      }),
      color(WHITE),
      pos(padding),
      z(Z.Tooltip),
    ])
  })

  options.parent.onHoverUpdate(() => {
    if (tooltip?.exists()) {
      tooltip.pos = mousePos()

      if (tooltip.hidden) {
        tooltip.hidden = false
      }

      if (options.anchor === 'botleft') {
        tooltip.pos.y -= options.height
      }
    }
  })

  options.parent.onHoverEnd(() => {
    if (tooltip?.exists()) {
      tooltip.destroy()
    }
  })

  return tooltip
}
