import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioSesionPage } from './inicio-sesion.page';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { of } from 'rxjs';

describe('InicioSesionPage', () => {
  let component: InicioSesionPage;
  let fixture: ComponentFixture<InicioSesionPage>;
  let usuarioServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    // Mock de UsuarioService
    usuarioServiceMock = {
      inicio: jasmine.createSpy('inicio').and.returnValue(Promise.resolve(true)), // Por defecto retorna éxito
    };

    // Mock de Router
    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      declarations: [InicioSesionPage],
      providers: [
        { provide: UsuarioService, useValue: usuarioServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InicioSesionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /home on successful login', async () => {
    // Configuración de valores de entrada
    component.correo = 'test@example.com';
    component.password = 'password123';

    // Llamar al método login
    await component.login();

    // Verificar que se llama al servicio con los valores correctos
    expect(usuarioServiceMock.inicio).toHaveBeenCalledWith('test@example.com', 'password123');

    // Verificar que se redirige al usuario
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should show an alert on failed login', async () => {
    // Configurar el mock para devolver un fallo
    usuarioServiceMock.inicio.and.returnValue(Promise.resolve(false));

    // Espiar el método alert para verificar su uso
    spyOn(window, 'alert');

    // Configuración de valores de entrada
    component.correo = 'wrong@example.com';
    component.password = 'wrongpassword';

    // Llamar al método login
    await component.login();

    // Verificar que se llama al servicio con los valores correctos
    expect(usuarioServiceMock.inicio).toHaveBeenCalledWith('wrong@example.com', 'wrongpassword');

    // Verificar que se muestra una alerta con el mensaje correcto
    expect(window.alert).toHaveBeenCalledWith('CORREO O CONTRASEÑA INCORRECTO');

    // Asegurarse de que no se redirige
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
