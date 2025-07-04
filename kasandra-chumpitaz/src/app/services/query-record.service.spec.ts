import { TestBed } from '@angular/core/testing';
import { QueryRecordService } from './query-record.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QueryRecord } from '../model/DataReniec';

describe('QueryRecordService', () => {
  let service: QueryRecordService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QueryRecordService]
    });
    service = TestBed.inject(QueryRecordService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a query record by RUC', () => {
    const dummyRuc = '12345678901';
    const dummyRecord: QueryRecord = {
      id: '1',
      ruc: dummyRuc,
      razonSocial: 'Empresa Ejemplo',
      condicion: 'Activo',
      direccion: 'Av. Ejemplo 123',
      departamento: 'Lima',
      provincia: 'Lima',
      distrito: 'Miraflores',
      status: 'Activo',
      fechaCreacion: '2023-01-01T00:00:00Z',
      fechaActualizacion: '2023-01-01T00:00:00Z'
    };

    service.getByRuc(dummyRuc).subscribe(record => {
      expect(record).toEqual(dummyRecord);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/ruc/${dummyRuc}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRecord);
  });

  // Puedes agregar más pruebas aquí para verificar el comportamiento del servicio
});