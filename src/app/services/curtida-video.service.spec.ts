import { TestBed, inject } from '@angular/core/testing';

import { CurtidaVideoService } from './curtida-video.service';

describe('CurtidaVideoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurtidaVideoService]
    });
  });

  it('should be created', inject([CurtidaVideoService], (service: CurtidaVideoService) => {
    expect(service).toBeTruthy();
  }));
});
