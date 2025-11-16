export function generateEnemyPos() {
  const OFFSET = 0
  let x = 0
  let y = 0

  if (randi()) {
    x = randi() ? -OFFSET : width() + OFFSET
    y = rand(0, height())
  } else {
    x = rand(0, width())
    y = randi() ? -OFFSET : height() + OFFSET
  }

  return vec2(x, y)
}
