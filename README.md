# Angular Emoji Picker [DEPRECATED] (not working for angular > 6)
[![npm version](https://badge.fury.io/js/ng-emoji-picker.svg)](https://badge.fury.io/js/ng-emoji-picker)

### Important / Credits
This package is based on https://github.com/AnteWall/angular2-emoji
Since that repository is not being maintained I've started using this on my own projects.

## Usage
Install through npm or yarn
```bash
npm install ng-emoji-picker --save # Angular >= 6
npm install ng-emoji-picker@1.2.4 --save -E # For Angular == 5 please use version 1.2.4.
npm install ng-emoji-picker@1.1.13 --save -E # For Angular <= 4 please use version 1.1.13.
# same with yarn
yarn add ng-emoji-picker
```
In your module file for your angular project.
```javascript
import {EmojiPickerModule} from 'ng-emoji-picker';

@NgModule({
  ...
  imports: [
      EmojiPickerModule
  ],
  ...
})
```
## Components
`<emoji-input>`
```html
  <emoji-input></emoji-input>
```
#### Parameters
`[popupAnchor]` : ['top' (default) : 'bottom']
Where to anchor the emoji popup

`[onEnter]` : method to run when users presses enter key. If you want to use your parent scope inside the function make sure to bind the function (`[onEnter]="onEnterFunction.bind(this)"`)

`[textArea]` : use `textarea` instead of `input` by passing an object. Available properties which bind to the textarea tag are `cols & rows`.

`[autofocus]` : autofocus on the textarea/input right after the component is created.

`[(model)]` : model value to two-way bind to input fields ngModel

`[inputClass]` : assigns a class name to the emoji input or textArea.

`[searchClass]` : assigns a class name to the search input

`[closeAfterSelection]` : boolean: defaults `true`. If true closes the emoji popup after selecting an emoji.

`(setPopupAction)` : outputs a binding function to `this.openPopup(status: boolean = null)`. Call the function without parameters to toggle the picker popup.

`(keyup)` : outputs the keyup event on the textarea/input.

`(focus)` : outputs the event when focus on the textarea/input.

`(blur)` : outputs the event when blur outside the textarea/input.

`(emojiClick)` : outputs the emoji character clicked.

##### Example
```javascript
@Component({})

export class ExampleComponent {

    public openPopup: Function;

    setPopupAction(fn: any) {
        this.openPopup = fn;
    }
}
```
```html
<emoji-input
  [(model)]="bindedVariable"
  [textArea]="{cols: 40, rows: 5}"
  [onEnter]="onEnterFunction"
  [popupAnchor]="'bottom'"
  (setPopupAction)="setPopupAction($event)">
</emoji-input>
```

### Demo project available here: https://github.com/lbertenasco/ng-emoji-picker-demo

## Submitting an Issue

If you're confident that you've found a bug in
ng-emoji-picker, please [open an issue][issues], but check to make sure it hasn't
already been submitted. When submitting a bug report, please include a
[Gist][] that includes a stack trace and any details that may be
necessary to reproduce the bug, including your browser, version of ng-emoji-picker, and operating system. Ideally, a bug report should include a
pull request with failing specs.

[gist]: https://gist.github.com/

## Submitting a Pull Request
1. [Fork the repository.][fork]
2. [Create a topic branch.][branch]
3. Add specs for your unimplemented feature or bug fix.
4. Implement your feature or bug fix.
5. Add, commit, and push your changes.
6. [Submit a pull request.][pr]

[issues]: https://github.com/lbertenasco/ng-emoji-picker/issues
[fork]: http://help.github.com/fork-a-repo/
[branch]: http://learn.github.com/p/branching.html
[pr]: http://help.github.com/send-pull-requests/
