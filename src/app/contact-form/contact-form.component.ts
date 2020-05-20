import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Contact } from "../models/contact";
import { ContactService } from "../services/contact.service";

@Component({
  selector: "app-contact-form",
  templateUrl: "./contact-form.component.html",
  styleUrls: ["./contact-form.component.css"],
})
export class ContactFormComponent implements OnInit, OnChanges {
  @Input() contact: Contact;
  @Input() editMode = false;
  @Output("onFormSubmit") message = new EventEmitter<string>();
  contactForm: FormGroup;

  constructor(private contactService: ContactService) {}

  ngOnInit() {}

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (this.editMode) {
      // Edit Contact
      this.contactForm = new FormGroup({
        firstName: new FormControl(this.contact.firstName, [
          Validators.required,
          Validators.pattern("^[a-zA-Z]*$"),
        ]),
        lastName: new FormControl(this.contact.lastName, [
          Validators.required,
          Validators.pattern("^[a-zA-Z]*$"),
        ]),
        emailAddress: new FormControl(this.contact.emailAddress, [
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
        ]),
        phone: new FormControl(this.contact.phone, [
          Validators.required,
          Validators.pattern("[0-9]{10}"),
        ]),
        status: new FormControl(this.contact.status, Validators.required),
      });
    } else {
      // Add New Contact
      this.contactForm = new FormGroup({
        firstName: new FormControl(null, [
          Validators.required,
          Validators.pattern("^[a-zA-Z]*$"),
        ]),
        lastName: new FormControl(null, [
          Validators.required,
          Validators.pattern("^[a-zA-Z]*$"),
        ]),
        emailAddress: new FormControl(null, [
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
        ]),
        phone: new FormControl(null, [
          Validators.required,
          Validators.pattern("[0-9]{10}"),
        ]),
      });
    }
  }

  onSubmit() {
    if (this.editMode) {
      this.contactService
        .editContact(this.contact, this.contactForm.value)
        .subscribe((message) => {
          this.message.emit(message);
        });
    } else {
      this.contactService
        .addNewContact(this.contactForm.value)
        .subscribe((message) => {
          this.message.emit(message);
          this.contactForm.reset();
        });
    }
  }
}
