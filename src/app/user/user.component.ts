import { Component, OnInit} from '@angular/core';
import {TooltipPosition} from '@angular/material/tooltip';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { CollectionReference, DocumentData, Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{

  user = new User();
  private coll: CollectionReference<DocumentData>;
  users$!: Observable<any>;
  allUsers!: [];

  constructor(public dialog: MatDialog, private firestore: Firestore) {
    this.coll = collection(this.firestore, 'users');
  }

  ngOnInit() {
    this.users$ = collectionData(this.coll, { idField: 'id' });

    //To subscribe the updates -> every time something in users changes this function is called
    this.users$.subscribe( (changes) =>  {  
      this.allUsers = changes;
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
