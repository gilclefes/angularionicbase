/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BaseModelsService } from './base-models.service';

describe('Service: BaseModels', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseModelsService]
    });
  });

  it('should ...', inject([BaseModelsService], (service: BaseModelsService) => {
    expect(service).toBeTruthy();
  }));
});
