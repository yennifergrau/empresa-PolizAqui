import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QrcodeService } from 'src/app/services/generarCodigo.service';
import { ReportAliado } from 'src/app/shared/models/interfazReporte';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  public items: any;
  public filteredItems: ReportAliado[] = [];
  public searchTerm!: string;
  public startDate!: string;
  public endDate!: string;
  private reporteSeleccionado: ReportAliado[] = [];
  private activatedRoute = inject(ActivatedRoute)
  public showLoading: boolean = false;
  private reportService = inject(QrcodeService);
  public documento: any;
  public selectedDateInitial!: string;
  public selectedDateFinaly!:  string;
  nombre:any

  constructor() { }

  ngOnInit() {
    this.nombre = this.activatedRoute.snapshot.paramMap.get('nombre');
    this.getReport();
  }
  
  public toggleDetalles(reporte: any) {
    reporte.mostrarDetalles = !reporte.mostrarDetalles;
    this.items.forEach((c: { mostrarDetalles: boolean; }) => {
      if (c !== reporte) {
        c.mostrarDetalles = false;
      }
    });
  }
  private getReport() {
    this.reportService.getReportData().subscribe(data => {
      this.items = data.data;
  
      const dataPagos = this.items.pagos.filter((pago: { empresa: any }) => pago.empresa === this.nombre);
      const dataPolizas = this.items.polizas;
  
      this.filteredItems = dataPagos.map((pago: any) => {
        const poliza = dataPolizas.find((p: any) => p.numero_poliza === pago.id_poliza);
        return {
          ...pago,
          plan: poliza?.plan || 'Sin plan',
          fecha_emision: poliza?.fecha_emision || 'No registrada',
          estado_poliza: poliza?.estado_poliza || 'Desconocido'
        };
      });
    });
  }
  
  
  

  public getMetodoPagoTexto(metodo: string): string {
    switch (metodo) {
      case 'CELE':
        return 'Pago Móvil';
      case 'CNTA':
        return 'Transferencia Bancaria';
      default:
        return metodo;
    }
  }

  public mostrarDetalles(reporte: any) {
    this.reporteSeleccionado = reporte;
  }

}
