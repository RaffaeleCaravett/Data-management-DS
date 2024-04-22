import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertContrattiComponent } from './insert-contratti.component';

describe('InsertContrattiComponent', () => {
  let component: InsertContrattiComponent;
  let fixture: ComponentFixture<InsertContrattiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertContrattiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertContrattiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
