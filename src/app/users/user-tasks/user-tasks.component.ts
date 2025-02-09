import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';
import {of} from 'rxjs'

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit{
  //userId = input.required<string>();
  userName = input.required<string>();
  message = input.required<string>();

  private activatedRouted = inject(ActivatedRoute);

  ngOnInit(): void {
    /*this.activatedRouted.data.subscribe({
      next: data => {
        console.log(data);
      }
    })*/
  }


  /* Observalbes
  private userService = inject(UsersService);

  private activatedRouted = inject(ActivatedRoute);

  private destroyRef = inject(DestroyRef);

  //userName = computed(() => this.userService.users.find(u => u.id === this.userId())?.name);

  ngOnInit(): void {
    console.log(this.activatedRouted);
    console.log(this.message());
    const subscription = this.activatedRouted.paramMap.subscribe({
      next: paraMap => {
        this.userName = this.userService.users.find(u => u.id === paraMap.get('userId'))?.name || '';
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }*/
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
    const usersService = inject(UsersService);
    const userName = usersService.users.find((u) => u.id === activatedRoute.paramMap.get('userId'))?.name || '';
    return userName;
};
