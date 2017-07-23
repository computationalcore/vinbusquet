var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

var TextScramble = function () {
  function TextScramble(el) {
    _classCallCheck(this, TextScramble);

    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }

  _createClass(TextScramble, [{
    key: 'setText',
    value: function setText(newText) {
      var _this = this;

      var oldText = this.el.innerText;
      var length = Math.max(oldText.length, newText.length);
      var promise = new Promise(function (resolve) {
        return _this.resolve = resolve;
      });
      this.queue = [];
      for (var i = 0; i < length; i++) {
        var from = oldText[i] || '';
        var to = newText[i] || '';
        var start = Math.floor(Math.random() * 40);
        var end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from: from, to: to, start: start, end: end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
  }, {
    key: 'update',
    value: function update() {
      var output = '';
      var complete = 0;
      for (var i = 0, n = this.queue.length; i < n; i++) {
        var _queue$i = this.queue[i],
            from = _queue$i.from,
            to = _queue$i.to,
            start = _queue$i.start,
            end = _queue$i.end,
            char = _queue$i.char;

        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += '<span class="dud">' + char + '</span>';
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
  }, {
    key: 'randomChar',
    value: function randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }]);

  return TextScramble;
}();

// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

var phrases = ['"Not only is the universe stranger than we think, it is stranger than we can think."','“The Universe is under no obligation to make sense to you.”','"Study hard what interests you the most in the most undisciplined, irreverent and original manner possible."','"The important thing is not to stop questioning. Curiosity has its own reason for existence."','Good Luck', 'dnMzVVAxVlFhemZuK0lkNzNCNVZsZkZSZTVuQmk1SXhkV1hLRjU5L1c4V2RHeGZKZnBJMXh5QlhYK2pYY2ViYg0KdFVFeUtUeEpRMS9BTWcyMVVGcXh6Q0VmSmwxOFhIQnVjS0dmamxBMzVpNUoxRU9OQWJrVDdPTkdyRzdIL1NuaQ0KTDNJY01PRzFtRlFRWm5vMFNyVXlRNmFHcVcyTGRva1lrYXZHRHV6RG1NOUFGM3BiTlZKMGZKbkVuQTFlWUpJQg0KZ1dSYTloRTMrR3JYNGswdlJJL0twVXZMRTNFUHlxRm95TmhCajl2MURWMGl5VVdueWVmY2hIYm9iU0hsc1BicA0KNjVoNGpKeDR6R2tSdlZwSERGcmkxUTQ4b2xEdUNvSkZvRkROU3RhWlFwdEE0SlNsRkE3RFludGp1U01PMW44TA0KVkJzaFAvUGJCamwvVkFYcmNiakFtbzJRY3MzUGtRT0VuME9BcTRxaFU0UWtvVXpMZURLb3FSVHJNUEFBVlNMSg0KRWMvKy9PNmFhYzR4eE5RTjVoc2J1YmVRREpUTDRUeWc4b0w3OVp2TnBwM3dKWFhYMVpQRUZKN2dwNi9nTjBaVQ0KZzJWVFBKVy9sL2drVlFaRDE4a29meStIUWp6cFF3SWl3NjVDbGtORjl0V0NGR1pLRXNUZnk3cERERW91K1JEMw0KVUEvT2Ftdi83aWdMSW5qSW5BV2xVMkRCQkdlUHR6djU2Y3hYdk11cmFINHYvblNUQ29TOUFoVFhIZWJrNlF6Zg0KT0ZuM3VjRWxCLzFIZ3RHWnpRNk9NbllHNUFyNkFteFhOTHFJSll0SGpBcHhzTHczTXpVZDk1cnRob09IVnRiZg0KbEtWL3hMV0IwTUtKWnpzcDExcTFOSVZTQnZIVFJIUG5wdEI0dnA2R1hxK0tUZkZ4TWZqamN2NTBjQk1wR2QycQ0KSG90K2Q2ZnExWXYzZU1iUktKbllYeDV0N0lyTGxqWVgxWDFFdjFlY1U4R0NHQ2V1NmpMcFE2MjRiWEpwdlZyNw0KSGNWOVBhQmNjcHVmMkJCbWtjQ0VSSEpDaUxLRFl1LzNDYjRSeGtDNDA3dFYrbUsrWUc4N21IS3N4LzczTFM5RA0KV0FBcGk2S2ZLb0k3S0ZJSzI0bXpReE44SDlzTlhycGQ1NlJRTE5MMmk4ZVplQllYTFpFeWV0VGRPYzRKZ2lQQg0Kb2ZYaUlLamJXc2ZqSURTdDY3UnVGTzFzd3kwQVA0R0JIVHMvV21NOHRFNEZkalYvdm16VkhFbEQ2S04vVnl6eg0KRlRWa0F1NGJZb0dzTW12RTdaa2FFdlNuNzFEZ3RZbVdPUXZXTWVMY0tMTE9lY1dlUFptOEh5aVZiMlAySEV4Qw0KYk85YkxqeFI1WkgrUnpuM2dhaC84UzFCZjYwQ1Q1bkN3MHp0Q2Z5WE5od2w0Wm1uYy9DREMySjlWYnp0WG45cA0KVUtSSlRsODU5OHhyNlpsbVVabStLTTNtSHVqSzRxVjhwMSs3NzJEVzNzanJVVGhaMGJ2ZUZ2OElkYWhoNFBvSw0KSnAyOWM0VDZzaWNNbStMbm5tR3dPaVI3VFExelFucVFLWmtLVERkcWRQQkkvYzRhNHVBR1BiWjZYWkgxa1p0bA0Kd3BHTjh0eGxjVDJjZHZGaHNGK2VwbCtqdWluUm1NNThPSTE4Z0VheFNJNEprM2Voa1A3U2Zwc3AwTnAza3BzMA0KM0hlWHRMWWQvK3VWOGtRN2QwZjhQbDlnWExCRHEvRldLMW1FYXRmOW9xb0tBa24zcDlrT0hwcDFsTjNrQ1hlbA0KN1VIcElST3U4Rk9oZWRzaDNURk1jL1kvYi9vS2Nvb2VyY2g1TFZqMXpuZ0RrVHdPTmtBUWFjTFBPSDgvWCtseA0KbTNMZDhibUJDKy9rQm1zWTlmMWhmQnNwY0gxaGtwY3ZhQ1QwZUY5RVZyTTFrRXNENEZqRVdYUlNwbk5HUmc5YQ0KQ3VJYUM3SjZGTzlZVHNBSmpoM1lpaUtGZWM5ZFpva3A5bFBpVzBDSmdiVFhWN2pUSzcwK3g2TUVveGJOL3VBcQ0KUERMWXo0bjFBTXVVN2c1VnBKaUtUc0J0REYrN0R0UURvVUd3YmRPS3kvTnk3MUtxMkZsaCs4ZjZYMzJKRnV1Rw0KbXNFWmJ3RGpqZlhUUC9sRWFNcjhBMVdqQ0YzbThtZW9LY3ZwR1ZWdGZ5TEQ5TFF4UHZDSW5MREhPMUNvUE9iMg0KK2p0aWFabkg2emRCeDd3R1hhU00wSHRabXV4ZGJlaVlJZGxHam9Sa3VhUTYrc0xXZy9YSFJaYzQ5ZENYQVVJRg0KVGYvU1R4ZDJBSi9OaWxHWGRNTWtJZ3VIaTUybDBYWTJkYkNCZ0xSMlFsbHhlYXR0QkpHZkR1YkduSnJlaGpVcw0KNXI3Umt2NjFBZk0vL0tKV3luUHFmMzQ0bC9ybzdIY3U1TmtWWk5mdjBFSjExN0xKOCtTMHVIOVk0blFpSCt0eg0Kd3U2NnUvSjdhTmRibEJvRVNJbnVMNGE1OXJDd3JZRG5LQ1lJWURuNzNpTXUvK3dmWmh0dXBWZG0wNnRQeW8xcg0KQVo4VWZRM05kR1ZiTjFXTE1pT1RPbWE3eW53WUpmTUdPSDJQeTBudlFhVjZkZm9zVm1qM3JuNkxlV1lNNkdJaA0KWk8wTHRiMVIvNE4vMStrV0wwT2NvVUYrMVUyMjBQSnZ4dmtVc3M0YWt6eDlDaGE2eXVIa01IQUI4R0V5NnRKOA0KMXdHQ002NUMxUDFGRWFPOXVPbkdZVEhySlluU3Y2Z0Z6OGZRZm9nZHFKOFlXcDRZaVlUenhDSGxqL0g3WTZsUw0KT0FXZ0tsZ29VeWxpTkNocFJjWFRQOCtOV3h2RW5Vck5jT0IwNmNRSEJ1OXR1blVTZkVJOEwyanZwcXVrVml0Sg0Kc3FWcTAvUzN4TlAxWXBRMmFUb1dGTUdSN0xyaFowL3BHOUErT2hHMjZPaGZKNGM5ZUVQV01BcU81MHFkWWlzQg0Ka2JzdFgvVklBNGtMai9wbDhEcDZHQW10MXE3WlpiTmxvL1dVcXBaWEEzUDRzTW1pSlp3cHdydVpLZFBoWnJGNA0KMHhsQXhaRkU0Q1czNnVyeWUrVFUvbHo2T1UzNzdlQ0lnT09qRjVDMFV5SHlKSWRRdGtkOHFoSE5XTHpBYW1xMg0KcTVJaXpnSGt5WFJnc1JTa25STmd3VTR1RUNtaENSV2x2d2ZEeUlpQTdCQzUxbEppSXNkM0dFamNhdkUrSERkYg0KUTVGOGsyUjVQWjA2MnNuRC84eXFSTFpsQWFaWW9tbHNCSm1yYUhWd0FSVmx4N2tCQXdtdGgxaVpmak9lWlU1UA0KbENQQXRMblNiVCtUS0Vua1ZmNlVUdEhjQm5MTnJrY3d2amZGRjZaMFAwQzV6Uk15MHdGSmY0ZUI1S1lIejRaTg0KRG1DRXpXbFpKUnZQR0lzUnBndlloQUFKY1ZPbCtoTHJTekhsWWw1Zm95TGpQK2NTVjBxeXh3OC8rUjByamV1Yg0KVVMrNlhRejNRbVRaeks1R1hWZXhrclhHNk5lWXlJa2xUQ2ZPU01kdlNQbHNOdDBsYThPL0NKUHJYeitybWFjWQ0KRml4V1liUUhHb1pnMDI0MG4xa0xKVjNEMlBSY3E1NDdKOUdBNUw2d3NKTT0=']
var el = document.querySelector('.text');
var fx = new TextScramble(el);

var counter = 0;
var next = function next() {
  fx.setText(phrases[counter]).then(function () {
    if (counter < phrases.length - 1) {
      setTimeout(next, 1500 + 30 * phrases[counter].length);
      counter = counter + 1;
    }
    else{
      el.setAttribute("style", "word-break: break-all;");
    }
  });
};

next();
