import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CountryDto, CountryServiceProxy, StateDto, StateServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-state',
  templateUrl: './create-state.component.html',
  styleUrls: ['./create-state.component.css']
})
export class CreateStateComponent extends AppComponentBase implements OnInit {

  @Output() onSave = new EventEmitter<any>();
  constructor(public bsModalRef: BsModalRef, public _countryservice: CountryServiceProxy, public _stateservice: StateServiceProxy, injector: Injector,) {
    super(injector);
  }
  saving = false;

  countryid: any;
  state = new StateDto();
  finalstate = new StateDto();
  countrydata: any;
  ngOnInit(): void {
    this.getallcountry();

  }

  getallcountry(): void {
    this._countryservice.getcountrydata().subscribe((countrydata: any) => {
      this.countrydata = countrydata.result.items;
    });
  }

  gettingvalues() {
    let statename = this.state.sName; // this is ok
    let selectedcountryname = this.state.countryName; // assuming you have a property in 'state' for the selected country code
    //get the id of selectedcountryname
    for (let country of this.countrydata) {
      if (selectedcountryname == country.name) {
        this.countryid = country.id;
      }
    }

    this.finalstate.sName = statename;
    this.finalstate.countryId = this.countryid;
  }


  save(): void {
    this.saving = true;
    this.gettingvalues();
    this._stateservice.create(this.finalstate).subscribe(
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
