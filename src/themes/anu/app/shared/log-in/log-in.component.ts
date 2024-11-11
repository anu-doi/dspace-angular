import { Component, OnInit } from '@angular/core';
import { LogInComponent as BaseComponent } from '../../../../../app/shared/log-in/log-in.component';
import { AuthMethod } from 'src/app/core/auth/models/auth.method';
import { filter, map, Observable } from 'rxjs';
import { getAuthenticationMethods } from 'src/app/core/auth/selectors';
import { rendersAuthMethodType } from 'src/app/shared/log-in/methods/log-in.methods-decorator';
import { select, Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CoreState } from 'src/app/core/core-state.model';
import { forEach } from 'lodash';

@Component({
  selector: 'ds-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['../../../../../app/shared/log-in/log-in.component.scss'],
})

export class LogInComponent extends BaseComponent implements OnInit {

  methods: AuthMethod[];

  ngOnInit(): void {
    super.ngOnInit();
    this.authMethods.subscribe(method => this.methods = method);
    this.methods.forEach(method => {
      if(method.authMethodType.includes('oidc') && method.position == 0){
        this.methods.splice(1);
      }
    })
  }
}
