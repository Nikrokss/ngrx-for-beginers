import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {increase, decrease, clear, countSelector, updatedAtSelector} from "./reducers/counter";
import {map} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // обзервбл, получаем подписчик на хранилище
  count$ = this.store.select(countSelector);
  cannotDecrease$ = this.count$.pipe(map(count => count <= 0));
  updatedAt$ = this.store.select(updatedAtSelector);

  constructor(private store: Store) {}

  //геттер это свойство при обращении к которому будет вызывать соответствующие функции
  // get cannotDecrease(): boolean {
  //   // return this.counter <= 0;
  //   return false;
  // }

  increase(): void {
    // this.updatedAt = Date.now();
    // this.counter++;
    this.store.dispatch(increase());
  }

  decrease(): void {
    // this.updatedAt = Date.now();
    // this.counter--;
    this.store.dispatch(decrease());
  }

  clear(): void {
    // this.updatedAt = Date.now();
    // this.counter = 0;
    this.store.dispatch(clear());
  }
}
