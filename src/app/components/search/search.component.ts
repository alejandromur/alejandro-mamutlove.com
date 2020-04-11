import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { FirebaseService } from "src/app/services/firebase.service";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { fromEvent } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  filter,
} from "rxjs/operators";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit, AfterViewInit {
  @ViewChild("input", { static: false }) input: ElementRef;

  searchForm: FormGroup = this.fb.group({
    queryField: new FormControl(""),
    filter: ["id"],
  });

  rawItems: any;
  items: any;

  constructor(
    public fb: FormBuilder,
    public firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.getData();

    // this.searchForm
    //   .get("queryField")
    //   .valueChanges.subscribe((result) => console.log(result));
  }

  ngAfterViewInit() {
    // fromEvent(this.input.nativeElement, "keyup")
    //   .pipe(
    //     filter(Boolean),
    //     debounceTime(200),
    //     distinctUntilChanged(),
    //     tap((event: KeyboardEvent) => {
    //       const query = this.input.nativeElement.value;
    //       console.log(query);
    //       this.items = this.rawItems.filter((item) =>
    //         item.person.includes(query)
    //       );
    //     })
    //   )
    //   .subscribe();
    fromEvent(this.input.nativeElement, "keyup")
      .pipe(
        filter(Boolean),
        debounceTime(200),
        distinctUntilChanged(),
        tap((event: KeyboardEvent) => {
          const query: any = this.input.nativeElement.value;
          const channel = this.searchForm.get("filter").value;
          console.log(channel, query);

          this.items = this.rawItems.filter((item) => {
            if (channel === "id") {
              let channelId = item.id;
              channelId = channelId.toString();
              return channelId.includes(query);
            }
            return item[channel].includes(query);
          });
        })
      )
      .subscribe();
  }

  getData() {
    this.firebaseService
      .getList()
      .snapshotChanges()
      .subscribe((result) => {
        this.rawItems = result.reverse().map((c: any) => ({
          key: c.payload.key,
          ...c.payload.val(),
        }));
      });
  }
}
