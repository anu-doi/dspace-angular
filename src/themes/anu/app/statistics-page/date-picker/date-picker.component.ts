import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ds-date-picker-range',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    DatePipe,
  ],
})
export class DatePickerComponent implements OnInit {
  @Output() dateChange = new EventEmitter();

  changeDate: boolean;
  range: FormGroup;
  myDatepipe!: any;
  convertedStartDate: string;
  convertedEndDate: string;
  type: string;

  sub: Subscription;
  initialMinDate: string;
  initialMaxDate: string;
  href: string;

  constructor(datepipe: DatePipe, protected route: ActivatedRoute,
    protected router: Router) {
    this.myDatepipe = datepipe;
    this.range = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.href = this.router.url;
    this.sub = this.route.queryParams
      .subscribe(params => {
        this.initialMinDate = params.minDate;
        this.initialMaxDate = params.maxDate;
      });
    if (this.initialMinDate != null && this.initialMaxDate != null) {
      this.range = new FormGroup({
        startDate: new FormControl(new Date(Number(this.initialMinDate.split('-')[0]), Number(this.initialMinDate.split('-')[1]) - 1, Number(this.initialMinDate.split('-')[2]))),
        endDate: new FormControl(new Date(Number(this.initialMaxDate.split('-')[0]), Number(this.initialMaxDate.split('-')[1]) - 1, Number(this.initialMaxDate.split('-')[2]))),
      });
    }
  }

  onSubmit() {
    this.convertedStartDate = this.myDatepipe.transform(this.range.value.startDate, 'yyyy-MM-dd');
    this.convertedEndDate = this.myDatepipe.transform(this.range.value.endDate, 'yyyy-MM-dd');
    this.router.navigate([], {
      queryParams: Object.assign({ minDate: this.convertedStartDate, maxDate: this.convertedEndDate }),
      queryParamsHandling: 'merge'
    });
    this.changeDate = true;
    this.dateChange.emit(this.convertedStartDate+":"+this.convertedEndDate+":"+this.changeDate);
  }

  onReset(): void {
    this.router.navigate([], {
      queryParams: {
        'minDate': null,
        'maxDate': null,
      },
      queryParamsHandling: 'merge'
    });
    this.href = this.href.split('&')[0];
    window.location.href = this.href;
  }
}
