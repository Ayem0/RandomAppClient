import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { loadUserResolver } from './load-user.resolver';

describe('loadUserResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => loadUserResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
