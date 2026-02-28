import OneWayInputMask from './one-way-input-mask.gts';

/**
 * Email mask component
 */
export default class OneWayEmailMask extends OneWayInputMask {
  <template>
    <OneWayInputMask
      @alias="email"
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
