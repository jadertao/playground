import Observable from './Observable'
import Subject from './Subject'
declare global {
  interface Window {
    Rx: any
  }
}

const Rx = {
  Observable,
  Subject
}
window.Rx = Rx