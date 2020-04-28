import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  action: string;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.initForm(data);
      this.action = data.action;
    });
  }

  initForm(data: any): void {
    // console.log(this.firebaseService.getSelectedItem());
    // console.log(this.firebaseService.selectedItem);
    if (data.action === 'edit') {
      this.form = new FormGroup({
        key: new FormControl(this.firebaseService.selectedItem.key),
        id: new FormControl(
          this.firebaseService.selectedItem.id,
          Validators.required
        ),
        image: new FormControl(
          this.firebaseService.selectedItem.image
        ),
        author: new FormControl(
          this.firebaseService.selectedItem.author,
          Validators.required
        ),
        title: new FormControl(
          this.firebaseService.selectedItem.title,
          Validators.required
        ),
        year: new FormControl(
          this.firebaseService.selectedItem.year,
          Validators.required
        ),
        rating: new FormControl(
          this.firebaseService.selectedItem.rating,
          Validators.required
        ),
        favourite: new FormControl(
          this.firebaseService.selectedItem.favourite,
          Validators.required
        ),
        isbn: new FormControl(
          this.firebaseService.selectedItem.isbn,
          Validators.required
        ),
        pages: new FormControl(
          this.firebaseService.selectedItem.pages,
          Validators.required
        ),
        editorial: new FormControl(
          this.firebaseService.selectedItem.editorial,
          Validators.required
        ),
        category: new FormControl(
          this.firebaseService.selectedItem.category,
          Validators.required
        ),
        comment: new FormControl(
          this.firebaseService.selectedItem.comment,
          Validators.required
        ),
      });
    } else if (data.action === 'new') {
      this.form = new FormGroup({
        key: new FormControl(null),
        id: new FormControl('', Validators.required),
        image: new FormControl(''),
        author: new FormControl('', Validators.required),
        title: new FormControl('', Validators.required),
        year: new FormControl('', Validators.required),
        rating: new FormControl('', Validators.required),
        favourite: new FormControl(''),
        isbn: new FormControl(''),
        pages: new FormControl(''),
        editorial: new FormControl(''),
        category: new FormControl('', Validators.required),
        comment: new FormControl('', Validators.required),
      });
    }
  }

  resetForm(): void {
    this.form.reset();
    this.initForm({ action: 'new' });
  }

  onSubmit(event: any) {
    if (this.action === 'edit') {
      this.firebaseService.edit(this.form.value).then((res) => {
        this.firebaseService.updateList();
        this.resetForm();
        this.router.navigate(['/listado']);
      });
    } else if (this.action === 'new') {
      this.firebaseService.create(this.form.value).then((res) => {
        this.resetForm();
        this.router.navigate(['/listado']);
      });
    }
  }
}
