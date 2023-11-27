import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { StateDto, StateServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-state',
  templateUrl: './edit-state.component.html',
  styleUrls: ['./edit-state.component.css']
})
export class EditStateComponent extends AppComponentBase implements OnInit {

  @Output() onSave = new EventEmitter<any>();

  constructor(public bsModalRef: BsModalRef,public _stateservice: StateServiceProxy,Injector:Injector) {
    super(Injector);
  }
  saving = false;
  state = new StateDto();
  // roles: RoleDto[] = [];
  // checkedRolesMap: { [key: string]: boolean } = {};
  id: any;

  // country:any={
  //   id:2312,
  //   name:"Demo",
  // }
  ngOnInit(): void {
    this._stateservice.get(this.id).subscribe((result) => {
      this.state = result;

      // this._countryservice.getRoles().subscribe((result2) => {
      //   this.roles = result2.items;
      //   this.setInitialRolesStatus();
      // });
    });
  }

  save(): void {
    this.saving = true;

    // this.country.roleNames = this.getCheckedRoles();

    this._stateservice.update(this.state).subscribe(
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
