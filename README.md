# Ember Inputmask

[![Build Status](https://travis-ci.org/pzuraq/ember-inputmask.svg)](https://travis-ci.org/pzuraq/ember-inputmask)
[![Ember Observer Score](https://emberobserver.com/badges/ember-inputmask.svg)](https://emberobserver.com/addons/ember-inputmask)

Ember Inputmask is an Ember addon and a wrapper of the
[Inputmask](https://github.com/RobinHerbots/Inputmask) library. It provides a
general use input masking component, along with a set of commonly used masks
including:

  - Credit card number
  - Currency
  - Date
  - Email
  - Number
  - US/Canada phone number
  - US SSN
  - US ZIP Code

## Versions and Upgrading

Inputmask (previously known as `jquery.inputmask`) used to be a jQuery plugin,
but is now a standalone package without relying on jQuery.

Ember Inputmask currently has two branches:

  - [v0.2.x](https://github.com/pzuraq/ember-inputmask/tree/v0.2.x) pulls
    legacy jquery.inputmask 3.2.x from Bower. This branch is in maintenance
    mode. Critical bugs will be fixed, but minor issues will not be fixed and
    new features will not be added.

  - [>v0.4.x](https://github.com/pzuraq/ember-inputmask/tree/master)
    pulls Inputmask 3.3.x from NPM. Bower and jQuery are not required.

Versions prior to 0.4.0 automatically add `jquery.inputmask` into your
application's `bower.json` file. If you are upgrading from a pre-0.4 version to
0.4.x, feel free to remove it from `bower.json`.

In case you are using v0.3.0 of this addon -- it was a versioning mistake. In
fact, v0.3.0 is older than v0.2.1 and we don't recommend it. Feel free to
upgrade to the latest version of either v0.2.x or v0.4.x.

## Installation

```sh
$ ember install ember-inputmask
```

## One Way Input Mask

```hbs
{{one-way-input-mask value mask='999-aaa-***' update=(action (mut value))}}
```

This component follows the data-down-actions-up (DDAU) pattern. You should use the "one-way" components in this addon as the "non-one-way" versions are deprecated as of `0.5.0` and will be removed in `1.0.0`.

### Arguments

* `mask` The type of mask to put on the input
* `options` Any additional masking options from [Inputmask](https://github.com/RobinHerbots/Inputmask) you would like to add

## Other One Way Masks

* [{{one-way-credit-card-mask}}](docs/one-way-credit-card-mask.md)
* [{{one-way-currency-mask}}](docs/one-way-currency-mask.md)
* [{{one-way-date-mask}}](docs/one-way-date-mask.md)
* [{{one-way-email-mask}}](docs/one-way-email-mask.md)
* [{{one-way-number-mask}}](docs/one-way-number-mask.md)
* [{{one-way-phone-mask}}](docs/one-way-phone-mask.md)
* [{{one-way-ssn-mask}}](docs/one-way-ssn-mask.md)
* [{{one-way-zip-code-mask}}](docs/one-way-zip-code-mask.md)
* [Deprecated Masks](docs/deprecated-masks.md)
