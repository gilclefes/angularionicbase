/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { GeomodelService } from './geomodel.service';

describe('Service: Geomodel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeomodelService]
    });
  });

  it('should ...', inject([GeomodelService], (service: GeomodelService) => {
    expect(service).toBeTruthy();
  }));
});
