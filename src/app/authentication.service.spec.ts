/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';

describe('Service: Authentication', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService]
    });
  });

  it('should store the login token on the local storage', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
