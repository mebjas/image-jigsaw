/**
 * Image jigsaw js library
 * code created by minhaz
 * easy library to create a jigsaw with image
 */
 
/**
 * gloabl variables to store width and height of image
 */
var width;
var height;

/**
 * defining no of tiles of jigsaw in horizontal and vertical term
 */
x = 4;
y = 4;

/**
 * margin spacing between each jigsaw tile
 */
margin = 3;

error = 16;
var t;

/**
 * time after which jigsaw anim occurs
 */
var freq = 2000;


$(document).ready(function(){
	$("body").append('<div class="panel_"></div>');
	width = $(".panel img").attr("width");
	height = $(".panel img").attr("height");
	console.log(width +"," +height);
	
	obj = $(".panel_");
	obj.css("width",width + x*margin*2 +error +"px").css("height",height + y*margin*2 +"px");
	w = Math.floor(width/x);
	h = Math.floor(height/y);
	
	for(i=0;i<x;i++)
	{
		for(j=0;j<y;j++)
		{
			pos = "block" +i +j;
			obj.append("<div pos='" +pos +"'></div>");
			$("div[pos='" +pos +"']").css("background-position","-" +(j*w) +"px -" +(i*h) +"px").css("width",w +"px").css("height",h+"px").css("background-image","url(img.jpg)");
			//background-position: -10px -10px;
		}
		obj.append("<p class='clearfix'></p>");
	}
	$(".panel img").hide();
	obj.fadeIn();
	
});
animate();
function animate()
{
	var len = $(".panel_ div").length;
	for(i=0;i<len;i++)
	{
		var randI = Math.floor((Math.random()*3)+0);
		var randJ = Math.floor((Math.random()*3)+0);
		
		var bp = "-" +(randI*w) +"px -" +(randJ*h) +"px";
		$(".panel_ div:eq(" +i +")").css("background-position",bp);
	}
	if(Math.floor((Math.random()*5)+0) == 2)
	{
		t = setTimeout("rearrange()",freq);
	}
	else
		t = setTimeout("animate()",freq);
}
function rearrange()
{
	w = Math.floor(width/x);
	h = Math.floor(height/y);
	for(i=0;i<x;i++)
	{
		for(j=0;j<y;j++)
		{
			pos = "block" +i +j;
			$("div[pos='" +pos +"']").css("background-position","-" +(j*w) +"px -" +(i*h) +"px").css("width",w +"px").css("height",h+"px").css("background-image","url(img.jpg)");
		}
	}
	t = setTimeout("animate()",freq);
}