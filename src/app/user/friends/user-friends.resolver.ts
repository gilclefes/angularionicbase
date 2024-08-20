import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { DataStore } from '../../shell/data-store';
import { UserService } from '../user.service';
import { UserFriendsModel } from './user-friends.model';

@Injectable()
export class UserFriendsResolver  {

  constructor(private userService: UserService) { }

  resolve(): DataStore<UserFriendsModel> {
    const dataSource: Observable<UserFriendsModel> = this.userService.getFriendsDataSource();
    const dataStore: DataStore<UserFriendsModel> = this.userService.getFriendsStore(dataSource);

    return dataStore;
  }
}
