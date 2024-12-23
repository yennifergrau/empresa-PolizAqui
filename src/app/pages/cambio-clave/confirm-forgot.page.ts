import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-confirm-forgot',
  templateUrl: './confirm-forgot.page.html',
  styleUrls: ['./confirm-forgot.page.scss'],
})
export class ConfirmForgotPage implements OnInit {

 private activateRoute = inject(ActivatedRoute)
 private fb = inject( FormBuilder );
 private http = inject( HttpClient );
 private toastCtrl = inject( ToastController );
 private navCtrl = inject( NavController );
 private email !: string | null;
 public showLoading = false;
 public title:string='Confirmar Contraseña';
 public formGenerate!:FormGroup;
 public passwordFieldType: string = 'password';
 public passwordIcon: string = 'eye-off';
 

  constructor() { 
    this.generateForm()
  }

  private generateForm() : void {
    this.formGenerate = this.fb.group({
      password:['',Validators.required],
      email:['']
    })
  }

  ngOnInit() {
    this.email = this.activateRoute.snapshot.paramMap.get('email');
    setTimeout(() => {
      this.formGenerate.get('email')?.setValue(this.email)    
    }, 2000);
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

  async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: color,
    });
    toast.present();
  }

  public async onSubmit() {
    if(this.formGenerate.valid){
      this.showLoading = true;
      const repsonse = this.http.post<any>(`${environment.apiRecuperacion}/update`,this.formGenerate.value).pipe(
        catchError((error: HttpErrorResponse) => {
          if(error.status === 500){
            this.presentToast('No se pudo Actualizar la Contraseña','danger')
          }else{
            this.presentToast('Ocurrio un error Intentalo Nuevamente','danger')
          }
          return throwError(error)
        })
      ).subscribe((res:any) => {
          this.showLoading = false;
          if(res.code === 200){
            this.presentToast ('Contraseña Actualizada con Exito','success');
            setTimeout(() => {
              this.navCtrl.navigateRoot('Login')
            }, 2000);
          }
      })
    }else{
      this.presentToast('Completa los datos','danger')
    }
  }

}
