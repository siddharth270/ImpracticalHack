var initials = ['hagge', 'shin', 'hat', 'dore', 'shizu', 'giya', 'nobi', 'looney', 'jerry', 'sunio', 'phin', 'ferb', 'krish', 'chota', 'tom', 'mario', 'shino' , 'mi'];
var nucleii = ['a', 'e', 'i', 'o', 'u', 'ae', 'ee', 'ie', 'oe', 'ue', 'oo', 'au', 'oi', 'ai', 'ea', 'y', 'ye', 'ou', 'oy', 'ey', 'uy', 'ay'];
var finals = ['man', 'chan', 'maru', 'ita', 'io', 'n', 'bheem', 'na', 'ori', 'toons', 'mon', 'ka', 'eas', 'moto', 'san', 'tsuke']; 

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function phoneme(forceInitial) {
  var config = random(1, 3);
  var target = '';
  if (forceInitial)
    config = config | 1;
  var initial = random(0, initials.length - 1);
  var nucleus = random(0, nucleii.length - 1);
  var final = random(0, finals.length - 1);
  if ((config & 1) == 1)
    target += initials[initial];
  target += nucleii[nucleus];
  if ((config & 2) == 2) {
    target += finals[final];
  }
  return {
    result: config,
    text: target,
  };
}

function correctCase(text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1);
}

function regionName() {
  var count = random(1, 2);
  var force = false;
  var word = '';
  for (var j = 0; j < count || word.length < 2; j++) {
    var result = phoneme(force);
    force = ((result.result & 2) === 0);
    word += result.text;
  }
  word = correctCase(word);
  if (word.length < 5 && random(0, 3) === 0) {
    var secondWord = correctCase(phoneme(false).text);
    word = word + ' ' + secondWord;
  }
  return word;
}

function peopleName(base) {
  var vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
  if (base.indexOf(' ') >= 0) {
    switch (random(0, 2)) {
      case 0:
        base = base;
        break;
      case 1:
        base = base.substring(0, base.indexOf(' '));
        break;
      case 2:
        base = base.substring(base.indexOf(' ') + 1);
        break;
    }
  }
  if (vowels.indexOf(base.substring(base.length - 1), 1) < 0) {
    switch (random(0, 2)) {
      case 0:
        return base + 'ian';
      case 1:
        return base + 'i';
      case 2:
        return base + 'ish';
    }
  } else {
    switch (random(0, 3)) {
      case 0:
        return base + 'an';
      case 1:
        return base;
      case 2:
        if (base.length < 5)
          return base + 'ic';
        return base.substring(0, base.length - 1) + 'ic';
      case 3:
        if (base.length < 5)
          return base + 'ish';
        return base.substring(0, base.length - 1) + 'ish';
    }
  }
  return base;
}

function generateRegion() {
  var quantityString = document.forms.form.quantity.value;
  var numberRegex = new RegExp('^[0-9]+$');
  quantity = 1;
  if (numberRegex.test(quantityString))
    quantity = parseInt(quantityString);
  var output = '';
  for (var i = 0; i < quantity; i++)
    output += regionName() + '<br>';
  document.getElementById('output').innerHTML = output;
}

function generatePeople() {
  var quantityString = document.forms.form.quantity.value;
  var numberRegex = new RegExp('^[0-9]+$');
  quantity = 1;
  if (numberRegex.test(quantityString))
    quantity = parseInt(quantityString);
  var output = '';
  for (var i = 0; i < quantity; i++) {
    var region = regionName();
    output += 'The Tales of ' + peopleName(region) + '<br>';
  }
  document.getElementById('output').innerHTML = output;
} 