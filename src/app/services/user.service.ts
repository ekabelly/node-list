import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  private _user$ = new BehaviorSubject<User>({id: '1'});
  public users = ['1','2','3','4','5','6','7','8'];

  set user(user: User) {
    if (user) {
      this._user$.next(user);
    }
  }

  get user$(): Observable<User> {
    return this._user$.asObservable();
  }

  get lastUpdatedUser(): User {
    return this._user$.getValue();
  }
}