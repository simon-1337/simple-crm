import { Component } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-adress',
  templateUrl: './dialog-edit-adress.component.html',
  styleUrls: ['./dialog-edit-adress.component.scss']
})
export class DialogEditAdressComponent {
  user: User;
  userId: string;
  loading = false;

  docRef: any;
  private coll: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogEditAdressComponent>) {
    this.coll = collection(this.firestore, 'users');
  }

  saveUser() {
    this.loading = true;
    this.docRef = doc(this.coll, this.userId);
    updateDoc(this.docRef, this.user.toJSON()).then( () => {
      this.loading = false;
      this.dialogRef.close();
    });
  }
}
