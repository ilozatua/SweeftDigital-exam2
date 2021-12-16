import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { ApiService } from '../services/api-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChildren('theLastList', { read: ElementRef })
  theLastList: QueryList<ElementRef>;

  usersSubs: Subscription;

  totalPages: number;
  currentPage: number = 0;

  observer: any;

  users: User[] = [];

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  getUsers() {
    this.spinner.show();
    this.usersSubs = this.apiService
      .getAllUsers(this.currentPage)
      .subscribe((x) => {
        this.spinner.hide();

        this.totalPages = x.pagination.total;
        x.list.forEach((element) => {
          this.users.push(element);
        });
      });
  }

  intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.getUsers();
        }
      }
    }, options);
  }

  ngOnInit(): void {
    this.getUsers();
    this.intersectionObserver();
  }

  ngAfterViewInit(): void {
    this.theLastList.changes.subscribe((d) => {
      if (d.last) {
        this.observer.observe(d.last.nativeElement);
      }
    });
  }
}
