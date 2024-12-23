import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/authenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public title: string = 'Iniciar Sesión';
  public subtitle: string = 'Olvidaste tu contraseña';
  public formLogin!: FormGroup;
  public passwordFieldType: string = 'password';
  public passwordIcon: string = 'eye-off';
  public showLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {
    this.generateForm();
  }

  ngOnInit() {}

  private generateForm(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get emailControl(): AbstractControl {
    return this.formLogin.get('email')!;
  }

  get passwordControl(): AbstractControl {
    return this.formLogin.get('password')!;
  }

  public togglePasswordVisibility() {
    if (this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text';
      this.passwordIcon = 'eye';
    } else {
      this.passwordFieldType = 'password';
      this.passwordIcon = 'eye-off';
    }
  }

  public async Submit() {
    if (this.formLogin.valid) {
      this.showLoading = true;
      const { email, password } = this.formLogin.value;
      this.authService.login(email, password).subscribe(
        (res: any) => {
          this.showLoading = false;
          if (res.code === 200) {
            this.toastMessage('authenticacion exitosa', 'success', 'checkmark-circle',2800);
            localStorage.setItem('currentUser', JSON.stringify(res));
            setTimeout(() => {
              this.navCtrl.navigateRoot(['qrgenerator']);
            }, 2500);
          }
        },
        (error) => {
          this.showLoading = false;
          this.toastMessage('Credenciales inválidas', 'danger','alert-circle',2800);
        }
      );
    } else {
      this.formLogin.markAllAsTouched();
      this.toastMessage('Completa todos los campos', 'danger','alert-circle',2800);
    }
  }

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

  public RoutingNavigate() {
    this.navCtrl.navigateRoot(['/recuperacion']);
  }

  public routingRegistro() {
    this.navCtrl.navigateRoot(['/register']);
  }
}
