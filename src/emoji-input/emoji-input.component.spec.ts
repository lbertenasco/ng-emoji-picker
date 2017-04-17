/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {EmojiInputComponent} from './emoji-input.component';

describe('ng-emoji-picker: input', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        EmojiInputComponent
      ],
    });
  });

  it('should create the input', async(() => {
    let fixture = TestBed.createComponent(EmojiInputComponent);
    let input = fixture.debugElement.componentInstance;
    expect(input).toBeTruthy();
  }));

  it('support ngModel', async(() => {
    let fixture = TestBed.createComponent(EmojiInputComponent);

    fixture.detectChanges();
    let instance = fixture.componentInstance;
    let el: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    instance.input = 'hello';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(el.value).toBe('hello');
        expect(fixture.debugElement.componentInstance.input).toBe('hello');
      });
    });
  }));
});
