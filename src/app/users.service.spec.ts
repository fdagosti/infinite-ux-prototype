/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsersService } from '../infinite-ux/player/users.service';

describe('Service: Users', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService]
    });
  });

  it('should ...', inject([UsersService], (service: UsersService) => {
    expect(service).toBeTruthy();
  }));
});
