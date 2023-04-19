import { Component, inject } from '@angular/core';
import { User } from '../models/user.class';
import { CollectionReference, DocumentData, Firestore, addDoc, collection } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  
  user = new User();
  birthDate!: Date;
  loading = false;

  private coll: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogAddUserComponent>) {
    this.coll = collection(this.firestore, 'users');
  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.loading = true;

    addDoc(this.coll, this.user.toJSON()).then( (userInfo: any) => {
      this.loading = false;
      console.log(userInfo);
      this.dialogRef.close();
    });
  }
}
