import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReniecService } from '../../service/reniec.service';
import { DataReniec } from '../../interfaces/DataReniec';

@Component({
  selector: 'app-reniec',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reniec.component.html',
  styleUrl: './reniec.component.css'
})
export class ReniecComponent implements OnInit {

  // Propiedades para manejar los datos
  registros: DataReniec[] = [];
  registroSeleccionado: DataReniec | null = null;
  rucBusqueda: string = '';
  loading: boolean = false;
  mensaje: string = '';
  tipoMensaje: 'success' | 'error' | 'info' = 'info';

  // Propiedades para filtros
  filtroTexto: string = '';
  filtroEstado: string = 'todos';
  registrosFiltrados: DataReniec[] = [];

  constructor(private reniecService: ReniecService) { }

  ngOnInit(): void {
    this.cargarTodosLosRegistros();
  }

  /**
   * Cargar todos los registros
   */
  cargarTodosLosRegistros(): void {
    this.loading = true;
    this.reniecService.getAll().subscribe({
      next: (data) => {
        this.registros = data;
        this.aplicarFiltros();
        this.mostrarMensaje('Registros cargados exitosamente', 'success');
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar registros:', error);
        this.mostrarMensaje('Error al cargar los registros', 'error');
        this.loading = false;
      }
    });
  }

  /**
   * Buscar por RUC
   */
  buscarPorRuc(): void {
    if (!this.rucBusqueda.trim()) {
      this.mostrarMensaje('Ingrese un RUC válido', 'error');
      return;
    }

    this.loading = true;
    this.reniecService.getByRuc(this.rucBusqueda.trim()).subscribe({
      next: (data) => {
        this.registroSeleccionado = data;
        this.mostrarMensaje('Registro encontrado', 'success');
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al buscar por RUC:', error);
        this.mostrarMensaje('No se encontró el registro con ese RUC', 'error');
        this.registroSeleccionado = null;
        this.loading = false;
      }
    });
  }

  /**
   * Desactivar registro
   */
  desactivarRegistro(id: number): void {
    if (confirm('¿Está seguro de que desea desactivar este registro?')) {
      this.loading = true;
      this.reniecService.desactivar(id).subscribe({
        next: (data) => {
          this.mostrarMensaje('Registro desactivado exitosamente', 'success');
          this.cargarTodosLosRegistros();
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al desactivar:', error);
          this.mostrarMensaje('Error al desactivar el registro', 'error');
          this.loading = false;
        }
      });
    }
  }

  /**
   * Restaurar registro
   */
  restaurarRegistro(id: number): void {
    if (confirm('¿Está seguro de que desea restaurar este registro?')) {
      this.loading = true;
      this.reniecService.restaurar(id).subscribe({
        next: (data) => {
          this.mostrarMensaje('Registro restaurado exitosamente', 'success');
          this.cargarTodosLosRegistros();
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al restaurar:', error);
          this.mostrarMensaje('Error al restaurar el registro', 'error');
          this.loading = false;
        }
      });
    }
  }

  /**
   * Aplicar filtros
   */
  aplicarFiltros(): void {
    this.registrosFiltrados = this.registros.filter(registro => {
      const cumpleFiltroTexto = !this.filtroTexto || 
        registro.ruc.toLowerCase().includes(this.filtroTexto.toLowerCase()) ||
        registro.razonSocial.toLowerCase().includes(this.filtroTexto.toLowerCase()) ||
        registro.direccion.toLowerCase().includes(this.filtroTexto.toLowerCase());

      const cumpleFiltroEstado = this.filtroEstado === 'todos' || 
        (this.filtroEstado === 'activo' && (!registro.estado || registro.estado === 'activo')) ||
        (this.filtroEstado === 'inactivo' && registro.estado === 'inactivo');

      return cumpleFiltroTexto && cumpleFiltroEstado;
    });
  }

  /**
   * Limpiar búsqueda
   */
  limpiarBusqueda(): void {
    this.rucBusqueda = '';
    this.registroSeleccionado = null;
  }

  /**
   * Limpiar filtros
   */
  limpiarFiltros(): void {
    this.filtroTexto = '';
    this.filtroEstado = 'todos';
    this.aplicarFiltros();
  }

  /**
   * Mostrar mensaje
   */
  private mostrarMensaje(mensaje: string, tipo: 'success' | 'error' | 'info'): void {
    this.mensaje = mensaje;
    this.tipoMensaje = tipo;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

  /**
   * Verificar si un registro está activo
   */
  estaActivo(registro: DataReniec): boolean {
    return !registro.estado || registro.estado === 'activo';
  }

  /**
   * Función trackBy para mejorar el rendimiento del *ngFor
   * Angular usa esta función para identificar qué elementos han cambiado
   */
  trackByRuc(index: number, item: DataReniec): string {
    return item.ruc;
  }
}