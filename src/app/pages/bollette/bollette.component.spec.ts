import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BolletteComponent } from './bollette.component';

describe('BolletteComponent', () => {
  let component: BolletteComponent;
  let fixture: ComponentFixture<BolletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BolletteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BolletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
