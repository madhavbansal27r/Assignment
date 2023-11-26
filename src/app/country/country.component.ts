import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateCountryComponent } from './create-country/create-country.component';
import { EditCountryComponent } from './edit-country/edit-country.component';
import { AppComponentBase } from '@shared/app-component-base';
import { UserServiceProxy } from '@shared/service-proxies/service-proxies';

// import {
//   PagedListingComponentBase,
//   PagedRequestDto
// } from 'shared/paged-listing-component-base';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  animations: [appModuleAnimation()]

})
export class CountryComponent extends AppComponentBase implements OnInit {
  Countries: any;
  tempdata = [
    { "id": 1, "name": "John" },
    { "id": 2, "name": "Jane" },
    { "id": 3, "name": "Alice" },
    { "id": 4, "name": "Bob" },
    { "id": 5, "name": "Eve" },
    { "id": 6, "name": "Charlie" },
    { "id": 7, "name": "David" },
    { "id": 8, "name": "Emily" },
    { "id": 9, "name": "Frank" },
    { "id": 10, "name": "Grace" }
  ];

  constructor(private _modalService: BsModalService, Injector: Injector, public _userService: UserServiceProxy) {
    super(Injector);
  }
  ngOnInit(): void {
    // call the service to fetch all country
    this._userService.Get_Country().subscribe((data: any) => {
      this.Countries = data;
      // this.showPaging(result, pageNumber);
    });
    this.Countries = this.tempdata;
  }
  createcountry() {
    this.showCreateOrEditUserDialog();
  }

  protected delete(id: any): void {
    abp.message.confirm(
      this.l('UserDeleteWarningMessage', id),
      undefined,
      (result: boolean) => {
        if (result) {
          this._userService.delete(id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            // this.refresh();
          });
        }
      }
    );
  }

  editUser(id: any) {
    this.showCreateOrEditUserDialog(id);
  }
  private showCreateOrEditUserDialog(id?: number): void {
    let createOrEditUserDialog: BsModalRef;
    if (!id) {
      createOrEditUserDialog = this._modalService.show(
        CreateCountryComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditUserDialog = this._modalService.show(
        EditCountryComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }




    // createOrEditUserDialog.content.onSave.subscribe(() => {
    //   this.refresh();
    // });
  }
}
