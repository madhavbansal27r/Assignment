import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateCountryComponent } from './create-country/create-country.component';
import { EditCountryComponent } from './edit-country/edit-country.component';

import { CountryDto, CountryDtoPagedResultDto } from '@shared/service-proxies/service-proxies';
import { CountryServiceProxy } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
// import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';


class PagedCountryRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  animations: [appModuleAnimation()]

})

export class CountryComponent extends PagedListingComponentBase<CountryDto> {
  country: CountryDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    // private _userService: UserServiceProxy,
    private _modalService: BsModalService,
    private _countryService: CountryServiceProxy,
  ) {
    super(injector);
  }


  createUser(): void {
    this.showCreateOrEditUserDialog();
  }

  editUser(country: CountryDto): void {
    this.showCreateOrEditUserDialog(country.id);
  }

  // public resetPassword(country: CountryDto): void {
  //   this.showResetPasswordUserDialog(country.id);
  // }

  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }



  protected list(request: PagedCountryRequestDto,pageNumber: number,finishedCallback: Function): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._countryService
      .getAll(
        request.keyword,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: CountryDtoPagedResultDto) => {
        this.country = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(country: CountryDto): void {
    abp.message.confirm(
      this.l('UserDeleteWarningMessage', country.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._countryService.delete(country.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

  // private showResetPasswordUserDialog(id?: number): void {
  //   this._modalService.show(ResetPasswordDialogComponent, {
  //     class: 'modal-lg',
  //     initialState: {
  //       id: id,
  //     },
  //   });
  // }

  private showCreateOrEditUserDialog(id?: any): void {
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

    createOrEditUserDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
