import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.page.html',
  styleUrls: ['./recuperacion.page.scss'],
})
export class RecuperacionPage implements OnInit {

    title = 'Recuperar Contraseña';
    formForgot!: FormGroup;
    showLoading: boolean = false;

    constructor(
      private fb: FormBuilder,
      private toastCtrl: ToastController,
      private http: HttpClient
    ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.formForgot = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
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

  onSubmit() {
    if (this.formForgot.valid) {
      this.showLoading = true;
      const response = this.http.post<any>(`${environment.apiRecuperacion}/forgot`,this.formForgot.value).pipe(
        catchError((error: HttpErrorResponse) => {
          this.showLoading = false;
          if(error.status === 404){
            this.presentToast('Correo no Existe','danger')
          }else {
            this.presentToast('Ocurrió un error. Inténtalo de nuevo', 'danger');
          }
          return throwError(error);
        })
      ).subscribe((res:any) => {
        this.showLoading = false;
        if(res.code === 200){
          this.presentToast('Hemos enviado un correo con las instrucciones para restablecer tu contraseña','success')
        }
      })
    } else {
      this.presentToast('Introduce tu correo', 'danger');
    }
  }

}
