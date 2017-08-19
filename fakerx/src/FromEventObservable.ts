import Observable from './Observable'
import Subject from './Subject'
import Subscription from './Subscription'
type Observer = any

class FromEventObservable {
  private source: Observable
  private subject: Subject

  constructor(source: Observable, subject: Subject) {
    this.source = source
    this.subject = subject
  }
  public subscribe(observer: Observer) {
    const type = Object.prototype.toString.call(observer).toLowerCase().slice(8, -1)
    observer = type === 'function' ? observer : observer.next
    this.subject.observers.push(observer)
  }
  public connect() {
    this.source.sourceObj.addEventListener(this.source.eventName, this.subjectFactory)
    return new Subscription(this.source.sourceObj, this.source.eventName, this.subjectFactory)
  }
  public subjectFactory = (v: any) => {
    this.subject.next(v)
  }
}
export default FromEventObservable