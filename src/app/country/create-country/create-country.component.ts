import { Component, EventEmitter, HostListener, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CountryDto, CountryServiceProxy, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-country',
  templateUrl: './create-country.component.html',
  styleUrls: ['./create-country.component.css']
})
export class CreateCountryComponent extends AppComponentBase implements OnInit {

  @Output() onSave = new EventEmitter<any>();
  constructor(public bsModalRef: BsModalRef, public _countryservice: CountryServiceProxy, injector: Injector,) {
    super(injector);
  }
  saving = false;
  country = new CountryDto();
  ngOnInit(): void {
  }

  save(): void {
    this.saving = true;

    // this.user.roleNames = this.getCheckedRoles();

    this._countryservice.create(this.country).subscribe(
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
