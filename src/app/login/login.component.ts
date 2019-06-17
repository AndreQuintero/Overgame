import { ResponseAPi } from './../models/responseApi';
import { UserService } from './../services/user.service';
import { NotificationService } from './../services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl} from '@angular/forms';
import { LoginService } from '../services/login.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  loginForm: FormGroup;
  emailError = '';
  passwordError = '';
  errorLogin = '';
  usernameError = '';
  confirmPasswordError = '';
  LoginCadastro = 'Login';

  videoIdRedirect = '';

  @ViewChild('backGroundVideo')
  backGroundVideo: ElementRef;

  constructor(private fb: FormBuilder, private loginService: LoginService, public router: Router,
              private notificationService: NotificationService, private userService: UserService,
              private activeRoute: ActivatedRoute) { }


  ngOnInit() {
    this.backGroundVideo.nativeElement.autoplay = true;
    this.backGroundVideo.nativeElement.muted = true;
    this.backGroundVideo.nativeElement.loop = true;
    this.backGroundVideo.nativeElement.load();



    if (this.escondeMenusHeader() === '/login') {

      this.LoginCadastro = 'Login';

      this.idVideoParameter();


      this.loginForm = this.fb.group({
        email: this.fb.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
        password: this.fb.control('', [Validators.required, Validators.minLength(6)]),

      });
    } else {
      this.LoginCadastro = 'Cadastrar';

      this.loginForm = this.fb.group({
        email: this.fb.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
        password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
        username:  this.fb.control(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
        confirmPassword:  this.fb.control(null, [Validators.required, Validators.minLength(6)]),
      }, {validators: this.equalsTo});
    }

  }

  idVideoParameter() {
    if (this.activeRoute.snapshot.queryParams['videoId'] !== undefined) {
      this.videoIdRedirect = this.activeRoute.snapshot.queryParams['videoId'];

    }
  }

  escondeMenusHeader(): string {
    const link = this.router.url.split('?');
    return link[0];
  }

  equalsTo(group: AbstractControl): { [key: string]: boolean } {

    const password = this.loginForm.get('password');
    const confirmPassword = this.loginForm.get('confirmPassword');

    if (password.value !== confirmPassword.value) {
      return { emailIsNotMatch: true};
    }
    return undefined;
  }
  verificaCampo(campo): boolean {
    if (this.loginForm.get(campo).invalid && !this.loginForm.get(campo).pristine) {
        if (campo === 'email') {
          this.emailError = 'Email inválido';
        }

        if (campo === 'password') {
          this.passwordError = 'Senha inválida';
        }

        if ( campo === 'username') {
          this.usernameError = 'Nome de usuário inválido';
        }

        if (campo === 'confirmPassword') {
          const password = this.loginForm.get('password');
          const confirmPassword = this.loginForm.get('confirmPassword');

          if (password.value !== confirmPassword.value) {
            this.confirmPasswordError = 'As senhas não coincidem';
          } else {
            this.confirmPasswordError = 'Mínimo de 6 caracteres';
          }
        }
        return true;
    } else {
      if (campo === 'email') {
        this.emailError = '';
      }
      if (campo === 'password') {
        this.passwordError = '';
      }

      if ( campo === 'username') {
        this.usernameError = '';
      }

      if (campo === 'confirmPassword') {
        this.confirmPasswordError = '';
      }
      return false;
    }

  }

  enviar() {
    if (this.escondeMenusHeader() === '/login') {
      this.loginService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .subscribe((user) => {
        this.errorLogin = '';
        if ( this.videoIdRedirect === '') {
          this.router.navigate(['/'], {queryParams: {title: '', page: 1}});
        } else {
          this.router.navigate(['/video', this.videoIdRedirect]);
        }

        this.notificationService.notify(`Seja bem vindo(a) ${user.user.username}!`);
      }, (err) => {
        console.log('caiu aqui');
       this.errorLogin = 'Email e/ou senha incorretos';
      });
    } else {
      const senha = this.loginForm.get('password').value;
      this.userService.createUser(this.loginForm.get('email').value, this.loginForm.get('username').value,
      this.loginForm.get('password').value)
      .subscribe( (response: ResponseAPi) => {
        const userCreated = response.data;
        this.loginService.login( userCreated.email, senha)
        .subscribe((user) => {
          this.errorLogin = '';
          this.router.navigate(['/'], {queryParams: {title: '', page: 1}});
          this.notificationService.notify(`Seja bem vindo(a) ${user.user.username}!`);
        });
      }, (err) => {
        this.errorLogin = 'Email ou Usuário já existentes';
      });
    }

  }
}
