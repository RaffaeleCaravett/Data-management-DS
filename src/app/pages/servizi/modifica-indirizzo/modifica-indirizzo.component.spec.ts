import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaIndirizzoComponent } from './modifica-indirizzo.component';

describe('ModificaIndirizzoComponent', () => {
  let component: ModificaIndirizzoComponent;
  let fixture: ComponentFixture<ModificaIndirizzoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaIndirizzoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificaIndirizzoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
