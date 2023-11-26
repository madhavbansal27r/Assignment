import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
// import { CreateCountryComponent } from './create-country/create-country.component';
// import { EditCountryComponent } from './edit-country/edit-country.component';
// import { AppComponentBase } from '@shared/app-component-base';
import { CountryDto, CountryDtoPagedResultDto, CountryServiceProxy, UserServiceProxy } from '@shared/service-proxies/service-proxies';
// import { CustomApiService } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';

// import {
//   PagedListingComponentBase,
//   PagedRequestDto
// } from 'shared/paged-listing-component-base';

class PagedCompanysRequestDto extends PagedRequestDto {
  keyword: string;

}
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  animations: [appModuleAnimation()]
})
export class CountryComponent extends PagedListingComponentBase<CountryDto> {
  countrys: CountryDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;
 

  constructor(
    injector: Injector,
    private _countryService: CountryServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createCountry(): void {
    // this.showCreateOrEditCountryDialog();
  }

  editCountry(country: CountryDto): void {
   // this.showCreateOrEditCountryDialog(country.id);
  }

  clearFilters(): void {
    this.keyword = '';
    this.getDataPage(1);
  }

  protected list(
    request: PagedCompanysRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

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
        this.countrys = result.items;
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
  private showCreateOrEditUserDialog(id?: string): void {
    let createOrEditCountryDialog: BsModalRef;
    if (!id) {
      // createOrEditUserDialog = this._modalService.show(
      //   CreateUserDialogComponent,
      //   {
      //     class: 'modal-lg',
      //   }
      // );
    } else {
      // createOrEditUserDialog = this._modalService.show(
      //   EditUserDialogComponent,
      //   {
      //     class: 'modal-lg',
      //     initialState: {
      //       id: id,
      //     },
      //   }
      // );
    }

    createOrEditCountryDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}