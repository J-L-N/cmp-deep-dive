import { AfterViewInit, Component, ElementRef, EventEmitter, output, Output, viewChild, ViewChild, ViewChildren } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent implements AfterViewInit{

  // @ViewChild('form') private form?: ElementRef<HTMLFormElement>;

  private form = viewChild.required<ElementRef<HTMLFormElement>>('form')

  // @Output() add = new EventEmitter<{title: string, text: string}>();
  enterredTitle = '';
  enterredText = '';
  add = output<{title: string, text: string}>()

  ngAfterViewInit(): void {
      console.log('After View Init');
      console.log(this.form().nativeElement);
  }

  onSubmit() {
    this.add.emit({title: this.enterredTitle, text: this.enterredText});
    // this is used when we are not using two way data binding
    // this.form().nativeElement.reset();

    this.enterredTitle = '';
    this.enterredText = '';

  }
}
