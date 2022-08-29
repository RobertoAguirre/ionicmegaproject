import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-plainprofile',
  templateUrl: './plainprofile.component.html',
  styleUrls: ['./plainprofile.component.scss'],
})
export class PlainprofileComponent implements OnInit {

  user$ = this.auth.isAuthenticated$.pipe(switchMap(() => this.auth.user$));

  constructor(public auth: AuthService) {}

  ngOnInit() {}

}
