/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdsuiteService } from './adsuite.service';

describe('Service: Adsuite', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdsuiteService]
    });
  });

  it('should ...', inject([AdsuiteService], (service: AdsuiteService) => {
    expect(service).toBeTruthy();
  }));
});
