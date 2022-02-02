import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  accountConnected: string = null!;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAccount();
  }

  logout(): void {
    this.authService.logout()
  }
  
  async getAccount(): Promise<void> {
    return this.authService.getAccountConnected().then((response: string) => {
      if (response) {
        this.accountConnected = response
      } else {
        console.log('not connected');
      }
    });
  }

}
