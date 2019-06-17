import { TestBed, inject } from '@angular/core/testing';

import { CurtidaComentarioService } from './curtida-comentario.service';

describe('CurtidaComentarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurtidaComentarioService]
    });
  });

  it('should be created', inject([CurtidaComentarioService], (service: CurtidaComentarioService) => {
    expect(service).toBeTruthy();
  }));
});
