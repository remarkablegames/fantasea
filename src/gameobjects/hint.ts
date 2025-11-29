import { Tag } from '../constants'
import { state } from '../data'

const hints = [
  // 0
  {
    text: 'Drag and drop the hero (bottom) to the island (center) and press "Start"',
    width: 400,
    height: 100,
  },
]

export function addHint() {
  const hint = hints[state.level]

  if (!hint) {
    return
  }

  const box = add([
    rect(hint.width, hint.height),
    anchor('center'),
    color(BLACK),
    opacity(0.3),
    pos(215, 190),
    Tag.Hint,
  ])

  box.add([
    text(hint.text, {
      align: 'center',
      size: 20,
      width: hint.width,
    }),
    anchor('center'),
    color(WHITE),
  ])
}

export function getHint() {
  return get(Tag.Hint)[0]
}
