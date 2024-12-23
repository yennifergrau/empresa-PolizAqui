import { Component, OnInit, inject, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QrcodeService } from 'src/app/services/generarCodigo.service';
import { saveAs } from 'file-saver';
import { LoadingController, ToastController } from '@ionic/angular';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-qrgenerator',
  templateUrl: './qrgenerator.page.html',
  styleUrls: ['./qrgenerator.page.scss'],
})
export class QrgeneratorPage implements OnInit {
  public title: string = 'Generar QR';
  public qrCodeUrl!: string;
  public formQR!: FormGroup;
  public nombreAliado!: string;
  public rifAliado!: string;
  public showLoading: boolean = false;
  public url : any

  @ViewChild('qrContainer') qrContainer!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private qrcodeService: QrcodeService,
    private toastController: ToastController
  ) {
    this.generateForm();
  }

  private generateForm() {
    this.formQR = this.fb.group({
      nombre: ['',],
      cedula_rif: ['',],
    });
  }

  get nameControl(): AbstractControl {
    return this.formQR.get('nombre')!;
  }

  get rifControl(): AbstractControl {
    return this.formQR.get('cedula_rif')!;
  }

  ngOnInit() {
    const storedRegisters = localStorage.getItem('currentUser');
    if (storedRegisters) {
      const decodedToken = this.decodeToken(storedRegisters);
      this.nombreAliado = decodedToken.nombre;
      this.rifAliado = decodedToken.cedula_rif;
      localStorage.setItem('empresa-aliada', JSON.stringify(this.nombreAliado));
      this.formQR.get('nombre')?.patchValue(this.nombreAliado);
      this.formQR.get('cedula_rif')?.patchValue(this.rifAliado);
      this.generateQRCode();
    }
  }

  public decodeToken(token: string): any {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  async toastMessage(message: string, color: string, icon: string, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      position: 'top',
      color: color,
      icon: icon,
      duration: duration,
    });
    await toast.present();
  }

  async generateQRCode() {
    if (this.formQR.invalid) {
      this.toastMessage('Ocurrió un error. Inténtalo de nuevo', 'danger', 'alert-circle', 2800);
      return;
    }
    const nombre = this.nombreAliado;
    const cedula_rif = this.rifAliado;
    this.showLoading = true;
    try {
      const result = await this.qrcodeService.generateQRCode(cedula_rif, nombre).toPromise();
      if (result.status) {
        this.qrCodeUrl = result.qrCode;
       this.url = result.qrUrl
        
        this.toastMessage('QR generado exitosamente', 'success', 'checkmark-circle', 2800);
      } else {
        this.toastMessage('No se pudo generar el QR', 'danger', 'alert-circle', 2800);
      }
    } catch (error) {
      this.toastMessage('El aliado no existe', 'danger', 'alert-circle', 2800);
    } finally {
      this.showLoading = false;
    }
  }

  async downloadQRCode() {
    if (this.qrCodeUrl) {
      const qrContainer = this.qrContainer.nativeElement;
      qrContainer.style.display = 'block';
      html2canvas(qrContainer, {
        useCORS: true,
        scale: 4,
      }).then(canvas => {
        qrContainer.style.display = 'none';
        canvas.toBlob(blob => {
          if (blob) {
            saveAs(blob, `${this.nameControl.value}.PNG`);
            this.toastMessage('QR descargado con éxito', 'success', 'checkmark-circle', 2800);
          }
        });
      });
    } else {
      console.error('No QR code URL to download');
    }
  }


  async copyUrl() {
    if (!this.url) {
      this.toastMessage('No hay un enlace para copiar', 'danger', 'alert-circle', 2800);
      return;
    }
  
    try {
      await navigator.clipboard.writeText(this.url);
      this.toastMessage('Enlace copiado al portapapeles', 'success', 'checkmark-circle', 2800);
    } catch (error) {
      this.toastMessage('No se pudo copiar el enlace', 'danger', 'alert-circle', 2800);
    }
  }
  


  async downloadQRCodeAsPDF() {
    if (this.qrCodeUrl) {
      const qrContainer = this.qrContainer.nativeElement;
  
      // Aseguramos que el contenedor sea cuadrado
      qrContainer.style.width = '1200px'; // Ajusta según el tamaño deseado
      qrContainer.style.height = '1200px';
      qrContainer.style.display = 'block';
  
      html2canvas(qrContainer, {
        useCORS: true,
        scale: 4,
      }).then(canvas => {
        qrContainer.style.display = 'none';
        
        // Obtener datos de la imagen manteniendo proporciones
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 450; // Tamaño en mm (ajustable)
        const imgHeight = (canvas.height / canvas.width) * imgWidth; // Mantener proporción
  
        // Crear PDF tamaño A4
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });
  
        const pageWidth = 210;
        const pageHeight = 297;
  
        // Centramos el QR en la hoja
        const xPosition = (pageWidth - imgWidth) / 2;
        const yPosition = (pageHeight - imgHeight) /2 ;
  
        // Agregar imagen al PDF
        pdf.addImage(imgData, 'PNG', xPosition, yPosition, imgWidth, imgHeight);
  
        // Guardar PDF
        pdf.save(`${this.nameControl.value}.pdf`);
        this.toastMessage('QR descargado como PDF con éxito', 'success', 'checkmark-circle', 2800);
      });
    } else {
      console.error('No QR code URL to download');
    }
  }
  
  
}
