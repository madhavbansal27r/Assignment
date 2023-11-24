import { Component } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateCountryComponent } from './create-country/create-country.component';
import { EditCountryComponent } from './edit-country/edit-country.component';
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
export class CountryComponent {

  constructor(private _modalService: BsModalService) { }
  createcountry() {
    console.log('Create Country Hit');
    this.showCreateOrEditUserDialog();
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
