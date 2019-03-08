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
   CurrenetUserKey: any;

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
  getCurrenetUserKey() {
    return this.CurrenetUserKey;
  }
  updateUserCurrenetUserKey(emailId : string) {

    
//     this.db.list('clients', (ref) =>
//           ref.orderByChild('email').equalTo(emailId)
//         ).query.on("value", function(snapshot) {
//       // storing the snapshot.val() in a variable for convenience
//       var sv = snapshot.val();
//       console.log("sv " + sv); //returns [obj obj]

//       // Getting an array of each key in the snapshot object
//       var svArr = Object.keys(sv);
//       console.log("svArr " + s
// vArr); // [key1, key2, ..., keyn]

//       CurrenetUserKey=sv;
//       console.log("svArr " + CurrenetUserKey); // [key1, key2, ..., keyn]

//       // Console.log name of first key
//       // console.log(svArr[0].name);
// }, function(errorObject) {
//   console.log("Errors handled: " + errorObject.code);
// });










    // this.CurrenetUserKey=this.db.list('clients', (ref) =>
    //       ref.orderByChild('email').equalTo(emailId)
    //     ).query.on("child_added", function (snapshot) {
    //       console.log(snapshot.key);
    //    //   return snapshot.key;
    //     } )
  }
}