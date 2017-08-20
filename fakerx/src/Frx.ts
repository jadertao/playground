import Observable from './Observable'
import Subject from './Subject'
declare global {
  interface Window {
    Frx: any
  }
}

const Frx = {
  Observable,
  Subject
}
window.Frx = Frx