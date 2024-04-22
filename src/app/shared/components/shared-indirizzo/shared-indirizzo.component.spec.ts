import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedIndirizzoComponent } from './shared-indirizzo.component';

describe('SharedIndirizzoComponent', () => {
  let component: SharedIndirizzoComponent;
  let fixture: ComponentFixture<SharedIndirizzoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedIndirizzoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedIndirizzoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
