import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEmailFormComponent } from './confirm-email-form.component';

describe('ConfirmEmailFormComponent', () => {
  let component: ConfirmEmailFormComponent;
  let fixture: ComponentFixture<ConfirmEmailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmEmailFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
