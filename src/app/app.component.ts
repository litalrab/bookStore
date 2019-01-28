
import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import 'bootstrap/dist/js/bootstrap.bundle';
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { ShoppingCartService } from "./services/shopping-cart.service";
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  
  constructor(
    public authService: AuthService,
    private router: Router,
    public ShoppingCartService: ShoppingCartService  ) {}

  ngOnInit() {}
  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
