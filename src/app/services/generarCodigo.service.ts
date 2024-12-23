import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  private apiUrl = environment.apiCodigo;
  private httpService = inject( HttpClient );
  private apiReport = environment.apiReporte

  constructor(private http: HttpClient) { }

  generateQRCode(cedula_rif: string, nombre: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/generate`, { cedula_rif, nombre });
  }

  public getReportData(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpService.get<any>(`${this.apiReport}/getReport`, { headers }).pipe(
      catchError((err: HttpErrorResponse) => {
        let msg = 'no se pudo obtener los reportes';
        if (err.status === 500 && err.error) {
          return throwError(() => new Error(msg));
        }
        return throwError(() => err);
      })
    );
  }
}
