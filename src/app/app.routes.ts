import { Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';

export const routes: Routes = [

{
    path: '',
        redirectTo: 'task',
        pathMatch: 'full'
},
{
    path: 'task',
    component: TaskComponent
}

];
