/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FlatDataService } from './flat-data.service';

describe('FlatDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlatDataService]
    });
  });

  it('should ...', inject([FlatDataService], (service: FlatDataService) => {
    expect(service).toBeTruthy();
  }));
});
