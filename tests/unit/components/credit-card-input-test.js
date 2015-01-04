import Ember from "ember";
import { moduleForComponent, test } from 'ember-qunit';
import startApp from '../../helpers/start-app';
var App;

moduleForComponent('credit-card-input', 'credit-card-input component', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('values are correct', function() {
  expect(14);

  var component = this.subject();

  // append the component to the DOM
  this.append();

  // testing Visa formatting 
  fillIn('input', '4444444444444444');
  triggerEvent('input', 'blur');
  andThen(function() { // wait for async helpers to complete
    equal(find('input').val(), "4444-4444-4444-4444");
    equal(component.get('unmaskedValue'), "4444444444444444");
  });

  // testing MasterCard formatting
  fillIn('input', '5444444444444444');
  triggerEvent('input', 'blur');
  andThen(function() {
    equal(find('input').val(), "5444-4444-4444-4444");
    equal(component.get('unmaskedValue'), "5444444444444444");
  });

  // testing American Express formatting
  fillIn('input', '3444444444444444');
  triggerEvent('input', 'blur');
  andThen(function() {
    equal(find('input').val(), "3444-4444444-44444");
    equal(component.get('unmaskedValue'), "3444444444444444");
  });

  // testing Discover formatting
  fillIn('input', '6011444444444444');
  triggerEvent('input', 'blur');
  andThen(function() {
    equal(find('input').val(), "6011-4444-4444-4444");
    equal(component.get('unmaskedValue'), "6011444444444444");
  });

  // testing JCB formatting
  fillIn('input', '2131444444444444');
  triggerEvent('input', 'blur');
  andThen(function() {
    equal(find('input').val(), "2131-4444-4444-4444");
    equal(component.get('unmaskedValue'), "2131444444444444");
  });

  // testing Other formatting
  fillIn('input', '9444444444444444');
  triggerEvent('input', 'blur');
  andThen(function() {
    equal(find('input').val(), "9444-4444-4444-4444");
    equal(component.get('unmaskedValue'), "9444444444444444");
  });

  // testing Diners Club formatting
  // test this last because the numbers are shorter, thus the
  // mask will restrict the next test unless we clear the field.
  fillIn('input', '30544444444444');
  triggerEvent('input', 'blur');
  andThen(function() {
    equal(find('input').val(), "3054-444444-4444");
    equal(component.get('unmaskedValue'), "30544444444444");
  });
});