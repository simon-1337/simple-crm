import { Component, OnInit } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAdressComponent } from '../dialog-edit-adress/dialog-edit-adress.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: User = new User;
  userId = '';
  private coll: CollectionReference<DocumentData>;
  docRef: any;
  user$: Observable<any>;

  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) {
    this.coll = collection(this.firestore, 'users');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id').trim();
      this.getUser()
    });

  }

  getUser() {
    this.docRef = doc(this.coll, this.userId);
    this.user$ = docData(this.docRef);
    this.user$.subscribe(user => {
      // Update the local user object with the retrieved data
      this.user = new User(user);
    });
  }

  editUserAddress() {
    const dialog = this.dialog.open(DialogEditAdressComponent);
    //forward the variable userId and the Object user to the dialog component 
    dialog.componentInstance.user = new User(this.user.toJSON()); //copy of our user
    dialog.componentInstance.userId = this.userId;
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    //forward the variable userId and the Object user to the dialog component
    dialog.componentInstance.user = new User(this.user.toJSON()); //copy of our user
    dialog.componentInstance.userId = this.userId;
  }
}
