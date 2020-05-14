var scroll = new SmoothScroll('[data-scroll]', {
  speed: 1200,
  ignore: '[data-scroll-ignore]',
});

$(function() {
  const $gallery = $('.gallery a').simpleLightbox();
});

$(function() {
    $(".toggle").on("click", function() {
        if ($(".item").hasClass("active")) {
            $(".item").removeClass("active");
            $(this).find("a").html("<i class='fas fa-bars'></i>");
        } else {
            $(".item").addClass("active");
            $(this).find("a").html("<i class='fas fa-times'></i>");
        }
    });
});

window.addEventListener('DOMContentLoaded', function() {

 
  var inputs = document.querySelectorAll('input[type="tel"]');

  Array.prototype.forEach.call(inputs, function(input) {
    new InputMask({
      selector: input,
      layout: '+38 (___) ___-__-__',
    })
  })
})

function InputMask(options) {
  this.el = this.getElement(options.selector);
  if (!this.el) return console.log('Что-то не так с селектором');
  this.layout = options.layout || '+38 (___) ___-__-__';
  this.maskreg = this.getRegexp();
  this.setListeners();
}

InputMask.prototype.getRegexp = function () {
  var str = this.layout.replace(/_/g, '\\d');
  str = str.replace(/\(/g, '\\(');
  str = str.replace(/\)/g, '\\)');
  str = str.replace(/\+/g, '\\+');
  str = str.replace(/\s/g, '\\s');
  return str;
};

InputMask.prototype.mask = function (e) {
  var _this = e.target,
      matrix = this.layout,
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = _this.value.replace(/\D/g, "");

  if (def.length >= val.length) val = def;
  _this.value = matrix.replace(/./g, function (a) {
    return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
  });

  if (e.type == "blur") {
    var regexp = new RegExp(this.maskreg);
    if (!regexp.test(_this.value)) _this.value = "";
  } else {
    this.setCursorPosition(_this.value.length, _this);
  }
};

InputMask.prototype.setCursorPosition = function (pos, elem) {
  elem.focus();
  if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);else if (elem.createTextRange) {
    var range = elem.createTextRange();
    range.collapse(true);
    range.moveEnd("character", pos);
    range.moveStart("character", pos);
    range.select();
  }
};

InputMask.prototype.setListeners = function () {
  this.el.addEventListener("input", this.mask.bind(this), false);
  this.el.addEventListener("focus", this.mask.bind(this), false);
  this.el.addEventListener("blur", this.mask.bind(this), false);
};

InputMask.prototype.getElement = function (selector) {
  if (selector === undefined) return false;
  if (this.isElement(selector)) return selector;

  if (typeof selector == 'string') {
    var el = document.querySelector(selector);
    if (this.isElement(el)) return el;
  }

  return false;
};

InputMask.prototype.isElement = function (element) {
  return element instanceof Element || element instanceof HTMLDocument;
};
