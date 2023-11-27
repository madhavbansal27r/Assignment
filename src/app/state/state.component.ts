import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CountryServiceProxy, StateDto, StateDtoPagedResultDto, StateServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateStateComponent } from './create-state/create-state.component';
import { EditStateComponent } from './edit-state/edit-state.component';
import { finalize } from 'rxjs/operators';

class PagedStatesRequestDto extends PagedRequestDto {
  keyword: string;

}
@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css'],
  animations: [appModuleAnimation()]

})
export class StateComponent extends PagedListingComponentBase<StateDto> implements OnInit {
  States: StateDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;
  datalength: number;
  countrydata: any;

  constructor(
    injector: Injector,
    private _StateService: StateServiceProxy,
    private _countryService: CountryServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createState(): void {
    this.showCreateOrEditStateDialog();
  }

  editState(State: StateDto): void {
    this.showCreateOrEditStateDialog(State.id);
  }

  clearFilters(): void {
    this.keyword = '';
    this.getDataPage(1);
  }

  protected list(
    request: PagedStatesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._StateService
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
      .subscribe((result: StateDtoPagedResultDto) => {
        this.States = result.items;
        this.showPaging(result, pageNumber);
        this.totaldatacount();
        this.getallcountry();
      });

  }

  totaldatacount() {
    this.datalength = this.States.length;
  }

  getallcountry(): void {
    this._countryService.getcountrydata().subscribe((countrydata: any) => {
      this.countrydata = countrydata.result.items;
    });
  }

  statecountryname(countryid: any) {
    for (let country of this.countrydata) {
      if (countryid == country.id) {
        return country.name;
      }
    }
  }

  protected delete(State: StateDto): void {
    abp.message.confirm(
      this.l('UserDeleteWarningMessage', State.sName),
      undefined,
      (result: boolean) => {
        if (result) {
          this._StateService.delete(State.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }
  private showCreateOrEditStateDialog(id?: any): void {
    let createOrEditStateDialog: BsModalRef;
    if (!id) {
      createOrEditStateDialog = this._modalService.show(
        CreateStateComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditStateDialog = this._modalService.show(
        EditStateComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditStateDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
