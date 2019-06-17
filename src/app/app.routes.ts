import { AccountConfigComponent } from './account-config/account-config.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { LoginComponent } from './login/login.component';
import { VideoSearchComponent } from './video-search/video-search.component';
import { AppComponent } from './app.component';
import {Routes} from '@angular/router';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { UploadComponent } from './upload/upload.component';

export const ROUTES: Routes = [
    {path: '', component: VideoSearchComponent},
    {path: 'emAlta', component: VideoSearchComponent},
    {path: 'liked', component: VideoSearchComponent, canActivate: [AuthGuardGuard]},
    {path: 'video/:id', component: VideoPlayerComponent},
    {path: 'login', component: LoginComponent},
    {path: 'cadastro', component: LoginComponent},
    {path: 'perfil/:id', component: PerfilUsuarioComponent},
    {path: 'upload', component: UploadComponent, canActivate: [AuthGuardGuard]},
    {path: 'conta', component: AccountConfigComponent, canActivate: [AuthGuardGuard]}
];
