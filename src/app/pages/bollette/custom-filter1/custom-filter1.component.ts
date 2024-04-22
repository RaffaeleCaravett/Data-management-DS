import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { DefaultFilter } from 'ng2-smart-table';

@Component({
  template: `
  <input nbInput
  placeholder="Data scadenza"
  [nbDatepicker]="formpicker"
  [ngClass]="{'form-control ng-untouched ng-pristine ng-valid': true}">
<nb-datepicker #formpicker
format="dd/MM/yyyy"></nb-datepicker>
  `,
})
export class CustomFilter1Component extends DefaultFilter implements OnInit, OnChanges {
  inputControl = new FormControl();

  constructor() {
    super();
  }

  ngOnInit() {
    this.inputControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(this.delay),
      )
      .subscribe((value: number) => {
        this.query = value !== null ? this.inputControl.value.toString() : '';
        this.setFilter();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.query) {
      this.query = changes.query.currentValue;
      this.inputControl.setValue(this.query);
    }
  }
}