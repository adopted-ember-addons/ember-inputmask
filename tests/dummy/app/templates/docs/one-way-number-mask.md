One Way Number Mask
==================

Use this mask for formatting numbers as the user types

## Integers

The default behavior is to format integers

{{one-way-number-mask/demo-1}}

## Decimals

You can format decimals by passing in the `decimal` option. You must pass a `value` and an `update`
method in order for this to work

{{one-way-number-mask/demo-2}}

### Number of Decimals

Pass in the number of `digits` in the `options` hash to change how many decimals are shown

{{one-way-number-mask/demo-3}}

## Options

You can specify other options from the [Inputmask.js Number Extension](https://github.com/RobinHerbots/Inputmask/blob/4.x/README_numeric.md) in the `options` hash

{{one-way-number-mask/demo-4}}
