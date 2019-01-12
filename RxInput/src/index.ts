import { fromEvent, interval, of } from 'rxjs';
import { throttleTime, pluck, take, concatMap, filter, tap, switchMap } from 'rxjs/operators';

// mock api
const get = (v: any) => interval(Math.random() * 1000 + 500)
  .pipe(
    take(1),
    concatMap(_ => of(v + ' - result'))
  )

const target = document.querySelector('#target')

// type guard
if (target) {
  fromEvent(target, 'keyup').pipe(
    // throttle
    throttleTime(500),
    // map value
    pluck<{}, string>('target', 'value'),
    // side effect logging
    tap(v => console.log(v)),
    // filter
    filter(v => v !== ''),
    // cancelable request
    switchMap(v => {
      if (v.length <= 30) {
        return get(v)
      } else {
        return of('do')
      }
    })
  ).subscribe((v: any) => console.log(v))
}


