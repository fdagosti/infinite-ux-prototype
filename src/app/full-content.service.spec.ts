/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FullContentService } from './full-content.service';

describe('FullContentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FullContentService]
    });
  });

  it('should ...', inject([FullContentService], (service: FullContentService) => {
    expect(service).toBeTruthy();
  }));
});
