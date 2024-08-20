/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GeoserviceService } from './geoservice.service';

describe('Service: Geoservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoserviceService]
    });
  });

  it('should ...', inject([GeoserviceService], (service: GeoserviceService) => {
    expect(service).toBeTruthy();
  }));
});
