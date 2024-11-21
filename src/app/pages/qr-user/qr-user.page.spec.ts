import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QRUserPage } from './qr-user.page';

describe('QRUserPage', () => {
  let component: QRUserPage;
  let fixture: ComponentFixture<QRUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QRUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
