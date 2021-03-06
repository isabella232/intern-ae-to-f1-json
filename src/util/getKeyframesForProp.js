'use strict';

var getEaseForKeyFrame = require('./getEaseForKeyFrame');

// this function will export keyframes for a property
module.exports = function getKeyFramesForProp(prop) {
  var rVal = [];

  // some properties don't have a value set on them
  if (prop.propertyValueType !== PropertyValueType.NO_VALUE) {
    // we have keyframes add all keyframes
    if (prop.numKeys > 0) {
      // Position needs to be an expression to track curved motion
      if (prop.name === 'Position' && prop.numKeys > 2) {
        convertToExpression(prop);
      }

      for (var i = 1; i <= prop.numKeys; i++) {
        rVal.push([prop.keyTime(i), prop.keyValue(i), getEaseForKeyFrame(prop, i)]);
      }
      // we do not have keyframes just add the first
    } else {

      // some properties don't have this
      if (prop.valueAtTime) {
        rVal.push([0, prop.valueAtTime(0, false)]);
      }
    }
  }

  return rVal;

  function convertToExpression(prop) {
    prop.selected = true;
    // Command "Add Expression"
    app.executeCommand(2702);
    // Command "Convert Expression to Keyframes"
    app.executeCommand(2639);
  }
};