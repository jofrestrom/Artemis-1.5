import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba del título
  it('should display the title as "Artemis"', () => {
    const title = fixture.debugElement.nativeElement.querySelector('ion-title').textContent;
    expect(title).toBe('Artemis');
  });

  // Pruebas de botones

  it('should display the "viajes" button when mostrar is false', () => {
    component.mostrar = false; // Configura la condición
    fixture.detectChanges();

    const viajesButton = fixture.debugElement.nativeElement.querySelector('[tab="viajes"]');
    expect(viajesButton).not.toBeNull(); // El botón debe estar presente
  });

  it('should not display the "viajes" button when mostrar is true', () => {
    component.mostrar = true; // Cambia la condición
    fixture.detectChanges();

    const viajesButton = fixture.debugElement.nativeElement.querySelector('[tab="viajes"]');
    expect(viajesButton).toBeNull(); // El botón no debe estar presente
  });

  it('should display the "administrar" button only for Administrador users', () => {
    component.usuario = { tipo_user: 'Administrador' }; // Simula un usuario administrador
    fixture.detectChanges();

    const administrarButton = fixture.debugElement.nativeElement.querySelector('[tab="administrar"]');
    expect(administrarButton).not.toBeNull(); // El botón debe estar presente
  });

  it('should not display the "administrar" button for non-Administrador users', () => {
    component.usuario = { tipo_user: 'Usuario' }; // Simula un usuario regular
    fixture.detectChanges();

    const administrarButton = fixture.debugElement.nativeElement.querySelector('[tab="administrar"]');
    expect(administrarButton).toBeNull(); // El botón no debe estar presente
  });

  it('should display the "qr-user" button when mostrar is true', () => {
    component.mostrar = true; // Cambia el estado
    fixture.detectChanges();

    const qrUserButton = fixture.debugElement.nativeElement.querySelector('[tab="qr-user"]');
    expect(qrUserButton).not.toBeNull(); // El botón debe estar presente
  });

  it('should not display the "qr-user" button when mostrar is false', () => {
    component.mostrar = false; // Cambia el estado
    fixture.detectChanges();

    const qrUserButton = fixture.debugElement.nativeElement.querySelector('[tab="qr-user"]');
    expect(qrUserButton).toBeNull(); // El botón no debe estar presente
  });

  it('should display the "form-viajes" button only for Conductor users', () => {
    component.usuario = { tipo_user: 'Conductor' }; // Simula un usuario conductor
    fixture.detectChanges();

    const formViajesButton = fixture.debugElement.nativeElement.querySelector('[tab="form-viajes"]');
    expect(formViajesButton).not.toBeNull(); // El botón debe estar presente
  });

  it('should not display the "form-viajes" button for non-Conductor users', () => {
    component.usuario = { tipo_user: 'Usuario' }; // Simula un usuario regular
    fixture.detectChanges();

    const formViajesButton = fixture.debugElement.nativeElement.querySelector('[tab="form-viajes"]');
    expect(formViajesButton).toBeNull(); // El botón no debe estar presente
  });

  // Prueba del ion-card
  it('should display "hola" inside ion-card', () => {
    const cardContent = fixture.debugElement.nativeElement.querySelector('ion-card-content p').textContent;
    expect(cardContent).toBe('hola');
  });
});
