import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoincideClientePagamentoComponent } from './coincide-cliente-pagamento.component';

describe('CoincideClientePagamentoComponent', () => {
  let component: CoincideClientePagamentoComponent;
  let fixture: ComponentFixture<CoincideClientePagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoincideClientePagamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoincideClientePagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
