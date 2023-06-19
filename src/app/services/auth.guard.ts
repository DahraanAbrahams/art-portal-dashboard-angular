import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate { 

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
    if (this.authService.isLoggedInGuard) {
      console.log("Access granted");
      return true
    } else { 
      this.toastr.warning('Access Denied. Please Login...')
      this.router.navigate(['/login'])
      return false
    }
    
    }
}