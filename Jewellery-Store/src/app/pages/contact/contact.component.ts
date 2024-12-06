import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  model = {
    name: '',
    email: '',
    comments: '',
    maillist: false
  };

  // Handle form submission
  onSubmit() {
    console.log(this.model);
    // Send the form data to your desired endpoint
    // You can use Angular's HttpClient to make a POST request
  }

  // Handle form reset
  onReset(form: any) {
    form.reset();
  }
}
