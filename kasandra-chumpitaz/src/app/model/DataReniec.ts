export interface DataReniec {
  Id: number;
  ruc: string;
  razonSocial: string;
  condicion: string;
  direccion: string;
  departamento: string;
  provincia: string;
  distrito: string;
  estado?: string; // Opcional ya que no está en el DTO pero sí en el modelo
}