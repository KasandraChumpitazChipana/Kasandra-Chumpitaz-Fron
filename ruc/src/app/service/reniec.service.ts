import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataReniec } from '../interfaces/DataReniec';  // Asegúrate de ajustar la ruta

@Injectable({
  providedIn: 'root'
})
export class ReniecService {

  private readonly apiUrl = 'https://8085-kasandrachu-kasandrachu-r71oe3vk984.ws-us120.gitpod.io/api/reniec';

  constructor(private http: HttpClient) { }

  /**
   * Obtener todos los registros
   */
  getAll(): Observable<DataReniec[]> {
    return this.http.get<DataReniec[]>(this.apiUrl);
  }

  /**
   * Obtener un registro por RUC
   * @param ruc RUC de la entidad
   */
  getByRuc(ruc: string): Observable<DataReniec> {
    return this.http.get<DataReniec>(`${this.apiUrl}/ruc/${ruc}`);
  }

  /**
   * Desactivar un registro
   * @param id ID de la entidad
   */
  desactivar(id: number): Observable<DataReniec> {
    return this.http.put<DataReniec>(`${this.apiUrl}/desactivar/${id}`, {});
  }

  /**
   * Restaurar un registro
   * @param id ID de la entidad
   */
  restaurar(id: number): Observable<DataReniec> {
    return this.http.put<DataReniec>(`${this.apiUrl}/restaurar/${id}`, {});
  }

}
