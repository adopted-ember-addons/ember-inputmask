One Way Number Mask
===================

```
{{one-way-number-mask value update=(action (mut value))}}
```

This component defaults to masking as an `integer`. You can pass other number based options supported by [Inputmask](https://github.com/RobinHerbots/Inputmask) in the `options` hash.

## Arguments

### decimal

```
{{one-way-number-mask value decimal=true update=(action (mut value))}}
```

Pass in `decimal` and it will mask as a decimal with 2 digits. If you'd like more or less digits then you can pass in `options.digits`.
