import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformazioniFornituraComponent } from './informazioni-fornitura.component';

describe('InformazioniFornituraComponent', () => {
  let component: InformazioniFornituraComponent;
  let fixture: ComponentFixture<InformazioniFornituraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformazioniFornituraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformazioniFornituraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
