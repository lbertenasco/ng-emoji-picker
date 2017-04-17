# Angular2 Emoji Picker
[![npm version](https://badge.fury.io/js/ng-emoji-picker.svg)](https://badge.fury.io/js/ng-emoji-picker)

## Usage
Install through npm or yarn
```bash
npm install ng-emoji-picker --save
yarn add ng-emoji-picker
```
In your module file for your angular project.
```javascript
import EmojiPickerModule from 'ng-emoji-picker';

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

`[(model)]` : model value to two-way bind to input fields ngModel

##### Example
```html
<emoji-input
  [onEnter]="onEnterFunction"
  [popupAnchor]="'bottom'"
  [(model)]="bindedVariable">
</emoji-input>
```

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
