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
  },
  unit: true
});

test('regex works', function(assert) {
  assert.expect(3);

  var component = this.subject();

  // append the component to the DOM
  this.render();

  Ember.run(function(){
    component.set('mask', 'regex');
    component.set('pattern', 'you_can_only_type_thi[s]+');
  });

  // testing filled in value
  fillIn('input', 'test');
  triggerEvent('input', 'blur');
  andThen(function() { // wait for async helpers to complete
    assert.equal(find('input').val(), '');
  });

  fillIn('input', 'you_can_only_type_this');
  triggerEvent('input', 'blur');
  andThen(function() {
    assert.equal(find('input').val(), 'you_can_only_type_this');
  });

  fillIn('input', 'you_can_only_type_thisssss');
  triggerEvent('input', 'blur');
  andThen(function() {
    assert.equal(find('input').val(), 'you_can_only_type_thisssss');
  });
});

test('showMaskOnHover works', function(assert) {
  assert.expect(3);

  var component = this.subject();

  // append the component to the DOM
  this.render();

  Ember.run(function(){
    component.set('mask', '9-9+9');
  });

  andThen(function() { // wait for async helpers to complete
    var input = find('input');
    input.mouseenter();
    assert.equal(find('input')[0].inputmask._valueGet(), '_-_+_');
  });

  andThen(function() {
    var input = find('input');
    input.mouseleave();
    assert.equal(find('input')[0].inputmask._valueGet(), '');
  });

  andThen(function() {
    Ember.run(function(){
      component.set('showMaskOnHover', false);
    });

    var input = find('input');
    input.mouseenter();
    assert.equal(find('input')[0].inputmask._valueGet(), '');
  });
});

/* UNABLE TO TEST showMaskOnFocus, focus event not triggered
 * by the `focus()` function. Seems to be a limitation of qUnit.
 *

test('showMaskOnFocus works', function() {
  expect(2);

  var component = this.subject();

  // append the component to the DOM
  this.render();

  Ember.run(function(){
    component.set('mask', '9-9+9');
  });

  andThen(function() { // wait for async helpers to complete
    var input = find('input');
    input.focus();
    equal(input[0].inputmask._valueGet(), '_-_+_');
  });

  Ember.run(function(){
    component.set('showMaskOnFocus', false);
  });

  andThen(function() {
    var input = find('input');
    input.focus();
    equal(input[0].inputmask._valueGet(), '');
  });
});
*/

test('clearIncomplete works', function(assert) {
  assert.expect(1);

  var component = this.subject();

  // append the component to the DOM
  this.render();

  Ember.run(function(){
    component.set('mask', '9-9+9');
    component.set('clearIncomplete', true);
  });

  fillIn('input', '6');
  triggerEvent('input', 'blur');
  andThen(function() {
    assert.equal(find('input').val(), '');
  });
});

test('greedyMask works', function(assert) {
  assert.expect(3);

  var component = this.subject();

  // append the component to the DOM
  this.render();

  Ember.run(function(){
    component.set('mask', '9[99]');
  });

  andThen(function() {
    var input = find('input');
    input.mouseenter();
    assert.equal(find('input')[0].inputmask._valueGet(), '_');
  });

  fillIn('input', '66');
  triggerEvent('input', 'blur');
  andThen(function() {
    var input = find('input');
    input.mouseenter();
    assert.equal(find('input')[0].inputmask._valueGet(), '66_');
  });

  fillIn('input', '');
  andThen(function() {
    Ember.run(function(){
      component.set('greedyMask', true);
    });

    var input = find('input');
    input.mouseenter();
    assert.equal(find('input')[0].inputmask._valueGet(), '___');
  });
});
