import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CountryDto, CountryServiceProxy, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.css']
})
export class EditCountryComponent extends AppComponentBase implements OnInit {

  @Output() onSave = new EventEmitter<any>();

  constructor(public bsModalRef: BsModalRef, public _countryservice: CountryServiceProxy, Injector: Injector) {
    super(Injector);
  }
  saving = false;
  country = new CountryDto();
  // roles: RoleDto[] = [];
  // checkedRolesMap: { [key: string]: boolean } = {};
  id: any;

  // country:any={
  //   id:2312,
  //   name:"Demo",
  // }
  ngOnInit(): void {
    this._countryservice.get(this.id).subscribe((result) => {
      this.country = result;

      // this._countryservice.getRoles().subscribe((result2) => {
      //   this.roles = result2.items;
      //   this.setInitialRolesStatus();
      // });
    });
  }

  save(): void {
    this.saving = true;

    // this.country.roleNames = this.getCheckedRoles();

    this._countryservice.update(this.country).subscribe(
      () => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }

}
