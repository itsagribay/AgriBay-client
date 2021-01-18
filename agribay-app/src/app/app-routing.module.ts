import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
 // { path: '', component: HomeComponent },
 // { path: 'view-post/:id', component: ViewPostComponent },canActivate: [AuthGuard] 
  { path: 'user-profile/:name', component: UserProfileComponent, canActivate: [AuthGuard]  },
 // { path: 'list-subreddits', component: ListSubredditsComponent },
 // { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] },
 // { path: 'create-subreddit', component: CreateSubredditComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent }
];


@NgModule({
  declarations: [],
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
