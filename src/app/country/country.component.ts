import { Component, Injector } from '@angular/core';
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
export class CountryComponent extends AppComponentBase {
  users: [];
  constructor(private _modalService: BsModalService, Injector: Injector,public _userService:UserServiceProxy) {
    super(Injector);
  }
  createcountry() {
    console.log('Create Country Hit');
    this.showCreateOrEditUserDialog();
  }

  // protected delete(user: UserDto): void {
  //   abp.message.confirm(
  //     this.l('UserDeleteWarningMessage', user.fullName),
  //     undefined,
  //     (result: boolean) => {
  //       if (result) {
  //         this._userService.delete(user.id).subscribe(() => {
  //           abp.notify.success(this.l('SuccessfullyDeleted'));
  //           // this.refresh();
  //         });
  //       }
  //     }
  //   );
  // }

  public editUser(id: any) {
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
