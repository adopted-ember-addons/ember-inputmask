One Way Currency Mask
=====================

Use this mask for formatting money amounts as the user types

{{one-way-currency-mask/demo-1}}

## Options

You can specify other options from the [Inputmask.js Number Extension](https://github.com/RobinHerbots/Inputmask/blob/4.x/README_numeric.md) in the `options` hash

{{one-way-currency-mask/demo-2}}

## Placeholder

The default currency mask from [Inputmask.js](https://github.com/RobinHerbots/Inputmask) always
shows the currency mask as a placeholder and doesn't let you show a custom placeholder. If you want
your own placeholder text instead of `$0.00` you can set `clearMaskOnLostFocus=true` in the
`options` hash.

{{one-way-currency-mask/demo-3}}
