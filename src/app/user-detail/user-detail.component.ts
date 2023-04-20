import { Component, OnInit } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: User = new User();
  userId = '';
  private coll: CollectionReference<DocumentData>;
  docRef: any;
  user$: Observable<any>;

  constructor(private route: ActivatedRoute, private firestore: Firestore) {
    this.coll = collection(this.firestore, 'users');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id').trim();
      console.log(this.userId);
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

  editMenu() {

  }
}
