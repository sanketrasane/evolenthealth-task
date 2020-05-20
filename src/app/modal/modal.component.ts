import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"],
})
export class ModalComponent implements OnInit {
  @Input() headerText: string;

  showModal = false;
  constructor() {}

  ngOnInit() {}

  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
  }

  outerHide(event) {
    if (event.target.dataset.modal == "parent-div") {
      this.hide();
    }
  }
}
