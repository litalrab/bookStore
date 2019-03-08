import { NgForm, EmailValidator } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ToastyService, ToastOptions, ToastyConfig } from "ng2-toasty";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { User } from "../../models/user.module";
import { Book } from '../../Book';
import {
  AngularFireDatabase,
  AngularFireList
} from "angularfire2/database";
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [EmailValidator]
})
export class LoginComponent implements OnInit {
  
  user = {
    emailId: "",
    loginPassword: ""
  };
  //declare var userKey: any;

  //userKey ={};
  errorInUserCreate = false;
  errorMessage: any;
  createUser;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastyService: ToastyService,
    private router: Router,
    private route: ActivatedRoute,
    private toastyConfig: ToastyConfig, private db: AngularFireDatabase
  ) {
    this.toastyConfig.position = "top-right";
    this.toastyConfig.theme = "material";

    this.createUser = new User();
  }

  ngOnInit() { }

  addUser(userForm: NgForm) {
    userForm.value["isAdmin"] = false;
    this.authService
      .createUserWithEmailAndPassword(
        userForm.value["emailId"],
        userForm.value["password"]
      )
      .then(res => {
        const user = {
          email: res.user.email,
          famil_name: res.user.displayName,
          uid: res.user.uid,
          verified_email: res.user.emailVerified,
          phoneNumber: res.user.phoneNumber,
          picture: res.user.photoURL
        };

        this.userService.createUser(user);

        const toastOption: ToastOptions = {
          title: "User Registeration",
          msg: "Registering",
          showClose: true,
          timeout: 3000,
          theme: "material"
        };
        this.toastyService.wait(toastOption);
        setTimeout((router: Router) => {
          $("#createUserForm").modal("hide");
          this.router.navigate(["home"]);
        }, 1500);
      })
      .catch(err => {
        this.errorInUserCreate = true;
        this.errorMessage = err;
        const toastOption: ToastOptions = {
          title: "Error while Creating User",
          msg: err,
          showClose: true,
          timeout: 5000,
          theme: "material"
        };
        this.toastyService.error(toastOption);
      });
  }

  signInWithEmail(userForm: NgForm) {
    var userKey={};
    this.authService
      .signInRegular(userForm.value["emailId"], userForm.value["loginPassword"])
      .then(res => {
        const toastOption: ToastOptions = {
          title: "Authentication Success",
          msg: "Logging in please wait",
          showClose: true,
          timeout: 5000,
          theme: "material"
        };
        this.toastyService.wait(toastOption);

        const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");

        setTimeout((router: Router) => {
          this.router.navigate([returnUrl || "home"]);
        }, 1500);
        // this.userService.updateUserCurrenetUserKey(userForm.value["emailId"]);
        // console.log(this.userService.getCurrenetUserKey());
        // const user = this.authService.getLoggedInUser();
        // console.log(user.$key)
        // console.log(this.db.list('clients', (ref) =>
        //   ref.orderByChild('email').equalTo(userForm.value["emailId"])
        // ).query.on("child_added", function (snapshot) {
        //   console.log(snapshot.key);
        // }));

        //       var ref = new Firebase("https://dinosaur-facts.firebaseio.com/dinosaurs");
        //       ref.orderByChild("height").on("child_added", function(snapshot) {
        //         console.log(snapshot.key() + " was " + snapshot.val().height + " meters tall");
        //       });
        //       var ref = this.db.ref("dinosaurs");
        //       ref.orderByChild("height").equalTo(25).on("child_added", function(snapshot) {
        //         console.log(snapshot.key);
        //       });
        //       this.db.database.ref.child("studentList")
        //  .orderByChild("name")
        //  .equalTo("54ca2c11d1afc1612871624a")
        //  .on("child_added", function(snapshot) {
        //     console.log(snapshot.val());
        //   });


        //  this.CurrenetUserKey=
        this.db.list('clients', (ref) =>
          ref.orderByChild('email').equalTo(userForm.value["emailId"])
        ).query.on("child_added", function (snapshot) {
          console.log(snapshot.key);
          //   this.userKey=snapshot.key;
          //   return snapshot.key;
        })
        console.log( this.db.list('clients', (ref) =>
          ref.orderByChild('email').equalTo(userForm.value["emailId"])).query.once('value').then(function (snapshot) {
            var value = Object.keys(snapshot.val());
            console.log(value)
            userKey=value;
            
            // this.userKey=value;
            console.log(Object.keys(snapshot.val()))
            console.log( userKey)
            // console.log( this.userKey)
              // value is an object containing one or more of the users that matched your email query
              // choose a user and do something with it
              return value;
            
          }
        ));

        console.log( userKey)
     //   console.log( this.userKey)





    this.router.navigate(["home"]);
  })
      .catch(err => {
    const toastOption: ToastOptions = {
      title: "Authentication Failed",
      msg: "Invalid Credentials, Please Check your credentials",
      showClose: true,
      timeout: 5000,
      theme: "material"
    };
    this.toastyService.error(toastOption);
      });
  }


signInWithGoogle() {
  this.authService
    .signInWithGoogle()
    .then(res => {
      if (res.additionalUserInfo.isNewUser) {
        this.userService.createUser(res.additionalUserInfo.profile);
      }
      const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
      location.reload();
      this.router.navigate(["home"]);
    })
    .catch(err => {
      const toastOption: ToastOptions = {
        title: "Error Occured",
        msg: "Please try again later",
        showClose: true,
        timeout: 5000,
        theme: "material"
      };
      this.toastyService.error(toastOption);
    });
}
}