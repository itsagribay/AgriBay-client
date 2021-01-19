import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  name: string;


  constructor(private activatedRoute: ActivatedRoute) {
    this.name = this.activatedRoute.snapshot.params.name;

    // get products here

  }

  ngOnInit(): void {
  }

}
