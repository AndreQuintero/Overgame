import { LoginService } from './services/login.service';
import { url } from './services/api';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('menuDesktop')
  menuDesk: ElementRef;

  abertoDesk = true;
  menusM: any;

  constructor(private menus: ElementRef, private router: Router, private loginService: LoginService) {

  }

  ngOnInit() {
    // passa o menu mobile para o header component
   this.menusM = this.menus.nativeElement.querySelectorAll('[data-menuM]');
  }

  escondeMenusHeader() {
    const link = this.router.url.split('?');
    if ( link[0] !== '/login' && link[0] !== '/cadastro') {
      return true;
    } else {
      return false;
    }
  }
  openNav(): void {

    if (this.abertoDesk === true) {
      this.menuDesk.nativeElement.classList.remove('abre');
      this.menuDesk.nativeElement.classList.add('esconde');
    } else {
      this.menuDesk.nativeElement.classList.remove('esconde');
      this.menuDesk.nativeElement.classList.add('abre');
    }
    this.abertoDesk = !this.abertoDesk;
  }

  loggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  logout(): void {
    this.loginService.logout();
  }
}
