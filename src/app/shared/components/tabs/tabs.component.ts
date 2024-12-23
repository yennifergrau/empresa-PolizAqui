import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent  implements OnInit {

  constructor(private router : Router) { }
  selectedTab: number = 0;
  nombre:any

  selectTab(index: number) {
    this.selectedTab = index;
  }

  idNombre(){
    this.nombre = JSON.parse( localStorage.getItem('empresa-aliada') || '')
  }

  ngOnInit( ) {
    this.idNombre();
  }

  navigate(){
    this.router.navigate([`report/${this.nombre}`])
  }

  isActive(tab: string) {
    return this.router.url === '/' + tab;
  }
}
