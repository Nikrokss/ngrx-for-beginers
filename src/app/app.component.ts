import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  counter = 0;
  updatedAt?: number;

  //геттер это свойство при обращении к которому будет вызывать соответствующие функции
  get cannotDecrease(): boolean {
    return this.counter <= 0;
  }

  increase(): void {
    this.updatedAt = Date.now();
    this.counter++;
  }

  decrease(): void {
    this.updatedAt = Date.now();
    this.counter--;
  }

  clear(): void {
    this.updatedAt = Date.now();
    this.counter = 0;
  }
}
