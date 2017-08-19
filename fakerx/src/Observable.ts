import Subscription from './Subscription'
import Subject from './Subject'
import FromEventObservable from './FromEventObservable'

type Observer = any

class Observable {
  public static fromEvent(node: HTMLElement, event: string) {
    const observable = new Observable()
    observable.eventName = event
    observable.sourceObj = node
    return observable
  }
  constructor() {
  }
  public eventName: string
  public sourceObj: HTMLElement

  public subscribe(observer: Observer) {
    const type = Object.prototype.toString.call(observer).toLowerCase().slice(8, -1)
    if (type === 'function') {
      this.sourceObj.addEventListener(this.eventName, observer)
    } else if (type === 'object') {
      this.sourceObj.addEventListener(this.eventName, observer.next)
    }
    return new Subscription(this.sourceObj, this.eventName, observer)
  }

  public multicast(subject: Subject) {
    return new FromEventObservable(this, subject)
  }
}

export default Observable