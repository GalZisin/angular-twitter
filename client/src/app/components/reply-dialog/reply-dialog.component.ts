import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TweetService } from 'src/app/services/tweet.service';

export interface ReplyDialogModel {
    text: string
}

@Component({
    selector: 'app-reply-dialog',
    templateUrl: 'reply-dialog.component.html',
})
export class ReplyDialogComponent {

    tweetText: string = "";
    constructor(private tweetService: TweetService,
        public dialogRef: MatDialogRef<ReplyDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ReplyDialogModel) { }

    onNoClick() {
        this.dialogRef.close();
        return false;
    }

    getVal(val: string) {
        this.tweetText = val;
    }

    handleSubmitPost(event: EventListener) {
        console.log("text", this.tweetText)
        this.tweetService.createNewTweet(this.tweetText).subscribe(
            data => {
                this.tweetService.tweetSaved();
            }
        )

    }
}