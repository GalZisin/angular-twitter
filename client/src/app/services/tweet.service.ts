import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IResponseTweets, ITweet } from '../types/types';
import { retry, catchError } from 'rxjs/operators';
import handleError from '../handleErrors';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  static baseUrl = 'http://localhost:8000/api';

  public isTweetSaved = new BehaviorSubject<boolean>(false);
  isSaved = this.isTweetSaved.asObservable();

  public tweetContent = new BehaviorSubject<string>("");

  constructor(private http: HttpClient) { }


  getTweets(): Observable<IResponseTweets> {

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const options = {
      headers,
      withCredentials: true
    }

    return this.http.get<IResponseTweets>(`${TweetService.baseUrl}/tweets`, options)
      .pipe(
        retry(1),
        catchError(handleError)
      );
  }

  getMyTweets(memberId: string): Observable<IResponseTweets> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const options = {
      headers,
      withCredentials: true
    }

    return this.http.get<IResponseTweets>(`${TweetService.baseUrl}/members/${memberId}/tweets`, options)
      .pipe(
        retry(1),
        catchError(handleError)
      );
  }
  deleteTweet(id: string): Observable<IResponseTweets> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const options = {
      headers,
      withCredentials: true
    }
    return this.http.delete<IResponseTweets>(`${TweetService.baseUrl}/tweets/${id}`, options)
      .pipe(
        retry(1),
        catchError(handleError)
      );
  }

  createNewTweet(tweetText: string): Observable<ITweet> {

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const options = {
      headers,
      withCredentials: true
    }
    return this.http.post<ITweet>(`${TweetService.baseUrl}/tweets`, { tweetText }, options)
      .pipe(
        retry(1),
        catchError(handleError)
      );
  }

  toggleStar(tweetId: string): Observable<ITweet[]> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const options = {
      headers,
      withCredentials: true
    }
    return this.http.post<ITweet[]>(`${TweetService.baseUrl}/tweets/${tweetId}/star-toggle`, { withCredentials: true }, options)
      .pipe(
        retry(1),
        catchError(handleError)
      );
  }

  public tweetSaved() {
    this.isTweetSaved.next(true);
  }

  public setTweetText(text: string) {
    this.tweetContent.next(text)
  }
}



