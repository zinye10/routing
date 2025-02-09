import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import {routes as userRoutes} from './users/users.routes';
import { inject } from "@angular/core";
import { canLeaveEditPage, NewTaskComponent } from "./tasks/new-task/new-task.component";

const dummyCanMatch: CanMatchFn = (route, segments) => {
    const shouldGetAccess = Math.random();
    const router = inject(Router);

    if (shouldGetAccess < 0.5)
    {
        return true;
    }

    return new RedirectCommand(router.parseUrl('/unauthorized'));
}


export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent,
    },
    {
        path: 'users/:userId',
        component: UserTasksComponent,
        children: userRoutes,
        canMatch: [dummyCanMatch],
        //runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        data: {
            message: 'Hello'
        },
        resolve: {
            userName:resolveUserName,
        }
    },
    {
        path: '**',
        component: NotFoundComponent
    },
    {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate:[canLeaveEditPage]
    }

]