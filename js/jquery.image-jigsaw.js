/**
 * jquery plugin to create image jigsaw
 */

(function( $ ) {
	/**
	 * Private class, for dealing with jigsaw thingy
	 * @param: elem (jQuery DOM object) - the target element
	 * @param: options (Object) - with properties
	 */
	var jigsaw = function(elem, options) {
		this.elem = elem;
		this.options = options;

		// check if this exist or not
		this.options.image = this.elem.children('img')[0].src;
		if (typeof this.options.image == 'undefined') return false;

		var _this = this;

		var img = new Image();
		img.onload = function() {
			_this.imageLoaded();
		}
		img.src = this.options.image;
	}

	/**
	 * Function (Event listener called) when the source image has loaded
	 * Does all init tasks
	 */
	jigsaw.prototype.imageLoaded = function() {
		this.elem.append('<div class="jigsaw_panel_"></div>');
		this.options.width = this.elem.children("img")[0].width;
		this.options.height = this.elem.children("img")[0].height;
		this.obj = this.elem.children(".jigsaw_panel_");

		this.obj.css("width", parseInt(this.options.width) + parseInt(this.options.x * this.options.margin * 2) +parseInt(this.options.error) +"px").css("height", parseInt(this.options.height) + parseInt(this.options.y * this.options.margin * 2) +"px");

		w = Math.floor(this.options.width / this.options.x);
		h = Math.floor(this.options.height /this.options.y);

		for(i=0;i<this.options.x;i++) {
			for(j=0;j<this.options.y;j++) {
				pos = "block" +i +j;
				this.obj.append("<div pos='" +pos +"'></div>");
				this.obj.children("div[pos='" +pos +"']")
							.css("background-position", "-" +(j*w) +"px -" +(i*h) +"px")
							.css("width", w +"px")
							.css("height", h+"px")
							.css("background-image", "url("+this.options.image+")")
							.css("display", "inline-block")
							.css("margin", this.options.margin)
							.css("background-repeat", "no-repeat")
							.css("transition", "background-position .5s ease-out");
			}
		}
		this.elem.children("img").hide();
		this.obj.fadeIn();
		this.animate(this.elem);
	};

	/**
	 * Function to animate blocks in random fashion
	 * @param: obj is the target element
	 */
	jigsaw.prototype.animate = function(obj) {
		w = Math.floor(this.options.width / this.options.x);
		h = Math.floor(this.options.height / this.options.y);
		var len = obj.children(".jigsaw_panel_").children("div").length;

		var selected = [];
		if (this.options.distinct) {
			for (i = 0; i < this.options.x; i++) {
				selected[i] = [];
				for (j = 0; j < this.options.y; j++) {
					selected[i][j] = false;
				}
			}
		}
		

		for(i = 0; i < len; i++) {
			var randI = Math.floor((Math.random() * 1000)) % this.options.x;
			var randJ = Math.floor((Math.random() * 1000)) % this.options.y;

			if (this.options.distinct && selected[randI][randJ]) {
				for (x = 0; x < this.options.x; x++) {
					for (y = 0; y < this.options.y; y++) {
						if (!selected[x][y]) {
							randI = x;
							randJ = y;
							break;
						}
					}
				}
			}
			selected[randI][randJ] = true;
			var bp = "-" +(randI * w) +"px -" +(randJ * h) +"px";
			obj.children(".jigsaw_panel_").children("div:eq(" +i +")").css("background-position",bp);
		}
		
		var _this = this;

		if(Math.floor((Math.random()*5)+0) == 2) {
			t = setTimeout(function() {
				_this.rearrange(obj)
			},this.options.freq);
		} else {
			t = setTimeout(function(){
				_this.animate(obj);
			},this.options.freq);
		}
	}

	/**
	 * Function to reorder blocks to right position
	 * @param: obj is the target element
	 */
	jigsaw.prototype.rearrange = function(obj) {
		w = Math.floor(this.options.width / this.options.x);
		h = Math.floor(this.options.height / this.options.y);
		for( i=0; i<this.options.x; i++) {
			for( j=0; j<this.options.y; j++) {
				pos = "block" +i +j;
				obj.children(".jigsaw_panel_").children("div[pos='" +pos +"']")
						.css("background-position", "-" +(j*w) +"px -" +(i*h) +"px")
						.css("width", w +"px")
						.css("height", h+"px")
						.css("background-image", "url(" +this.options.image+")");
			}
		}
		var _this = this;
		t = setTimeout(function(){
			_this.animate(obj)
		}, this.options.freq);
	}

	/**
	 * Jquery method contructor
	 * @param: options (Object) - options
	 */
	$.fn.jigsaw = function(options)
	{
		var settings = $.extend( {}, $.fn.jigsaw.defaults, options );
		$(this).each(function() {
			return new jigsaw($(this), settings);
		});
	}
	
	/**
	 * default public properties
	 */
	$.fn.jigsaw.defaults = {
		width: 0,
		height: 0,
		x : 4,
		y : 4,
		margin : 1,
		error : 16,
		freq :2000,
		distinct: true,
		image: ""
	}
	
}( jQuery ));