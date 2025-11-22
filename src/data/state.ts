const key = 'remarkablegames.fantasea'

class State {
  tempData = {
    enemiesTotal: 0,
  }

  private persistData = {
    level: 0,
    ...JSON.parse(getData(key)!),
  }

  private save() {
    setData(key, JSON.stringify(this.persistData))
  }

  get level() {
    return this.persistData.level
  }

  set level(level: number) {
    this.persistData.level = level
    this.save()
  }
}

export const state = new State()
