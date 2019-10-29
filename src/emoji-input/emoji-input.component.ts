import {
  Component,
  OnInit,
  AfterViewInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';

import { EmojiService } from '../emoji.service';

@Component({
  selector: 'emoji-input',
  template: `
    <ng-template [ngIf]="textArea">
      <textarea #textareaEl name="text"
        [ngClass]="[inputClass]"
        [attr.cols]="textArea.cols"
        [attr.rows]="textArea.rows"
        (keyup)="onKeyup($event)"
        (keyup.enter)="onEnter()"
        (blur)="onBlur($event)"
        (focus)="onFocus($event)"
        (ngModelChange)="onChange($event)"
        [(ngModel)]="input">
      </textarea>
    </ng-template>
    <ng-template [ngIf]="!textArea">
      <input #inputEl type="text"
        [ngClass]="[inputClass]"
        (keyup)="onKeyup($event)"
        (keyup.enter)="onEnter()"
        (blur)="onBlur($event)"
        (focus)="onFocus($event)"
        (ngModelChange)="onChange($event)"
        [(ngModel)]="input"/>
    </ng-template>
    <div class="emoji-search"
      [ngClass]="[popupAnchor, searchClass]"
      [hidden]="!popupOpen"
      [style.display]="popupOpen ? 'flex' : 'none'"
      (click)="$event.stopPropagation()">
      <div class="search-header">
        <input type="search" placeholder="Search..."
          [(ngModel)]="filterEmojis"
          (ngModelChange)="updateFilteredEmojis()"/>
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
      :host .emoji-search[hidden] {
        display: none;
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
        max-height: 160px;
        padding: 5px 12px;
        overflow: auto;
        overflow-x: hidden;
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
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
export class EmojiInputComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() textArea: any;
  @Input() popupAnchor = 'top';
  @Input() inputClass = '';
  @Input() searchClass = '';
  @Input() onEnter: Function = () => {};
  @Input() model: any;
  @Input() autofocus: boolean = false;
  @Input() closeAfterSelection: boolean = true;

  @Output() modelChange: any = new EventEmitter();
  @Output() setPopupAction: any = new EventEmitter();
  @Output() blur: any = new EventEmitter();
  @Output() focus: any = new EventEmitter();
  @Output() keyup: any = new EventEmitter();
  @Output() emojiClick: any = new EventEmitter();

  @ViewChild('textareaEl', {static: false}) textareaEl;
  @ViewChild('inputEl', {static: false}) inputEl;

  public input: string = '';
  public filterEmojis: string = '';
  public filteredEmojis: any[];
  public allEmojis: Array<any>;
  public popupOpen: boolean = false;
  public lastCursorPosition: number = 0;

  constructor(public emojiService: EmojiService) {

  }

  ngOnInit() {
    if (this.setPopupAction) {
        this.setPopupAction.emit((status) => {this.openPopup(status)});
    }
    this.allEmojis = this.emojiService.getAll();
    this.clean();
  }

  ngAfterViewInit() {
    if (this.autofocus) {
      if (this.textArea) {
        this.textareaEl.nativeElement.focus();
      } else {
        this.inputEl.nativeElement.focus();
      }
    }
  }

  ngOnChanges() {
    if (this.model !== this.input) {
      this.input = this.model;
    }
  }

  onKeyup(event) {
    this.updateCursor();
    if (this.keyup) {
      this.keyup.emit(event);
    }
  }
  onBlur(event) {
    this.updateCursor();
    if (this.blur) {
      this.blur.emit(event);
    }
  }
  onFocus(event) {
    this.updateCursor();
    if (this.focus) {
      this.focus.emit(event);
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
    this.input = this.input.substr(0, this.lastCursorPosition) + e + this.input.substr(this.lastCursorPosition);
    this.modelChange.emit(this.input);
    this.emojiClick.emit(e);
    if (this.closeAfterSelection) {
      this.popupOpen = false;
      this.clean();
    }
  }

  onChange(newValue) {
    this.input = this.emojiService.emojify(newValue);
    this.model = this.input;
    this.modelChange.emit(this.input);
  }

  updateCursor() {
    if (this.textArea) {
      this.lastCursorPosition = this.textareaEl.nativeElement.selectionStart;
    } else {
      this.lastCursorPosition = this.inputEl.nativeElement.selectionStart;
    }
  }
}
