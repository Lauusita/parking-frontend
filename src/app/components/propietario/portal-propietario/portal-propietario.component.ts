import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faParking, faCalendarCheck, faBell, faUserCircle, faSignOutAlt, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-portal-propietario',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './portal-propietario.component.html'
})
export class PortalPropietarioComponent implements OnInit {
  nombre = "";

  parkingIcon = faParking;
  calendarIcon = faCheck;
  bellIcon = faBell;
  userIcon = faUserCircle;

  ngOnInit(): void {
    this.nombre = localStorage.getItem("userName") as string;
  }

  close() {
    localStorage.clear()
  }
}
