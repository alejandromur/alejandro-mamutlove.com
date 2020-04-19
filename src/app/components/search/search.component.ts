import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { fromEvent } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  filter,
} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit {
  @ViewChild('input', { static: false }) input: ElementRef;
  @Output() query = new EventEmitter();

  searchForm: FormGroup = this.fb.group({
    queryField: new FormControl(''),
    filter: ['id'],
  });

  constructor(
    public fb: FormBuilder,
  ) {}

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(200),
        distinctUntilChanged(),
        tap((event: KeyboardEvent) => {
          const query: any = this.input.nativeElement.value;
          const channel = this.searchForm.get('filter').value;
          // console.log(channel, query);
          this.query.emit([channel, query]);
        })
      )
      .subscribe();
  }
}
