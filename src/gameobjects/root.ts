import { Tag } from '../constants'

type Root = ReturnType<typeof addRoot>

export function addRoot() {
  const root = add([timer(), Tag.Root])

  return root
}

export function getRoot() {
  const root = get(Tag.Root)[0] as Root

  return root
}
