# Changelog

## 0.10.0

- [UPGRADE] Upgrade Ember to 3.17
- [UPGRADE] Bump Inputmask.js to 4.0.9

### Breaking Changes!

Changes lowest supported Ember version to 3.12

Removes non `one-way-` versions of inputmask components

## 0.9.3

- [BUG] Clean integers during send update

## 0.9.1

- [BUG] Fix addon doc styling

## 0.9.0

- [UPGRADE] Upgrade to Ember 3.6

## 0.8.5

- [BUG] Fix IE11 issues because of Object.assign

## 0.8.4

- [ENHANCEMENT] Show placeholder example for currency mask in docs

## 0.8.3

- [ENHANCEMENT] Update Readme
- [ENHANCEMENT] Add page title

## 0.8.2

- [ENHANCEMENT] Addon Docs

## 0.8.1

- [BUG] Fix issue where phone extensions file was no longer in Inputmask.js

## 0.8.0

- [UPGRADE] Upgrade to Ember 3.3

## 0.7.2

- [UPGRADE] Upgrade Babel to 6.16.10

## 0.7.1

- [BUG] Sync input display value with passed in value if modified during `update`

## 0.7.0

- [UPGRADE] Upgrade to inputmask.js@4

## 0.6.8

- [BUG] Fix broken fastboot build

## 0.6.7

- [UPGRADE] Use `notifyPropertyChange` instead of `propertyDidChange`

## 0.6.6

- [BUG] Fix error thrown when keyup action methods aren't passed in
- [DOCUMENTATION] Fix typo

## 0.6.5

- [BUG] Fix inability to add classes to one way input masks

## 0.6.4

- Remove ember-one-way-controls as a dependency since it's deprecated
- [BUG] Fix failing Travis build

## 0.6.3

- [BUG] Fix American Express Formatting

## 0.6.

- [BUG] Fix issue where `options` were being clobbered

## 0.6.1

- Make `Inputmask` importable

## 0.6.0

- [DEPRECATION] Add deprecation warnings to all non-one-way input masks
- [ENHANCEMENT] Add one-way-zip-code-mask component
- [ENHANCEMENT] Add one-way-ssn-mask component
- [ENHANCEMENT] Add one-way-email-mask component
- [ENHANCEMENT] Add one-way-phone-mask component
- [ENHANCEMENT] Add one-way-date-mask component
- [ENHANCEMENT] Add one-way-currency-mask component

## 0.5.1

- [ENHANCEMENT] Add one-way-credit-card-mask component
- [ENHANCEMENT] Allow one-way-input-mask to dynamically change mask and options

## 0.5.0

- [ENHANCEMENT] Add one-way-input-mask component
- [ENHANCEMENT] Add one-way-number-mask component
