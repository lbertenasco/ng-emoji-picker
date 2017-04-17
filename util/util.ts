import { Injectable } from '@angular/core';
import { EMOJI_DB } from '../db/emoji';

const PARSE_REGEX = /:([a-zA-Z0-9_\-\+]+):/g;

@Injectable()
export class EmojiUtil {

  public get(emoji) {
    // TODO Fix performance
    for (let data of EMOJI_DB) {
      for (let e of data.aliases) {
        if (emoji === e) {
          return data.emoji;
        }
      }
    }
    return emoji;
  }

  public getAll() {
    return EMOJI_DB;
  }

  public emojify(str) {
    return str.split(PARSE_REGEX).map((emoji, index) => {
      // Return every second element as an emoji
      if (index % 2 === 0) { return emoji; }
      return this.get(emoji);
    }).join('');
  }

}
