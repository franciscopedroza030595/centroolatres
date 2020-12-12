import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedapaComponent } from './busquedapa.component';

describe('BusquedapaComponent', () => {
  let component: BusquedapaComponent;
  let fixture: ComponentFixture<BusquedapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedapaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
