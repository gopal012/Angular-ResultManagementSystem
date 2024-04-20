import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { StudentLoginPageComponent } from './student-login-page/student-login-page.component';
import { TeacherLoginPageComponent } from './teacher-login-page/teacher-login-page.component';
import { TeacherSignupPageComponent } from './teacher-signup-page/teacher-signup-page.component';
import { AddRecordComponent } from './add-record/add-record.component';

const routes: Routes = [
  {path:'', component:LoginPageComponent},
  {path:'teacher-login',component:TeacherLoginPageComponent},
  {path:'teacher-signup',component:TeacherSignupPageComponent},
  {path:'teacher', component:TeacherComponent},
  {path:'add-record',component:AddRecordComponent},
  {path:'student-login', component:StudentLoginPageComponent},
  {path:'student',component:StudentComponent},
  {path:'**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponent=[TeacherComponent,
                               StudentComponent,
                               PageNotFoundComponent,
                               LoginPageComponent,
                               TeacherLoginPageComponent,
                               TeacherSignupPageComponent,
                               AddRecordComponent,
                               StudentLoginPageComponent]
