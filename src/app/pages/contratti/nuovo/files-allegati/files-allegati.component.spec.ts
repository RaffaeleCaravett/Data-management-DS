import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesAllegatiComponent } from './files-allegati.component';

describe('FilesAllegatiComponent', () => {
  let component: FilesAllegatiComponent;
  let fixture: ComponentFixture<FilesAllegatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesAllegatiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesAllegatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
