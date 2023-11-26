import { Component, HostListener, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-country',
  templateUrl: './create-country.component.html',
  styleUrls: ['./create-country.component.css']
})
export class CreateCountryComponent extends AppComponentBase implements OnInit {
  constructor(public bsModalRef: BsModalRef, public _userService: UserServiceProxy, injector: Injector,) {
    super(injector);
  }

  saving = false;
  countryName: string = '';
  ngOnInit(): void {
  }


  save(): void {
    this.saving = true;

    // this.user.roleNames = this.getCheckedRoles();

    // this._userService.create_country(this.countryName).subscribe(
    //   () => {
    //     this.notify.info(this.l('SavedSuccessfully'));
    //     this.bsModalRef.hide();
    //     // this.onSave.emit();
    //   },
    //   () => {
    //     this.saving = false;
    //   }
    // );
  }
}
