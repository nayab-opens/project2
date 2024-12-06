import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  teamMembers = [
    { name: 'Aysha Bilai', image: 'assets/aysha.jpg' },
    { name: 'Nayab Khan', image: 'assets/nayab.jpg' },
    { name: 'Sidrah Hashmi', image: 'assets/sidrah.jpg' }
  ];
}
