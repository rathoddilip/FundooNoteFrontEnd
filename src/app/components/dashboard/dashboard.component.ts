import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { AfterViewInit,  Directive, ElementRef, HostListener, Input, OnChanges,  QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  mobileQuery!: MediaQueryList;
  title!: string; 

  
  constructor() { }

  ngOnInit(): void {
  }

}
