/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VideojsService } from './videojs.service';

describe('VideojsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideojsService]
    });
  });

  it('should ...', inject([VideojsService], (service: VideojsService) => {
    expect(service).toBeTruthy();
  }));
});
