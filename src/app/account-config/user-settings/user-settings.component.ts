import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserLoggendIn } from './../../models/userLoggedIn';
import { LoginService } from './../../services/login.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  userForm: FormGroup;

  @ViewChild('imgUpload')
  imgUpload: ElementRef;

  @ViewChild('avatarImg')
  avatarImg: ElementRef;

  img: File;

  // tslint:disable-next-line:max-line-length
  emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  constructor(private loginService: LoginService, private fb: FormBuilder,
    private notificationService: NotificationService, private userService: UserService, private router: Router) { }

  ngOnInit() {

    const user = this.userLoggendIn();
    let data = '';

    if (user.user.dataNascimento !== null || user.user.dataNascimento !== undefined) {
      data = this.convertDate(user.user.dataNascimento);
    }

    this.userForm = this.fb.group({
      id: this.fb.control(user.user.id, [Validators.required]),
      avatar: this.fb.control(''),
      email: this.fb.control(user.user.email, [Validators.required, Validators.pattern(this.emailPattern)]),
      username: this.fb.control(user.user.username, [Validators.required, Validators.minLength(6)]),
      data_nasc: this.fb.control(data),
      descricao: this.fb.control(user.user.description, [Validators.maxLength(255)])
    });

  }

  campoInvalido(campo): boolean {
    const field = this.userForm.get(campo);
    if (field.invalid) {
      return true;
    }
    return false;
  }

  campoMessage(campo): string {
    let message = '';
    if (this.campoInvalido(campo)) {

      switch (campo) {
        case 'email':
          message = 'Email inválido';
        break;

        case 'username':
          message = 'Mínimo 6 caracteres';
        break;

        case 'descricao':
          message = `Máximo 255 caracteres /  ${(this.userForm.get(campo).value).toString().lenght} caracteres atuais. `;
        break;
      }
    }
    return message;
  }
  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  userLoggendIn(): UserLoggendIn {
    return this.loginService.userLoggedIn();
  }

  convertDate(data: Date) {
    const date = new Date(data);

    const year = date.getFullYear();

    let month: string;
    month = (date.getMonth() + 1).toString();

    if (month.length === 1) {
      month = 0 + month;
    }

    let day: string;
    day = date.getDate().toString();

    if (day.length === 1) {
      day = 0 + day;
    }

    return `${year}-${month}-${day}`;
  }

  updateUser() {
    this.notificationService.notify(`Atualizando...`);
    if (this.imgUpload.nativeElement.value === '') {
      this.notUpdateImg();
    }
    const formData = new FormData();
    formData.append('avatar', this.img);
    formData.append('id', this.userForm.get('id').value);
    formData.append('email', this.userForm.get('email').value);
    formData.append('username', this.userForm.get('username').value);
    formData.append('description', this.userForm.get('descricao').value);
    if ( this.userForm.get('data_nasc').value !== '') {
      formData.append('dataNascimento', this.userForm.get('data_nasc').value);
    } else {
      formData.append('dataNascimento', 'notInformed');
    }
    this.uploadUser(formData);
  }

  trocaFoto() {
    this.imgUpload.nativeElement.click();
  }

  uploadImg(event) {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);
      const url = window.URL.createObjectURL(event.target.files[0]);
      this.avatarImg.nativeElement.src = url;
      this.img = event.target.files[0];
    }
  }

  notUpdateImg() {

      const canvas = document.createElement('canvas');
      canvas.width = this.avatarImg.nativeElement.naturalWidth;
      canvas.height = this.avatarImg.nativeElement.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(this.avatarImg.nativeElement, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      this.transformBase64ToFile(dataURL);

  }

  transformBase64ToFile (dataURL) {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while ( n-- ) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        this.img = new File([u8arr], this.userLoggendIn().user.avatar, {type: mime});
  }

  uploadUser(formdata: FormData) {
    this.userService.updateUser(formdata, this.userLoggendIn().token).subscribe(

      (user) => {
        console.log(user);
      //  sessionStorage.setItem('user', JSON.stringify(user)); fazer o login de novo
        this.notificationService.notify(`Atualizado com sucesso!`);

      }, (err) => {
        this.notificationService.notify(`Algo Aconteceu, tente novamente mais tarde :(`);
      }
    );
  }
}
