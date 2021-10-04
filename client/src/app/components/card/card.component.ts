import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { TweetService } from 'src/app/services/tweet.service';
import { ITweet, IUser } from 'src/app/types/types';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../shared/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { ReplyDialogComponent } from '../reply-dialog/reply-dialog.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  private snackbar;
  @Input() tweet!: ITweet;
  @Output() isDeleted = new EventEmitter<boolean>();
  userData: IUser = {};
  isAuth: boolean = false;
  text: string = '';
  starCounter = 0;
  userClicked: boolean = false;
  constructor(
    private tweetService: TweetService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.snackbar = new SnackbarComponent(_snackBar)
  }

  ngOnInit(): void {
    this.authService.userData.subscribe(data => {
      this.userData = data;
    })
    this.authService.isAuthenticated.subscribe(
      data => {
        this.isAuth = data;
      }
    )
    this.starCounter = this.tweet?.stars?.length!;
    this.userClicked = !!this.tweet?.stars?.find((i) => i === this.userData?.member?.memberId)!
  }

  deleteTweet(tweet: ITweet) {

    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message, 'Delete', 'Cancel');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.tweetService.deleteTweet(tweet?._id!).subscribe(
          data => {
            this.snackbar.openSnackBar(data?.message!, '')
            this.isDeleted.emit(true);
          }
        )
      }
    });
  }

  replyDialog(): void {
    const dialogRef = this.dialog.open(ReplyDialogComponent, {
      width: '250px',
      data: { text: this.text }
    });

    dialogRef.afterClosed();
  }

  handleToggleStar(tweetId: string) {
    if (this.isAuth) {
      this.userClicked ?
        this.starCounter = (this.starCounter)! - 1 :
        this.starCounter = (this.starCounter)! + 1;
      this.userClicked = !this.userClicked;

      this.tweetService.toggleStar(tweetId).subscribe();
    } else {
      this.router.navigate(['/login'])
    }
  }
}