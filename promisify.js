module.exports = function promisify(fn) {
  return function() {
    if (typeof Promise === 'undefined')
      return fn.apply(null, arguments);

    var args = [].slice.call(arguments);
    var cb = args[args.length - 1];
    if (typeof cb !== 'function') {
      return new Promise(function(resolve) {
        args.push(resolve);
        fn.apply(null, args);
      });
    } else {
      return fn.apply(null, args);
    }
  }
}
