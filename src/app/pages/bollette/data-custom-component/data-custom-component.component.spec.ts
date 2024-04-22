import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCustomComponentComponent } from './data-custom-component.component';

describe('DataCustomComponentComponent', () => {
  let component: DataCustomComponentComponent;
  let fixture: ComponentFixture<DataCustomComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataCustomComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataCustomComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
