import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizzaBolletteComponent } from './visualizza-bollette.component';

describe('VisualizzaBolletteComponent', () => {
  let component: VisualizzaBolletteComponent;
  let fixture: ComponentFixture<VisualizzaBolletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizzaBolletteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizzaBolletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
