One Way Credit Card Mask
========================

```
{{one-way-credit-card-mask value update=(action (mut value))}}
```

This component will mask credit card numbers. It automatically detects the type of credit card
and makes the appropriate mask. In your `update` action you can receive a 3rd parameter which
will be the credit card type.

```
export default Component.extend({
  actions: {
    update(unmaskedValue, value, cardType) {
      set(this, 'cardType', cardType);
    }
  },
})
```

Supported credit card types:

* Visa
* MasterCard
* American Express
* Diners Club
* Discover
* JCB

All others will be formatted as `9999-9999-9999-9999`

## Arguments

### separator

The separator you want between credit card numbers. Defaults to `'-'`.

```
{{one-way-credit-card-mask value separator='_' update=(action (mut value))}}
```
