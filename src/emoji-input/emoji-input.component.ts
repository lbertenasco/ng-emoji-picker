import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';

import { EmojiService } from '../emoji.service';

@Component({
  selector: 'emoji-input',
  template: `
    <div *ngIf="textArea; else inputTag">
      <textarea name="text" [attr.cols]="textArea.cols" [attr.rows]="textArea.rows"
        (keyup.enter)="onEnter()"
        (ngModelChange)="onChange($event)"
        [(ngModel)]="input">
      </textarea>
    </div>
    <ng-template #inputTag>
      <input type="text"
        (keyup.enter)="onEnter()"
        (ngModelChange)="onChange($event)"
        [(ngModel)]="input"
      />
    </ng-template>
    <div class="emoji-search" [ngClass]="popupAnchor" [hidden]="!popupOpen">
      <div class="search-header">
        <input type="search" placeholder="Search..."
          [(ngModel)]="filterEmojis"
          (ngModelChange)="updateFilteredEmojis()"
          />
      </div>
      <div class="emojis-container">
        <span *ngFor="let emoji of filteredEmojis"
              (click)="onEmojiClick(emoji.emoji)"
               title="{{emoji.aliases[0]}}">
          {{emoji.emoji}}
        </span>
      </div>
    </div>
  `,
  styles: [`
      :host {
        display: block;
        position: relative;
      }
      :host .emoji-search {
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
        height: auto;
        line-height: 1.5;
        position: absolute;
        right: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        z-index: 100;
      }
      :host .emoji-search.bottom {
        top: -202px;
      }
      :host .emoji-search input {
        border-radius: 4px;
        font-size: 10px;
        padding: 4px 8px;
        margin: 0;
        height: 30px;
      }
      :host .emoji-search .search-header {
        background-color: #eee;
        border-bottom: 1px solid #ccc;
        border-radius: 4px 4px 0 0;
        padding: 4px 8px;
        width: 100%;
      }
      :host .emoji-search .emojis-container {
        border-radius: 0 0 4px 4px;
        height: 100%;
        max-height: 160px;
        padding: 5px 12px;
        overflow: auto;
        overflow-x: hidden;
      }
      :host .emoji-search span {
        cursor: pointer;
        padding: 4px 3px 2px 4px;
        font-size: 24px;
      }
      :host .emoji-search span:hover {
        background-color: #ccc;
      }

  `]
})
export class EmojiInputComponent implements OnInit, OnChanges {

  @Input() textArea: any;
  @Input() popupAnchor = 'top';
  @Input() onEnter: Function = () => {};
  @Input() model: any;
  @Output() modelChange: any = new EventEmitter();
  @Output() setPopupAction: any = new EventEmitter();

  public input: string = '';
  public filterEmojis: string;
  public filteredEmojis: any[];
  public allEmojis: Array<any>;
  public popupOpen: boolean = false;

  constructor(public emojiService: EmojiService) {

  }

  ngOnInit() {
    if (this.setPopupAction) {
        this.setPopupAction.emit((status) => {this.openPopup(status)});
    }
    this.allEmojis = this.emojiService.getAll();
    this.clean();
  }

  ngOnChanges() {
    if (this.model !== this.input) {
      this.input = this.model;
    }
  }

  clean() {
    this.filterEmojis = '';
    this.filteredEmojis = this.getFilteredEmojis();
  }

  openPopup(status: boolean = null) {
    if (status === null) {
        this.popupOpen = !this.popupOpen;
    } else {
        this.popupOpen = status;
    }
  }

  updateFilteredEmojis() {
     this.filteredEmojis = this.getFilteredEmojis();
  }
  getFilteredEmojis() {
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
    this.clean();
  }

  onChange(newValue) {
    this.input = this.emojiService.emojify(newValue);
    this.model = this.input;
    this.modelChange.emit(this.input);
  }
}
