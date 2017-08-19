class Subscription {
  private sourceObj: HTMLElement
  private eventHandler: any
  private eventName: string

  constructor(sourceObj: HTMLElement, eventName: string, eventHandler: any) {
    this.sourceObj = sourceObj
    this.eventName = eventName
    this.eventHandler = eventHandler
  }
  public unsubscibe() {
    this.sourceObj.removeEventListener(this.eventName, this.eventHandler)
  }
}

export default Subscription