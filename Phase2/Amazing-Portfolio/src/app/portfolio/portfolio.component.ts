import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  loginFlag:boolean = true;
  registrationFlag:boolean = false;
  portfolioFlag:boolean = false;
  incorrectFlag:boolean = false;

  contacts:any[] = [];

  username:string = "";

  //login form group
  loginRef = new FormGroup({
    user: new FormControl("", [Validators.required]),
    pass: new FormControl("", [Validators.required])
  });

  //registration form group
  regisRef = new FormGroup({
    user: new FormControl("", [Validators.required]),
    pass: new FormControl("", [Validators.required])
  });

  //contact form group
  contactRef = new FormGroup ({
    name: new FormControl("", [Validators.required]),
    number: new FormControl("", [Validators.required])
  })

  constructor() { }

  ngOnInit(): void {
    sessionStorage.setItem("mainArray", JSON.stringify([]));
  }

  //function to register an user
  registerUser() :void{
    let regisInfo = this.regisRef.value;
    let mainArray = JSON.parse(sessionStorage.getItem("mainArray")!);

    mainArray.push({user: regisInfo.user, pass: regisInfo.pass});

    sessionStorage.setItem("mainArray", JSON.stringify(mainArray));
    this.regisRef.reset();
  }

  //function to grab login details and check if it's correct
  login() :void{
    let correct = false;
    let loginInfo = this.loginRef.value;
    let mainArray = JSON.parse(sessionStorage.getItem("mainArray")!);

    //go through the saved users registered and check if they match any
    for (let index of mainArray) {
      console.log (index.user);
        console.log(loginInfo.user)
        console.log(index.pass)
        console.log(loginInfo.pass)
      if(index.user == loginInfo.user && index.pass == loginInfo.pass) {

        this.username = index.user;
        correct = true;
        console.log("found user");
        break;
      }
    }

    //if matches any users, go to portfolio page
    if(correct) {
      this.loginFlag = false;
      this.registrationFlag = false;
      this.portfolioFlag = true;
      this.incorrectFlag = false;
      

      //tells them they inputted wrong details
    }else {
      this.incorrectFlag = true;
    }

    this.loginRef.reset();
  }

  //add a contact from contact form group to the contacts list
  addContact() :void {
    let contact = this.contactRef.value;
    this.contacts.push({name:contact.name, number:contact.number});
    this.contactRef.reset();
  }

  //changes flags in order to go to registration page
  goToRegis(): void {
    this.incorrectFlag = false;
    this.registrationFlag = true;
    this.loginFlag = false;
    this.portfolioFlag = false;
  }

  //changes flags in order to go to login page
  goToLogin(): void {
    this.registrationFlag = false;
    this.loginFlag = true;
    this.portfolioFlag = false;
  }

  
}
