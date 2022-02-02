import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import Web3 from 'web3';

@Injectable()
export class AuthGuard implements CanActivate {
  web3: Web3 = new Web3(window.web3.currentProvider);

  constructor(private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if ((await this.getAccountConnected()) !== null) {
      return true;
    }
    this.router.navigate(['/sign']);
    return false;
  }

  async getAccountConnected(): Promise<string> {
    if (localStorage.getItem('myProfileAddress') === null) {
      return null!;
    }

    return this.web3.eth
      .getAccounts()
      .then((response: string[]) => response[0])
      .catch(() => null!);
  }
}
