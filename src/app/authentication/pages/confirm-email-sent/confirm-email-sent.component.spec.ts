import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEmailSentComponent } from './confirm-email-sent.component';

describe('ConfirmEmailSentComponent', () => {
  let component: ConfirmEmailSentComponent;
  let fixture: ComponentFixture<ConfirmEmailSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmEmailSentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmEmailSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
