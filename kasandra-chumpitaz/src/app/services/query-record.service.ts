import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataReniec } from '../model/DataReniec';
import { environment } from '../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ReniecService {
  
  private readonly baseUrl = `${environment.URL_IA}/api/reniec`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los registros de RENIEC
   * @returns Observable<DataReniec[]>
   */
  getAll(): Observable<DataReniec[]> {
    return this.http.get<DataReniec[]>(this.baseUrl);
  }

  /**
   * Busca y guarda datos por RUC
   * @param ruc - Número de RUC a buscar
   * @returns Observable<DataReniec>
   */
  getByRuc(ruc: string): Observable<DataReniec> {
    return this.http.get<DataReniec>(`${this.baseUrl}/ruc/${ruc}`);
  }

  /**
   * Desactiva un registro por ID
   * @param id - ID del registro a desactivar
   * @returns Observable<DataReniec>
   */
  desactivar(id: number): Observable<DataReniec> {
    return this.http.put<DataReniec>(`${this.baseUrl}/desactivar/${id}`, {});
  }

  /**
   * Restaura un registro por ID
   * @param id - ID del registro a restaurar
   * @returns Observable<DataReniec>
   */
  restaurar(id: number): Observable<DataReniec> {
    return this.http.put<DataReniec>(`${this.baseUrl}/restaurar/${id}`, {});
  }
}