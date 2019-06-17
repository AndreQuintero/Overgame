import { User } from './../models/user';
import { ResponseAPi } from './../models/responseApi';
import { UserService } from './../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  user: User;
  message = '';


  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }


  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.userService.getUserById(id).subscribe(
      (user: ResponseAPi) => {
        this.user = user.data;
        this.message = user.data.description;
        console.log(user);
        if (this.message === '' ) {
          this.message = 'Ainda não possuo uma descrição oficial';
        }
      }, (err) => { console.log('usuário não encontrado para o id: ' + id);
    }
    );
  }


  redirect (bool: boolean) {
    if (bool === false) {
      this.router.navigate([`perfil/${this.user.id}`], {queryParams: {videos: 'maisVistos', page: 1}});
    } else {
      this.router.navigate([`perfil/${this.user.id}`], {queryParams: {videos: 'maisRecentes', page: 1}});
    }
  }


  addStrong(): boolean {
    const videosUrl = this.route.snapshot.queryParams['videos'];
    if (videosUrl === 'maisVistos') {
      return true;
    } else {
     return false;
    }
  }
}
