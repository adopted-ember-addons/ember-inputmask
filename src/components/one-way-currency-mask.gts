import OneWayInputMask from './one-way-input-mask.gts';

/**
 * Currency mask component
 */
export default class OneWayCurrencyMask extends OneWayInputMask {
  <template>
    <OneWayInputMask @mask="currency" @value={{@value}} @update={{@update}} @options={{@options}} @type={{@type}} @onenter={{@onenter}} @onescape={{@onescape}} ...attributes />
  </template>
}
