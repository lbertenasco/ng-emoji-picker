import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {EmojiUtil} from './util/util';
import {EmojiInputComponent} from './input/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    EmojiInputComponent
  ],
  providers: [
    EmojiUtil
  ],
  exports: [
    EmojiInputComponent
  ]
})
export class EmojiPickerModule {}
