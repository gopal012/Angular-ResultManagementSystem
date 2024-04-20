import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSignupPageComponent } from './teacher-signup-page.component';

describe('TeacherSignupPageComponent', () => {
  let component: TeacherSignupPageComponent;
  let fixture: ComponentFixture<TeacherSignupPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherSignupPageComponent]
    });
    fixture = TestBed.createComponent(TeacherSignupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
