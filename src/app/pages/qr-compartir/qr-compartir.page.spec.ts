import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QRCompartirPage } from './qr-compartir.page';

describe('QRCompartirPage', () => {
  let component: QRCompartirPage;
  let fixture: ComponentFixture<QRCompartirPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QRCompartirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
