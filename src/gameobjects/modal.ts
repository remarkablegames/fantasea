import { Z } from '../constants'

export function addModal() {
  const modal = add([
    rect(width(), height()),
    color(BLACK),
    opacity(0.5),
    z(Z.Modal),
  ])

  return modal
}
