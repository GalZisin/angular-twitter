import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { TweetService } from 'src/app/services/tweet.service';
import { CustomErrorStateMatcher } from '../shared/error-state-matcher';

@Component({
  selector: 'app-limitedtextarea',
  templateUrl: './limitedtextarea.component.html',
  styleUrls: ['./limitedtextarea.component.css']
})
export class LimitedtextareaComponent implements OnInit {

  textForm!: FormGroup;
  @Output() text = new EventEmitter<string>();
  @Output() isTweetSaved = new EventEmitter<boolean>();
  tweetText: string = "";
  constructor(
    private tweetService: TweetService,
    private fb: FormBuilder
  ) {
    this.textForm = this.fb.group({
      text: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {

  }

  getVal(val: string) {
    this.tweetText = val
    this.tweetService.setTweetText(val);
  }
  handleSubmitPost(event: EventListener) {
    console.log("submit")
    this.textForm.reset()
    if (this.tweetText !== '') {
      this.tweetService.createNewTweet(this.tweetText).subscribe(
        data => {
          this.textForm = this.fb.group({
            text: new FormControl('', [Validators.required]),
          })
          this.tweetText = '';
          this.isTweetSaved.emit(true);
        }
      )
    }
  }

}
