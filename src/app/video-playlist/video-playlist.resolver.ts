import { Injectable } from '@angular/core';

import { VideoPlaylistService } from './video-playlist.service';
import { Observable } from 'rxjs';
import { DataStore } from '../shell/data-store';
import { VideoPlaylistModel } from './video-playlist.model';

@Injectable()
export class VideoPlaylistResolver  {

  constructor(private videoPlaylistService: VideoPlaylistService) { }

  resolve() {
    const dataSource: Observable<VideoPlaylistModel> = this.videoPlaylistService.getVideoPlaylistDataSource();

    const dataStore: DataStore<VideoPlaylistModel> = this.videoPlaylistService.getVideoPlaylistStore(dataSource);

    return dataStore;
  }
}
