import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  public title: string = 'Regístrate';
  public formRegister!: FormGroup;
  public passwordFieldType: string = 'password';
  public passwordIcon: string = 'eye-off'; 
  public showLoading: boolean = false;
  public verificarCorreoControl: FormControl = new FormControl('');
  public correoNoCoincide: boolean = false;
  public correoCoincide: boolean = false
  public isSecondCheckboxChecked = false;
  public termsAccepted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private http: HttpClient,
    private toastController: ToastController
  ) {this.generateForm()}


  toggleTerms(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.termsAccepted = inputElement.checked;
  }

  public verificarCoincidencia(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const correoVerificado = inputElement.value;
    const correoTomador = this.formRegister.get('email')?.value;    
    this.correoNoCoincide = correoTomador !== correoVerificado;
    this.correoCoincide = correoTomador === correoVerificado;
  }

  private generateForm(): void {
    this.formRegister = this.fb.group({
      cedula_rif: ['', [Validators.required, Validators.pattern(/^[JGVEjgevp]-\d{8}-\d{1}$/)]],
      nombre: ['', [Validators.required]], 
      telefono: ['', [Validators.required,Validators.pattern(/^(0414|0416|0424|0426|0412)-\d{7}$/)]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]});
  }

  get rifControl(): AbstractControl {
    return this.formRegister.get('cedula_rif')!;
  }

  get nameControl(): AbstractControl {
    return this.formRegister.get('nombre')!;
  }

  get telefonoControl(): AbstractControl {
    return this.formRegister.get('telefono')!;
  }

  get emailControl(): AbstractControl {
    return this.formRegister.get('email')!;
  }

  get direControl(): AbstractControl {
    return this.formRegister.get('direccion')!;
  }

  get passwordControl(): AbstractControl {
    return this.formRegister.get('password')!;
  }

  public togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordFieldType === 'password' ? 'eye-off' : 'eye';
  }

  public async Submit() {
    if (this.formRegister.valid && this.termsAccepted) {
        this.showLoading = true;
        this.http.post<any>(`${environment.apiRegister}/register`, this.formRegister.value).pipe(
            catchError((error: HttpErrorResponse) => {
                this.showLoading = false;
                if (error.error && error.error.message === "Aliado Already Registered") {
                    this.toastMessage('Estimado usuario el aliado ya esta registrado', 'danger','alert-circle',2800);
                } else if (error.error.code === 400) {
                    this.toastMessage('Estimado usuario el correo ya se encuentra registrado', 'danger','alert-circle',2800);
                } else {
                    this.toastMessage('Ocurrió un error. Inténtalo de nuevo', 'danger','alert-circle',2800);
                }
                return throwError(error);
            })
        ).subscribe((res: any) => {
            this.showLoading = false;
            if (res.code === 200) {
                this.toastMessage('Datos guardados exitosamente', 'success','checkmark-circle',2800);
                this.navCtrl.navigateRoot('/Login');
            }
        });
    } else {
        if (this.passwordControl.errors?.['minlength']) {
            this.toastMessage('La contraseña debe tener al menos 6 caracteres', 'danger','alert-circle',2800);
        } else {
          this.formRegister.markAllAsTouched();
            this.toastMessage('Completa todos los campos', 'danger','alert-circle',2800);
    }}}


      async toastMessage(message: string, color: string, icon: string, duration:number) {
        const toast = await this.toastController.create({
          message: message,
          position: 'top',
          color: color,
          icon:icon,
          duration: duration,
        });
        await toast.present();
      }

      public routingInicio() {
        this.navCtrl.navigateRoot('/Login');
      }
}
