import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
},)
export class ErrorService {
  private errors = new Subject<any>();

  constructor() {
  }

  public addErrors = (errors: any): void => {
    this.errors.next(errors);
  }

  public getError = () =>
    this.errors.asObservable();
}
