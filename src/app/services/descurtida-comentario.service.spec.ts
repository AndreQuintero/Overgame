import { TestBed, inject } from '@angular/core/testing';

import { DescurtidaComentarioService } from './descurtida-comentario.service';

describe('DescurtidaComentarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DescurtidaComentarioService]
    });
  });

  it('should be created', inject([DescurtidaComentarioService], (service: DescurtidaComentarioService) => {
    expect(service).toBeTruthy();
  }));
});
