import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-adress',
  templateUrl: './dialog-edit-adress.component.html',
  styleUrls: ['./dialog-edit-adress.component.scss']
})
export class DialogEditAdressComponent {
  user: User;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogEditAdressComponent>) {}

  saveUser() {

  }
}
