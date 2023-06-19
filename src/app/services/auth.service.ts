import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;

  constructor(
    private angFireAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router
  ) {}

  login(email, password) {
    this.angFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((loginRef) => {
        this.toastr.success('Logged In Successfully');
        this.getUserDetails();
        this.loggedIn.next(true);
        this.isLoggedInGuard = true;
        this.router.navigate(['/'])
      })
      .catch((e) => {
        this.toastr.warning(
          'The password is invalid or the user does not have a password. (auth/wrong-password)'
        );
      });
  }

  getUserDetails() { 
    this.angFireAuth.authState.subscribe(user => { 
      localStorage.setItem('user', JSON.stringify(user))
    })
  }

  logOut() { 
    this.angFireAuth.signOut().then(() => { 
      this.toastr.success('Logged Out Successfully');
      localStorage.removeItem('user')
      this.loggedIn.next(false);
      this.isLoggedInGuard = false;
      this.router.navigate(['/login'])
    })
  }

  isLoggedIn() { 
    return this.loggedIn.asObservable()
  }
}
