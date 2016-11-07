/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CtapService } from './ctap.service';

describe('Service: Ctap', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CtapService]
    });
  });

  it('should ...', inject([CtapService], (service: CtapService) => {
    expect(service).toBeTruthy();
  }));
});
