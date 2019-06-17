import { TestBed, inject } from '@angular/core/testing';

import { DescurtidaVideoService } from './descurtida-video.service';

describe('DescurtidaVideoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DescurtidaVideoService]
    });
  });

  it('should be created', inject([DescurtidaVideoService], (service: DescurtidaVideoService) => {
    expect(service).toBeTruthy();
  }));
});
