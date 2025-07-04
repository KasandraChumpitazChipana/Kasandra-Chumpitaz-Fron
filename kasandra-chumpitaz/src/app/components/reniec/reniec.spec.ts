import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reniec } from './reniec';

describe('Reniec', () => {
  let component: Reniec;
  let fixture: ComponentFixture<Reniec>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reniec]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reniec);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
