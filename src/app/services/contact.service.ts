import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { environment } from "../../environments/environment";

import { Contact } from "../models/contact";
import { ApiCallService } from "./api-call.service";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  contacts: Array<Contact> = [];

  constructor(private apiCall: ApiCallService) {}

  getContacts() {
    return new Observable((observer: Observer<Contact[]>) => {
      // fetch contacts from server
      this.apiCall
        .getData<Array<Contact>>(environment.fireBaseUrl)
        .subscribe((data) => {
          this.contacts = data;
          this.sort();
          observer.next(this.contacts);
          observer.complete();
        });
    });
  }

  addNewContact(contactData) {
    return new Observable((observer: Observer<string>) => {
      let contact = new Contact();
      let id = this.getMaxId();
      contact = {
        id,
        status: "active",
        ...contactData,
      };
      this.contacts.push(contact);
      this.sort();

      // update contacts on server
      this.apiCall
        .putData<Array<Contact>>(environment.fireBaseUrl, this.contacts)
        .subscribe(
          (res) => {
            observer.next("Contact added successfully");
            observer.complete();
          },
          (error) => {
            console.log(error);
            observer.next("Something went wrong!");
            observer.complete();
          }
        );
    });
  }

  editContact(existingContact, newContactData) {
    return new Observable((observer: Observer<string>) => {
      // find index
      let index = this.contacts.findIndex((e) => {
        return e.id == existingContact.id;
      });

      // replace all values at found index
      if (index > -1) {
        Object.assign(this.contacts[index], newContactData);
        this.sort();

        // update contacts on server
        this.apiCall
          .putData<Array<Contact>>(environment.fireBaseUrl, this.contacts)
          .subscribe(
            (res) => {
              observer.next("Contact edited successfully");
              observer.complete();
            },
            (error) => {
              console.log(error);
              observer.next("Something went wrong!");
              observer.complete();
            }
          );
      } else {
        observer.next("Contact not found");
        observer.complete();
      }
    });
  }

  deleteContact(id: number) {
    return new Observable((observer: Observer<string>) => {
      // find index
      let index = this.contacts.findIndex((e) => {
        return e.id == id;
      });

      if (index > -1) {
        this.contacts.splice(index, 1);
        this.sort();

        // update contacts on server
        this.apiCall
          .putData<Array<Contact>>(environment.fireBaseUrl, this.contacts)
          .subscribe(
            (res) => {
              observer.next("Contact deleted successfully");
              observer.complete();
            },
            (error) => {
              console.log(error);
              observer.next("Something went wrong!");
              observer.complete();
            }
          );
      } else {
        observer.next("Contact not found");
        observer.complete();
      }
    });
  }

  getMaxId() {
    this.contacts.sort((e1, e2) => {
      return e1.id > e2.id ? -1 : 1; // will sort in descending order
    });
    return this.contacts[0].id + 1;
  }

  sort() {
    this.contacts.sort((e1, e2) => {
      return e1.firstName.toLowerCase() > e2.firstName.toLowerCase() ? 1 : -1;
    });
  }
}
