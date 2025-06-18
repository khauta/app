import { Direction, Directionality } from '@angular/cdk/bidi';
import { EventEmitter, Injectable, OnDestroy, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppDirectionality extends Directionality implements OnDestroy {
  valueSignal: WritableSignal<Direction> = signal<Direction>('ltr');

  readonly change = new EventEmitter<Direction>();

  get value(): Direction {
    return this.valueSignal();
  }

  set value(val: Direction) {
    if (this.valueSignal() !== val) {
      this.valueSignal.set(val);
      this.change.next(val);
    }
  }

  ngOnDestroy() {
    this.change.complete();
  }
}