import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { Web3Service } from 'src/app/core/service/web3/web3.service';
import Web3 from 'web3';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {
  web3: Web3 = null!;
  accountConnected: string = null!;

  constructor(
    private web3Service: Web3Service,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.web3 = this.web3Service.checkIfWeb3IsInstalled();
    this.getAccount()
  }

  login(): void {
    return this.authService.login();
  }

  getAccount(): void {
    this.web3.eth.getAccounts().then(
      (response: string[]) => {
        this.accountConnected = response[0];
      },
      () => {
        console.log('get accounts error');
      }
    );
  }

  logout(): void {
    this.accountConnected = null!;
  }


}
