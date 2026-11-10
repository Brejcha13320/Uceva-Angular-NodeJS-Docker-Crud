import { Routes } from '@angular/router';
import { CreateCourse } from './modules/courses/pages/create-course/create-course';
import { DetailCourse } from './modules/courses/pages/detail-course/detail-course';
import { ListCourses } from './modules/courses/pages/list-courses/list-courses';
import { UpdateCourse } from './modules/courses/pages/update-course/update-course';
import { CreateStudent } from './modules/students/pages/create-student/create-student';
import { DetailStudent } from './modules/students/pages/detail-student/detail-student';
import { ListStudents } from './modules/students/pages/list-students/list-students';
import { UpdateStudent } from './modules/students/pages/update-student/update-student';

export const routes: Routes = [
    { path: '', redirectTo: 'students', pathMatch: 'full' },
    { 
        path: 'students', 
        children: [
            { path: 'list', component: ListStudents },
            { path: 'create', component: CreateStudent },
            { path: 'update/:id', component: UpdateStudent },
            { path: 'detail/:id', component: DetailStudent },
            { path: '**', redirectTo: 'list' }
        ] 
    },
    { 
        path: 'courses', 
        children: [
            { path: 'list', component: ListCourses },
            { path: 'create', component: CreateCourse },
            { path: 'update/:id', component: UpdateCourse },
            { path: 'detail/:id', component: DetailCourse },
            { path: '**', redirectTo: 'list' }
        ] 
    },
];
