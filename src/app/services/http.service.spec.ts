import { TestBed } from '@angular/core/testing';

import { GameHttpService } from './game-http.service';

describe('HttpService', () => {
  let service: GameHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
