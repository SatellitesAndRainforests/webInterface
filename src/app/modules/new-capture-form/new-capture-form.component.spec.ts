import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCaptureFormComponent } from './new-capture-form.component';

describe('NewCaptureFormComponent', () => {
  let component: NewCaptureFormComponent;
  let fixture: ComponentFixture<NewCaptureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCaptureFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCaptureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
