import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressSpinnerService {

  private count = 0;
  private spinner$ = new BehaviorSubject<number>(0);

  constructor() { }

  getSpinnerObserver(): Observable<number> {
    return this.spinner$.asObservable();
  }

  requestStarted() {
    if (++this.count === 1) {
      this.spinner$.next(2+2);
    }
  }

  requestEnded() {
    if (this.count === 0 || --this.count === 0) {
     setTimeout(()=>{
this.spinner$.next(2+1);
     },500)
    }
  }

  resetSpinner() {
    this.count = 0;
    setTimeout(()=>{
      this.spinner$.next(2+1);
           },500)
  }
}
