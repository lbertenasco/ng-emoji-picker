import {NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {EmojiInputComponent} from './src/emoji-input/emoji-input.component';
import {EmojiService} from './src/emoji.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    EmojiInputComponent
  ],
  providers: [
    EmojiService
  ],
  exports: [
    EmojiInputComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class EmojiPickerModule {
    static forRoot(): ModuleWithProviders<EmojiPickerModule> {
        return {
            ngModule: EmojiPickerModule,
            providers: [
                EmojiService
            ]
        };
    }
}
