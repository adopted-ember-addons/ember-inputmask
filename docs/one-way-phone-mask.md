One Way Phone Mask
==================

```
{{one-way-phone-mask value update=(action (mut value))}}
```

Masks a US/Canada phone number with the format `(999) 999-9999`. The
`extensions` option can be set to `true` to allow up to 4 digit extensions
`(999) 999-9999 x 9999`. Note that if `greedyMask` is set to `false`, which is
the default, then you have to press space or 'x' to activate the extension part
of the mask when entering.

NOTE: There is a "phone" alias included in Inputmask, but when
I tried using it, I encountered slowness and freezeups. It is much more general
than this tag, however.

## Arguments

### extensions

```
{{one-way-phone-mask value extensions=true update=(action (mut value))}}
```

Pass in `extensions` as `true` and it will allow up to 4 digit extensions.
