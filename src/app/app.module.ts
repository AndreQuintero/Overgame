import { DescurtidaVideoService } from './services/descurtida-video.service';
import { DescurtidaComentarioService } from './services/descurtida-comentario.service';
import { CurtidaComentarioService } from './services/curtida-comentario.service';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { UserService } from './services/user.service';
import { NotificationService } from './services/notification.service';

import { LoginService } from './services/login.service';
import { ComentariosService } from './services/comentarios.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenusComponent } from './menus/menus.component';
import { VideoSearchComponent } from './video-search/video-search.component';
import { RouterModule } from '@angular/router';
import {ROUTES} from './app.routes';
import { VideoComponent } from './video-search/video/video.component';
import { VideosServiceService } from './services/videos-service.service';
import { HttpClientModule } from '@angular/common/http';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VideosUsuarioRelacionadoComponent } from './video-player/videos-usuario-relacionado/videos-usuario-relacionado.component';
import { VideoDescricaoComponent } from './video-player/video-descricao/video-descricao.component';
import { ComentariosComponent } from './video-player/comentarios/comentarios.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComentarioComponent } from './video-player/comentarios/comentario/comentario.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { CurtidaVideoService } from './services/curtida-video.service';
import { UploadComponent } from './upload/upload.component';
import { AccountConfigComponent } from './account-config/account-config.component';
import { UserSettingsComponent } from './account-config/user-settings/user-settings.component';
import { VideoSettingsComponent } from './account-config/video-settings/video-settings.component';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenusComponent,
    VideoSearchComponent,
    VideoComponent,
    VideoPlayerComponent,
    VideosUsuarioRelacionadoComponent,
    VideoDescricaoComponent,
    ComentariosComponent,
    LoginComponent,
    SnackbarComponent,
    ComentarioComponent,
    PerfilUsuarioComponent,
    UploadComponent,
    AccountConfigComponent,
    UserSettingsComponent,
    VideoSettingsComponent,
    ModalConfirmComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [VideosServiceService, ComentariosService, LoginService, NotificationService, UserService, AuthGuardGuard,
  CurtidaComentarioService, CurtidaVideoService, DescurtidaComentarioService, DescurtidaVideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
