/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JawboneService } from './jawbone.service';

describe('JawboneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JawboneService]
    });
  });

  it('should ...', inject([JawboneService], (service: JawboneService) => {
    expect(service).toBeTruthy();
  }));
});
