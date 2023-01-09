import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCaptureComponent } from './new-capture.component';

describe('NewCaptureComponent', () => {
  let component: NewCaptureComponent;
  let fixture: ComponentFixture<NewCaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCaptureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
