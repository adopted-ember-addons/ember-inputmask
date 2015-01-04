import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import startApp from '../../helpers/start-app';
var App;

moduleForComponent('input-mask', 'input-mask component', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('regex works', function() {
  expect(3);

  var component = this.subject();

  // append the component to the DOM
  this.append();

  Ember.run(function(){
    component.set('mask', 'regex');
    component.set('pattern', 'you_can_only_type_thi[s]+');
  });

  // testing filled in value
  fillIn('input', 'test');
  triggerEvent('input', 'blur');
  andThen(function() { // wait for async helpers to complete
    equal(find('input').val(), '');
  });

  fillIn('input', 'you_can_only_type_this');
  triggerEvent('input', 'blur');
  andThen(function() {
    equal(find('input').val(), 'you_can_only_type_this');
  });

  fillIn('input', 'you_can_only_type_thisssss');
  triggerEvent('input', 'blur');
  andThen(function() {
    equal(find('input').val(), 'you_can_only_type_thisssss');
  });
});

test('showMaskOnHover works', function() {
  expect(3);

  var component = this.subject();

  // append the component to the DOM
  this.append();

  Ember.run(function(){
    component.set('mask', '9-9+9');
  });

  andThen(function() { // wait for async helpers to complete
    var input = find('input');
    input.mouseenter();
    equal(find('input')[0].value, '_-_+_');
  });

  andThen(function() {
    var input = find('input');
    input.mouseleave();
    equal(find('input')[0].value, '');
  });

  Ember.run(function(){
    component.set('showMaskOnHover', false);
  });

  andThen(function() {
    var input = find('input');
    input.mouseenter();
    equal(find('input')[0].value, '');
  });
});

/* UNABLE TO TEST showMaskOnFocus, focus event not triggered
 * by the `focus()` function. Seems to be a limitation of qUnit.
 *

test('showMaskOnFocus works', function() {
  expect(2);

  var component = this.subject();

  // append the component to the DOM
  this.append();

  Ember.run(function(){
    component.set('mask', '9-9+9');
  });

  andThen(function() { // wait for async helpers to complete
    var input = find('input');
    input.focus();
    equal(input[0].value, '_-_+_');
  });

  Ember.run(function(){
    component.set('showMaskOnFocus', false);
  });

  andThen(function() {
    var input = find('input');
    input.focus();
    equal(input[0].value, '');
  });
});
*/

test('clearIncomplete works', function() {
  expect(1);

  var component = this.subject();

  // append the component to the DOM
  this.append();

  Ember.run(function(){
    component.set('mask', '9-9+9');
    component.set('clearIncomplete', true);
  });

  fillIn('input', '6');
  triggerEvent('input', 'blur');
  andThen(function() {
    equal(find('input').val(), '');
  });
});

test('greedyMask works', function() {
  expect(3);

  var component = this.subject();

  // append the component to the DOM
  this.append();

  Ember.run(function(){
    component.set('mask', '9[99]');
  });

  andThen(function() {
    var input = find('input');
    input.mouseenter();
    equal(find('input')[0].value, '_');
  });

  fillIn('input', '66');
  triggerEvent('input', 'blur');
  andThen(function() {
    var input = find('input');
    input.mouseenter();
    equal(find('input')[0].value, '66_');
  });

  Ember.run(function(){
    component.set('greedyMask', true);
  });

  fillIn('input', '');
  andThen(function() {
    var input = find('input');
    input.mouseenter();
    equal(find('input')[0].value, '___');
  });
});