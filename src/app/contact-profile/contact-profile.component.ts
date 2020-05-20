import { Component, OnInit, Input } from "@angular/core";
import { Contact } from "../models/contact";

@Component({
  selector: "app-contact-profile",
  templateUrl: "./contact-profile.component.html",
  styleUrls: ["./contact-profile.component.css"],
})
export class ContactProfileComponent implements OnInit {
  @Input() contact: Contact;
  constructor() {}

  ngOnInit() {}
}
