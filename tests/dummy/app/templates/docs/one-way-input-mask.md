One Way Input Mask
==================

This is foundational component that all the other components extend from.

## Basic Mask

Supply a `mask` attribute following the instructions in [Inputmask.js](https://github.com/RobinHerbots/Inputmask#default-masking-definitions)

{{one-way-input-mask/demo-1}}

## Options

You can pass any of the `options` mentioned in [Inputmask.js](https://github.com/RobinHerbots/Inputmask#options) through an `options` hash

{{one-way-input-mask/demo-2}}

## Actions

Some of the `options` are actions. Use the `action` helper to pass in a closure action.

{{one-way-input-mask/demo-3}}

## Updating Values

Pass `one-way-input-mask` an `update` action and it will return the `unmaskedValue` and the masked
`value`.

{{one-way-input-mask/demo-4}}

## Passing in Values

You can pass `one-way-input-mask` a `value` as the first position param. The component expects you
to pass in an **unmasked** value

{{one-way-input-mask/demo-5}}
