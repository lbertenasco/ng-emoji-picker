import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';

import { EmojiUtil } from '../util/util';

@Component({
  selector: 'emoji-input',
  templateUrl: './input.html',
  styleUrls: ['./input.scss']
})
export class EmojiInputComponent implements OnInit, OnChanges {

  @Input() popupAnchor = 'top';
  @Input() onEnter: Function = () => {};
  @Input() model: any;
  @Output() modelChange: any = new EventEmitter();

  input: string;
  filterEmojis: string;
  emojiUtil: EmojiUtil = new EmojiUtil();
  allEmojis: Array<any>;
  popupOpen: boolean = false;

  ngOnInit() {
    this.input = '';
    this.filterEmojis = '';
    this.allEmojis = this.emojiUtil.getAll();
  }

  ngOnChanges() {
    if (this.model !== this.input) {
      this.input = this.model;
    }
  }

  togglePopup() {
    this.popupOpen = !this.popupOpen;
  }

  getFilteredEmojis() {
    console.log('getFilteredEmojis');
    return this.allEmojis.filter((e) => {
      if (this.filterEmojis === '') {
        return true;
      } else {
        for (let alias of e.aliases) {
          if (alias.includes(this.filterEmojis)) {
            return true;
          }
        }
      }
      return false;
    });
  }

  onEmojiClick(e) {
    this.input = this.input + e;
    this.modelChange.emit(this.input);
    this.popupOpen = false;
  }

  onChange(newValue) {
    this.input = this.emojiUtil.emojify(newValue);
    this.model = this.input;
    this.modelChange.emit(this.input);
  }
}
