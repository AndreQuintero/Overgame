import { LoginService } from './../services/login.service';
import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { EventEmitter } from 'protractor';
import { UserLoggendIn } from '../models/userLoggedIn';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  @Input() recebeMenuM;

  private abertoMobile = false;
  constructor(private loginService: LoginService) {

  }

  ngOnInit() {
    console.log(this.recebeMenuM);
  }


  abreFechaMobile(): void {

    this.recebeMenuM.forEach(element => {
      if (this.abertoMobile === false) {
        element.classList.remove('fechaMobile');
        element.classList.add('abreMobile');
      } else {
        element.classList.remove('abreMobile');
        element.classList.add('fechaMobile');
      }
    });
    this.abertoMobile = !this.abertoMobile;
  }

  loggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  userLogado(): UserLoggendIn {
    return this.loginService.userLoggedIn();
  }
}
