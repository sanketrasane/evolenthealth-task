import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from "@angular/core";

@Directive({
  selector: "[appConfirmation]",
})
export class ConfirmationDirective {
  constructor() {}

  @Input() message: string;
  @Output("confirmEvent") confirmEvent = new EventEmitter();

  @HostListener("click")
  askForConfirmation() {
    if (confirm(this.message)) {
      this.confirmEvent.next("yes");
    }
  }
}
