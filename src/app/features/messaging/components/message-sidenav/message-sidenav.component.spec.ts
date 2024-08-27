import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSidenavComponent } from './message-sidenav.component';

describe('MessageSidenavComponent', () => {
  let component: MessageSidenavComponent;
  let fixture: ComponentFixture<MessageSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageSidenavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
