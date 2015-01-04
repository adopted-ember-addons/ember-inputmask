import Ember from "ember";
import { moduleForComponent, test } from 'ember-qunit';
import startApp from '../../helpers/start-app';
var App;

moduleForComponent('currency-input', 'currency-input component', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

// test('masked values are correct', function() {
//   expect(2);

//   var component = this.subject();

//   // append the component to the DOM
//   this.append();

//   // testing default value
//   triggerEvent('input', 'blur');
//   andThen(function() { // wait for async helpers to complete
//     equal(find('input').val(), "$ 0.00");
//   });

//   // testing filled in value
//   fillIn('input', '1234567.89');
//   triggerEvent('input', 'blur');
//   andThen(function() { // wait for async helpers to complete
//     equal(find('input').val(), "$ 1,234,567.89");
//   });
// });

// test('unmasked values are correct', function() {
//   expect(2);

//   var component = this.subject();

//   // append the component to the DOM
//   this.append();

//   // testing default value
//   triggerEvent('input', 'blur');
//   andThen(function() { // wait for async helpers to complete
//     equal(component.get('unmaskedValue'), "0.00");
//   });

//   // testing filled in value
//   fillIn('input', '1234567.89');
//   triggerEvent('input', 'blur');
//   andThen(function() { // wait for async helpers to complete
//     equal(component.get('unmaskedValue'), "1234567.89");
//   });
// });