# Deprecated Masks

The following masks will be removed in `1.0.0`

## Input Mask Component (deprecated)

The standard `input-mask` component:

```hbs
{{input-mask mask='999-aaa-***' value=foo unmaskedValue=bar}}
```

### Default Masking Definitions

  - `9` : numeric
  - `a` : alphabetical
  - `*` : alphanumeric
  - `A` : automatically uppercased alphabetical
  - `#` : unicode

Optional portions of masks are delimited with brackets `[]`:

```hbs
// Optionally lets the user add the last dash and characters
{{input-mask mask='999-aaa[-***]' value=foo unmaskedValue=bar}}
```

### Unmasked Value

The mask is applied directly to the input itself, meaning it alters the `value`
attribute. There are times when you might want the value with the mask, and
times when you might want the value without the mask. For example:

```hbs
{{input-mask mask='99/99/9999' value=foo unmaskedValue=bar}}
```

This is an ad hoc mask for a date (consider using the `date-input` component
instead). If the user were to enter `12/12/2014`, the value of `foo` would be
just that, whereas the value of `bar` would be `12122014`, which may not be as
useful to you. Either way, both values are accessible and bound to each other,
so choose whichever one you want.

### Options

  - `maskPlaceholder` (default: `null`)

    Override Inputmask's default
    [`placeholder`](https://github.com/RobinHerbots/Inputmask#placeholder-1)
    option.

  - `showMaskOnFocus` (default: `true`)

    Shows the user a preview of the mask when the field is focussed.

  - `showMaskOnHover` (default: `true`)

    Shows the user a preview of the mask when the field is hovered.

  - `rightAlign` (default: `false`)

    This is an option on the original plugin, but I highly recommend using CSS
    classes because all it does is apply a style directly to the input.

  - `clearIncomplete` (default: `false`)

    If the user does not completely fill in the mask before defocus, it will
    clear the input.

  - `greedyMask` (default: `false`)

    If there are any optional portions of the mask this decides whether or not
    to display them in the preview.

## Other Components

As mentioned above, this addon include other components that extend the base
`input-mask` component. Some of simple aliases, but some add additional options.

### Credit Card Inputs (deprecated)

```hbs
{{credit-card-input unmaskedValue=foo cardType=bar separator=' '}}
```

The `credit-card-input` dynamically determines the type of the credit card and
changes the mask as appropriate. It currently has support for:

  - Visa
  - MasterCard
  - Amex
  - Diners Club
  - Discover
  - JCB

The card type is stored in `cardType`, which can be bound to. The separator for
numbers can be specified with the `separator` option, and defaults to `-`.

### Currency Inputs (deprecated)

```hbs
{{currency-input unmaskedValue=foo}}
```

This is just a wrapper for the Inputmask alias and is equivalent to the
following:

```hbs
{{input-mask mask='currency' unmaskedValue=foo}}
```

### Date Inputs (deprecated)

```hbs
{{date-input unmaskedValue=foo}}
```

This is just a wrapper for the Inputmask alias and is equivalent to the
following:

```hbs
{{input-mask mask='date' unmaskedValue=foo}}
```

### Email Inputs (deprecated)

```hbs
{{email-input unmaskedValue=foo}}
```

This is just a wrapper for the Inputmask alias and is equivalent to the
following:

```hbs
{{input-mask mask='email' unmaskedValue=foo}}
```

### Number Inputs (deprecated)

```hbs
{{number-input unmaskedValue=foo group=false groupSize=3 separator=',''
  decimal=false radix='.'}}
```

Number inputs only accept numbers, and can be modified using the following
options:

  - `group`: Display the number grouped for readability (e.g. `1,234` vs.
    `1234`).
  - `groupSize`: Change the size of the groups.
  - `separator`: Change the group separator. (Caveat: If radix and separator are
  the same, then the radix will default to '.'.)
  - `decimal`: If set to `true` then the input will be given 2 decimal places,
  if set some number then the input will be given that many decimal places.
  - `radix`: Sets the radix that separates the decimal places.
  - `digitsOptional`: Specify whether digits are optional (e.g. `97.00` vs. `97`)
  - `prefix`: Sets a prefix to be displayed before the number (e.g. `$97.00`)
  - `suffix`: Sets a suffix to be displayed after the number (e.g. `100%`)
  - `min`: Sets the minimum value for the field
  - `max`: Sets the maximum value for the field
  - `unmaskAsNumber`: Unmasks the input as a number rather than a string (e.g. `1234.56` vs. `'1234,56'`)

### US/Canada Phone Number Inputs (deprecated)

```hbs
{{phone-number-input unmaskedValue=foo extensions=false}}
```

Masks a US/Canada phone number with the format `(999) 999-9999`. The
`extensions` option can be set to `true` to allow up to 4 digit extensions
`(999) 999-9999 x 9999`. Note that if `greedyMask` is set to `false`, which is
the default, then you have to press space or 'x' to activate the extension part
of the mask when entering.

NOTE: There is a "phone" alias included in Inputmask, but when
I tried using it, I encountered slowness and freezeups. It is much more general
than this tag, however.

### US SSN Inputs

```hbs
{{ssn-input unmaskedValue=foo}}
```

Masks a US SSN code (`999-99-9999`).

### US ZIP Code Inputs (deprecated)

```hbs
{{zip-code-input unmaskedValue=foo fullCode=false}}
```

Masks a US ZIP code. If `fullCode` is set to `true`, then it will enable the
user to enter an extended ZIP+4 code.
