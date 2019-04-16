import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { TokenStorage } from "./token.storage";

@Injectable()
export class AuthGuardService implements CanActivate  {
  constructor(private token: TokenStorage, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('canActivate');
    if (this.token.getToken()) {
      console.log('has token', this.token.getToken());
      this.router.navigate(['/home']);
      return false;
    }
    console.log('has no token', this.token.getToken());
    return true;
  }
}
