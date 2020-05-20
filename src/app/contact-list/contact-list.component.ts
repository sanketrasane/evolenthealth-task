import { Component, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs";

import { Contact } from "../models/contact";
import { ModalComponent } from "../modal/modal.component";
import { ContactService } from "../services/contact.service";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.css"],
})
export class ContactListComponent implements OnInit {
  contacts: Observable<Contact[]>;
  contact = new Contact();
  message: string;

  @ViewChild("editContactModal", { static: false })
  editContactModal: ModalComponent;
  @ViewChild("addContactModal", { static: false })
  addContactModal: ModalComponent;
  @ViewChild("messageModal", { static: false })
  messageModal: ModalComponent;
  @ViewChild("contactProfileModal", { static: false })
  contactProfileModal: ModalComponent;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  }

  onEditBtnClicked(contact: Contact) {
    this.contact = contact;
    this.editContactModal.show();
  }

  onAddBtnClicked() {
    this.addContactModal.show();
  }

  onDeleteBtnClicked(contact: Contact) {
    this.contactService.deleteContact(contact.id).subscribe((message) => {
      this.message = message;
      this.messageModal.show();
    });
  }

  onFormSubmit(message) {
    this.message = message;
    this.editContactModal.hide();
    this.addContactModal.hide();
    this.messageModal.show();
  }

  viewContact(contact: Contact) {
    this.contact = contact;
    this.contactProfileModal.show();
  }
}
