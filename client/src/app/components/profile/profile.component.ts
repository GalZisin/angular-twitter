import { Component, OnInit } from '@angular/core';
import { TweetService } from 'src/app/services/tweet.service';
import { ITweet, IUser } from 'src/app/types/types';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  tweets: ITweet[] = [];
  userData!: IUser;
  constructor(
    private tweetService: TweetService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.authService.userData.subscribe(data => {
      this.userData = data;
    })
    this.getMyTweets()
  }


  getMyTweets() {
    this.tweetService.getMyTweets(this.route.snapshot.params['id']).subscribe(
      data => {
        console.log("data tweets: ", data.tweets)
        this.tweets = data?.tweets?.slice().reverse()!;
      }
    )
  }

  isTweetDeleted(isDeleted: boolean) {
    if (isDeleted) {
      this.ngOnInit();
    }
  }
}
