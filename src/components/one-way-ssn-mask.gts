import OneWayInputMask from './one-way-input-mask.gts';

/**
 * SSN mask component
 */
export default class OneWaySsnMask extends OneWayInputMask {
  <template>
    <OneWayInputMask
      @mask="999-99-9999"
      @value={{@value}}
      @update={{@update}}
      @options={{@options}}
      @type={{@type}}
      @onenter={{@onenter}}
      @onescape={{@onescape}}
      ...attributes
    />
  </template>
}
