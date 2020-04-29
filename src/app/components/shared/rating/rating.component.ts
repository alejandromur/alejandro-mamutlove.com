import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() rating: number;
  stars = new Array(5);

  constructor() { }

  ngOnInit() {
  }

  isActive(idx: number) {
    console.log(idx);

  }
}
