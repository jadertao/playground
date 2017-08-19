type Observer = any
class Subject {
  public observers: Array<Observer> = []
  constructor() { }
  public next = (v: any) => { this.observers.forEach(observer => observer(v)) }
  public complete = (v: any) => { this.observers.forEach(observer => observer(v)) }
  public error = (v: any) => { this.observers.forEach(observer => observer(v)) }
}
export default Subject