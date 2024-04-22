import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaPotenzaComponent } from './modifica-potenza.component';

describe('ModificaPotenzaComponent', () => {
  let component: ModificaPotenzaComponent;
  let fixture: ComponentFixture<ModificaPotenzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaPotenzaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificaPotenzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
