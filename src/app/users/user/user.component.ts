import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { FullUser, User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, AfterViewInit {
  user: FullUser;
  @ViewChildren('theLastList', { read: ElementRef })
  theLastList: QueryList<ElementRef>;

  usersSubs: Subscription;

  totalPages: number;
  currentPage: number = 0;

  observer: any;

  friends: User[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) {}

  getFriends() {
    this.spinner.show();
    this.usersSubs = this.apiService
      .getUserFriends(this.user.id, this.currentPage)
      .subscribe((x) => {
        this.spinner.hide();

        this.totalPages = x.pagination.total;
        x.list.forEach((element) => {
          this.friends.push(element);
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
          this.getFriends();
        }
      }
    }, options);
  }

  ngOnInit(): void {
    const id = +this.activeRoute.snapshot.params['id'];

    this.apiService.getUser(id).subscribe((_user) => (this.user = _user));

    this.activeRoute.params.subscribe((params: Params) => {
      this.apiService
        .getUser(+params['id'])
        .subscribe((_user) => (this.user = _user));
    });
  }

  ngAfterViewInit(): void {
    this.getFriends();
    this.intersectionObserver();
    this.theLastList.changes.subscribe((d) => {
      if (d.last) {
        this.observer.observe(d.last.nativeElement);
      }
    });
  }
}
