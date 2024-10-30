import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormPerfilUserPage } from './form-perfil-user.page';

describe('FormPerfilUserPage', () => {
  let component: FormPerfilUserPage;
  let fixture: ComponentFixture<FormPerfilUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPerfilUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
