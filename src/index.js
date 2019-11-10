import exia from 'exia'

class ExiaEvent {
  constructor() {
    this.events = new Map()
    this.maxListener = 10
  }

  on = (eventName, fn) => {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, [])
    }

    const handlers = this.events.get(eventName)

    if (handlers.length >= this.maxListener) {
      console.error(`Too much has bind on ${eventName}.`)
    } else {
      this.events.set(eventName, handlers.push(fn))
    }

    return this
  }

  emit = (eventName, ...args) => {
    if (!this.hasOwnEvent(eventName)) {
      return this
    }

    const handlers = this.events.get(eventName)

    handlers.forEach((handler) => {
      if (args.length < 3) {
        handler.call(this, ...args)
      } else {
        handler.apply(this, args)
      }
    })

    return this
  }

  remove = (eventName, fn) => {
    if (!this.hasOwnEvent(eventName)) {
      return this
    }

    const handlers = this.events.get(eventName)

    const deletePosition = handlers.findIndex((handler) => handler === fn)
    if (deletePosition !== -1) {
      handlers.splice(deletePosition, 1)
      this.events.set(handlers)
    }

    return this
  }

  removeAll = (eventName) => {
    if (!this.hasOwnEvent(eventName)) {
      return this
    }

    return this.events.delete(eventName)
  }

  hasOwnEvent = (eventName) => {
    const isHas = this.events.has(eventName)
    if (!isHas) {
      console.error(`Has not bind ${eventName}.`)
    }
    return isHas
  }
}

exia.event = new ExiaEvent()

export default exia.event

