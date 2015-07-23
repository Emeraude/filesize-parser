var validAmount  = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var parsableUnit = function(u) {
  return u.match(/\D*/).pop() === u;
};

var incrementBases = {
  2: [
    [["B", "Bytes"], 1],
    [["Kb"], 128],
    [["k", "K", "kb", "KB", "KiB"], 1024],
    [["Mb"], 131072],
    [["m", "M", "mb", "MB", "MiB"], Math.pow(1024, 2)],
    [["Gb"], 1.342e+8],
    [["g", "G", "gb", "GB", "GiB"], Math.pow(1024, 3)],
    [["Tb"], 1.374e+11],
    [["t", "T", "tb", "TB", "TiB"], Math.pow(1024, 4)],
    [["Pb"], 1.407e+14],
    [["p", "P", "pb", "PB", "PiB"], Math.pow(1024, 5)],
    [["Eb"], 1.441e+17],
    [["e", "E", "eb", "EB", "EiB"], Math.pow(1024, 6)]
  ],
  10: [
    [["B", "Bytes"], 1],
    [["Kb"], 125],
    [["k", "K", "kb", "KB", "KiB"], 1000],
    [["Mb"], 125000],
    [["m", "M", "mb", "MB", "MiB"], 1.0e+6],
    [["Gb"], 1.25e+8],
    [["g", "G", "gb", "GB", "GiB"], 1.0e+9],
    [["Tb"], 1.25e+11],
    [["t", "T", "tb", "TB", "TiB"], 1.0e+12],
    [["Pb"], 1.25e+14],
    [["p", "P", "pb", "PB", "PiB"], 1.0e+15],
    [["Eb"], 1.25e+17],
    [["e", "E", "eb", "EB", "EiB"], 1.0e+18]
  ]
};


module.exports = function (input) {
  var options = arguments[1] || {};
  var base = parseInt(options.base || 2);

  var parsed = input.toString().match(/^([0-9\.,]*)(?:\s*)?(.*)$/);
  var amount = parsed[1];
  var unit = parsed[2];

  var validUnit = function(sourceUnit) {
    return sourceUnit === unit;
  };

  if (!validAmount(amount) || !parsableUnit(unit)) {
    throw 'Can\'t interpret ' + (input || 'a blank string');
  }
  if (unit === '') return amount;

  increments = incrementBases[base];
  for (var i = 0; i < increments.length; i++) {
    var _increment = increments[i];

    if (_increment[0].some(validUnit)) {
      return amount * _increment[1];
    }
  }

  throw unit + ' doesn\'t appear to be a valid unit';
};
