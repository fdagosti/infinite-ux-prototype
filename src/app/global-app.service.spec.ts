/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GlobalAppService } from './global-app.service';

describe('GlobalAppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalAppService]
    });
  });

  it('should ...', inject([GlobalAppService], (service: GlobalAppService) => {
    expect(service).toBeTruthy();
  }));
});
