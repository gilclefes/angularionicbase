/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminModelsService } from './admin-models.service';

describe('Service: AdminModels', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminModelsService]
    });
  });

  it('should ...', inject([AdminModelsService], (service: AdminModelsService) => {
    expect(service).toBeTruthy();
  }));
});
