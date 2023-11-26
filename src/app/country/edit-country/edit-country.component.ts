import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.css']
})
export class EditCountryComponent extends AppComponentBase implements OnInit {
  constructor(public bsModalRef: BsModalRef,public _userService: UserServiceProxy,Injector:Injector) {
    super(Injector);
  }
  saving = false;
  countryName: string = 'Demo';
  id: number;

  country:any={
    id:2312,
    name:"Demo",
  }
  ngOnInit(): void {
    // service to fetch data
  }

   save(updatecountry:any): void {
  //   this.saving = true;
  //   this._userService.update_country(updatecountry).subscribe(
  //     () => {
  //       this.notify.info(this.l('UpdatedSucessfully'));
  //       this.bsModalRef.hide();
  //       // this.onSave.emit();
  //     },
  //     () => {
  //       this.saving = false;
  //     }
  //   );
   }

}
