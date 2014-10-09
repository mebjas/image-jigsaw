/**
 * jquery plugin to create image jigsaw
 */

(function( $ ) {
	$.fn.jigsaw = function(options)
	{
		var settings = $.extend( {}, $.fn.jigsaw.defaults, options );
		$.fn.jigsaw.defaults = settings;
        
		//image value in defaults
		$.fn.jigsaw.defaults.image = this.children("img").attr("src");
		this.append('<div class="jigsaw_panel_"></div>');
		$.fn.jigsaw.defaults.width = this.children("img")[0].width;
		$.fn.jigsaw.defaults.height = this.children("img")[0].height;
		
		obj = this.children(".jigsaw_panel_");
		obj.css("width",parseInt($.fn.jigsaw.defaults.width) + parseInt($.fn.jigsaw.defaults.x * $.fn.jigsaw.defaults.margin * 2) +parseInt($.fn.jigsaw.defaults.error) +"px").css("height",parseInt($.fn.jigsaw.defaults.height) + parseInt($.fn.jigsaw.defaults.y * $.fn.jigsaw.defaults.margin*2) +"px");
		w = Math.floor($.fn.jigsaw.defaults.width/$.fn.jigsaw.defaults.x);
		h = Math.floor($.fn.jigsaw.defaults.height/$.fn.jigsaw.defaults.y);
		for(i=0;i<$.fn.jigsaw.defaults.x;i++)
		{
			for(j=0;j<$.fn.jigsaw.defaults.y;j++)
			{
				pos = "block" +i +j;
				obj.append("<div pos='" +pos +"'></div>");
				obj.children("div[pos='" +pos +"']").css("background-position","-" +(j*w) +"px -" +(i*h) +"px").css("width",w +"px").css("height",h+"px").css("background-image","url("+$.fn.jigsaw.defaults.image+")").css("display","inline-block").css("margin",$.fn.jigsaw.defaults.margin).css("background-repeat","no-repeat").css("transition","background-position .5s ease-out");
			}
		}
		this.children("img").hide();
		obj.fadeIn();
		animate(this);
	}
	
	$.fn.jigsaw.defaults = {
		width: 0,
		height: 0,
		x : 4,
		y : 4,
		margin : 1,
		error : 16,
		freq :2000,
		image: ""
	}
	
	function animate(obj)
	{
		w = Math.floor($.fn.jigsaw.defaults.width/$.fn.jigsaw.defaults.x);
		h = Math.floor($.fn.jigsaw.defaults.height/$.fn.jigsaw.defaults.y);
		var len = obj.children(".jigsaw_panel_").children("div").length;
		for(i=0;i<len;i++)
		{
			var randI = Math.floor((Math.random()*3)+0);
			var randJ = Math.floor((Math.random()*3)+0);
			
			var bp = "-" +(randI*w) +"px -" +(randJ*h) +"px";
			obj.children(".jigsaw_panel_").children("div:eq(" +i +")").css("background-position",bp);
		}
		if(Math.floor((Math.random()*5)+0) == 2)
		{
			t = setTimeout(function(){rearrange(obj)},$.fn.jigsaw.defaults.freq);
		}
		else
			t = setTimeout(function(){animate(obj);},$.fn.jigsaw.defaults.freq);
	}
	function rearrange(obj)
	{
		w = Math.floor($.fn.jigsaw.defaults.width/$.fn.jigsaw.defaults.x);
		h = Math.floor($.fn.jigsaw.defaults.height/$.fn.jigsaw.defaults.y);
		for(i=0;i<$.fn.jigsaw.defaults.x;i++)
		{
			for(j=0;j<$.fn.jigsaw.defaults.y;j++)
			{
				pos = "block" +i +j;
				obj.children(".jigsaw_panel_").children("div[pos='" +pos +"']").css("background-position","-" +(j*w) +"px -" +(i*h) +"px").css("width",w +"px").css("height",h+"px").css("background-image","url("+$.fn.jigsaw.defaults.image+")");
			}
		}
		t = setTimeout(function(){animate(obj)},$.fn.jigsaw.defaults.freq);
	}
	
}( jQuery ));