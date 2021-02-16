import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfProximaSesionComponent } from './pdf-proxima-sesion.component';

describe('PdfProximaSesionComponent', () => {
  let component: PdfProximaSesionComponent;
  let fixture: ComponentFixture<PdfProximaSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfProximaSesionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfProximaSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
