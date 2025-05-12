import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularapp';
  isLanding: boolean = false;
  constructor(private readonly router: Router) {
  }
  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isLanding = this.router.url === '/'
    })
  }
}
