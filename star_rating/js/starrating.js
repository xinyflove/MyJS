var __slice = [].slice;

(function($, window) {
  var Starrating;
  window.Starrating = Starrating = (function() {
    Starrating.prototype.defaults = {
      rating: void 0,
      numStars: 5,
      emptyStarClass: 'fa fa-star-o',
      fullStarClass: 'fa fa-star',
      change: function(e, value) {}
    };

    function Starrating($el, options) {
      var i, _, _ref;
      this.options = $.extend({}, this.defaults, options);
      this.$el = $el;
      _ref = this.defaults;
      for (i in _ref) {
        _ = _ref[i];
        if (this.$el.data(i.toLowerCase()) != null) {
          this.options[i] = this.$el.data(i.toLowerCase());
        }
      }
      if (this.$el.data('connected-input')) {
        this.$connectedInput = $("[name=\"" + (this.$el.data('connected-input')) + "\"]");
        this.options.rating = this.$connectedInput.val() ? parseInt(this.$connectedInput.val(), 10) : void 0;
      }
      this.createStars();
      this.syncRating();
      if (this.$connectedInput && this.$connectedInput.is(':disabled')) {
        return;
      }
      this.$el.on('mouseover.starrating', 'i', (function(_this) {
        return function(e) {
          return _this.syncRating(_this.getStars().index(e.currentTarget) + 1);
        };
      })(this));
      this.$el.on('mouseout.starrating', (function(_this) {
        return function() {
          return _this.syncRating();
        };
      })(this));
      this.$el.on('click.starrating', 'i', (function(_this) {
        return function(e) {
          return _this.setRating(_this.getStars().index(e.currentTarget) + 1);
        };
      })(this));
      this.$el.on('starrating:change', this.options.change);
      if (this.$connectedInput != null) {
        this.$el.on('starrating:change', (function(_this) {
          return function(e, value) {
            _this.$connectedInput.val(value);
            return _this.$connectedInput.trigger('focusout');
          };
        })(this));
      }
    }

    Starrating.prototype.getStars = function() {
      return this.$el.find('i');
    };

    Starrating.prototype.createStars = function() {
      var _i, _ref, _results;
      _results = [];
      for (_i = 1, _ref = this.options.numStars; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--) {
        _results.push(this.$el.append("<i class='" + this.options.emptyStarClass + "'></i>"));
      }
      return _results;
    };

    Starrating.prototype.setRating = function(rating) {
      if (this.options.rating === rating) {
        rating = void 0;
      }
      this.options.rating = rating;
      this.syncRating();
      return this.$el.trigger('starrating:change', rating);
    };

    Starrating.prototype.getRating = function() {
      return this.options.rating;
    };

    Starrating.prototype.syncRating = function(rating) {
      var i, _i, _j, _ref, _ref1;
      rating || (rating = this.options.rating);
      if (rating) {
        for (i = _i = 0, _ref = rating - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          this.getStars().eq(i).removeClass(this.options.emptyStarClass).addClass(this.options.fullStarClass);
        }
      }
      if (rating && rating < this.options.numStars) {
        for (i = _j = rating, _ref1 = this.options.numStars - 1; rating <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = rating <= _ref1 ? ++_j : --_j) {
          this.getStars().eq(i).removeClass(this.options.fullStarClass).addClass(this.options.emptyStarClass);
        }
      }
      if (!rating) {
        return this.getStars().removeClass(this.options.fullStarClass).addClass(this.options.emptyStarClass);
      }
    };

    return Starrating;

  })();
  return $.fn.extend({
    starrating: function() {
      var args, option;
      option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this.each(function() {
        var data;
        data = $(this).data('starrating');
        if (!data) {
          $(this).data('starrating', (data = new Starrating($(this), option)));
        }
        if (typeof option === 'string') {
          return data[option].apply(data, args);
        }
      });
    }
  });
})(window.jQuery, window);

$(function() {
  return $(".starrating").starrating();
});
