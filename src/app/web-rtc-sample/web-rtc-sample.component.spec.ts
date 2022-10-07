import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebRTCSampleComponent } from './web-rtc-sample.component';

describe('WebRTCSampleComponent', () => {
  let component: WebRTCSampleComponent;
  let fixture: ComponentFixture<WebRTCSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebRTCSampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebRTCSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
