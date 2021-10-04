import { Component, OnInit, EventEmitter, Inject, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TweetService } from 'src/app/services/tweet.service';
import { ITweet } from '../../types/types';
import { Observable, of } from 'rxjs';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {

  tweets: ITweet[] = []
  isAuth: boolean = false;
  tweetText: string = '';
  dialogResult: any;
  constructor(
    private tweetService: TweetService,
    public authService: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.tweetService.setTweetText("");
    this.getTweets();

    this.authService.isAuthenticated.subscribe(
      data => {
        this.isAuth = data;
      }
    )
    this.tweetService.isTweetSaved.subscribe(
      isTweetSaved => {
        if (isTweetSaved)
          this.getTweets();
      }
    )
    this.tweetService.tweetContent.subscribe(
      data => {
        this.tweetText = data;
      }
    )
  }

  getTweets() {
    this.tweetService.getTweets().subscribe(
      data => {
        console.log(data?.tweets)
        this.tweets = data?.tweets?.slice().reverse()!;
      })
  }
  isTweetDeleted(isDeleted: boolean) {
    if (isDeleted) {
      this.ngOnInit();
    }
  }
  isTweetSaved(isSaved: boolean) {
    if (isSaved) {
      this.ngOnInit();
    }
  }

  canDeactivate(): Observable<boolean> | boolean {

    if (this.tweetText !== "") {

      const message = `There are unsaved changes! Are you sure??`;

      const dialogData = new ConfirmDialogModel("Confirm Action", message, 'Confirm', 'Cancel');

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: "400px",
        data: dialogData
      });
      return dialogRef.afterClosed()
    }
    return true;
  }
}