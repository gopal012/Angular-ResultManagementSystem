import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherLoginPageComponent } from './teacher-login-page.component';

describe('TeacherLoginPageComponent', () => {
  let component: TeacherLoginPageComponent;
  let fixture: ComponentFixture<TeacherLoginPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherLoginPageComponent]
    });
    fixture = TestBed.createComponent(TeacherLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
