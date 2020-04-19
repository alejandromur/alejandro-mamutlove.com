import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuInterface } from 'src/app/types/menu-interface';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  user: Observable<User | null>;
  menu: MenuInterface[];

  PUBLIC_MENU: MenuInterface[] = [
    {
      icon: 'list',
      text: 'Listado',
      link: '/listado',
    },
  ];

  PRIVATE_MENU: MenuInterface[] = [
    ...this.PUBLIC_MENU,
    {
      icon: 'favs',
      text: 'Favoritos',
      link: '/favoritos',
    },
    {
      icon: 'edit',
      text: 'Nuevo',
      link: '/nuevo',
    },
  ];

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit() {
    this.authService.user.subscribe((user: any) => {
      // console.log(user);
      this.user = user;
      this.menu = this.user ? this.PRIVATE_MENU : this.PUBLIC_MENU;
    });
  }

  addIconFromSprite(icon: string) {
    return `assets/images/sprite.svg#${icon}`;
  }

  onLogout(): void {
    this.authService.logout();
    this.menu = this.PUBLIC_MENU;
    this.router.navigate(['/login']);
  }
}
