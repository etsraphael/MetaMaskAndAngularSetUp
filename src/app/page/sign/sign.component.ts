import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { Web3Service } from 'src/app/core/service/web3/web3.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {
  constructor(
    private web3Service: Web3Service,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.web3Service.checkIfWeb3IsInstalled();
  }

  login(): void {
    return this.authService.login();
  }
}
