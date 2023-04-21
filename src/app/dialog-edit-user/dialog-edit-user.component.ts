import { Component } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  user: User;
  loading = false;
  birthDate!: Date;
  userId: string;

  docRef: any;
  private coll: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogEditUserComponent>) { 
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
