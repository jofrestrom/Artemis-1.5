import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormViajesPage } from './form-viajes.page';

describe('FormViajesPage', () => {
  let component: FormViajesPage;
  let fixture: ComponentFixture<FormViajesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
