import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faParking, faCalendarCheck, faBell, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-portal-conductor',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './portal-conductor.component.html',
})
export class PortalConductorComponent implements OnInit {
  nombre = "";

  parkingIcon = faParking;
  calendarIcon = faCalendarCheck;
  bellIcon = faBell;
  userIcon = faUserCircle;

  ngOnInit(): void {
    this.nombre = localStorage.getItem("userName") as string;
  }

  close() {
    localStorage.clear()
  }
}
