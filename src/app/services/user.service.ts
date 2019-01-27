import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList} from "angularfire2/database";
  import { Observable } from 'rxjs/Observable';
  import 'rxjs/add/operator/map';
  import { map } from 'rxjs/operators';
import * as moment from "moment";
import { User } from "../models/user.module";

@Injectable()
export class UserService {
  selectedUser: User = new User();
  usersRef: AngularFireList<User>;
  users: Observable<any[]>;

  location = {
    lat: null,
    lon: null
  };

  constructor(private db: AngularFireDatabase) {
        this.usersRef = this.db.list("/clients");

    
     this.users = this.usersRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  getUsers() {
    
    return this.users;
  }

  createUser(data: any) {
    
    data.location = this.location;
    data.createdOn = moment(new Date()).format("X");
    data.isAdmin = false;
    this.usersRef.push(data);
  }

  isAdmin(emailId: string) {
    return this.db.list("clients", ref =>
      ref.orderByChild("email").equalTo(emailId)
    );
  }
  updateUser(user: User) {
    this.usersRef.update(user.$key, user);
  }

  setLocation(lat, lon) {
    this.location.lat = lat;
    this.location.lon = lon;
  }
}