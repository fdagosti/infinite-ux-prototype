/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LolomoService } from './lolomo.service';

describe('LolomoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LolomoService]
    });
  });

  it('should ...', inject([LolomoService], (service: LolomoService) => {
    expect(service).toBeTruthy();
  }));
});
