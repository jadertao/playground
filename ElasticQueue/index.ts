import { Subject, interval, merge, Subscription, Observable } from "rxjs";
import { bufferCount, bufferWhen, filter } from "rxjs/operators";

export class ElasticQueue<T> {
  private source$ = new Subject<T>();
  private queue$: Observable<Array<T>>;
  private subscriptions: Array<Subscription> = [];

  constructor(time: number = 1000, batch: number = 100) {

    const timer$ = interval(time);
    const count$ = this.source$.pipe(bufferCount(batch));
    const trigger$ = merge(timer$, count$);

    this.queue$ = this.source$.pipe(
      bufferWhen(() => trigger$),
      filter(v => v.length !== 0),
    );

  }
  push(value: T) {
    this.source$.next(value);
  }

  onPush(fn: (values: Array<T>) => void): number {
    this.subscriptions.push(this.queue$.subscribe(fn));
    return this.subscriptions.length;
  }

  disconnect(id: number): void {
    this.subscriptions[id].unsubscribe();
  }
}