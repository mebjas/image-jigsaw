Image jigsaw js library
================================================
easily create a jigsaw from any image - [view demo](http://minhazav.me/samples/jquery-image-jigsaw/)

**screenshot**

![alt tag](http://minhazav.me/samples/jquery-image-jigsaw/screenshot.png)


**How to use**

**To create a jigsaw**
create a **div class="panel"** and place the required image inside it like
<pre>
&#60div class="panel">
	&#60img src="img.jpg">
&#60/div>
</pre>
**you need to mention the height and width for the code to perform its task**


you need to include the scripts in **./js/** directory like
<pre>
&#60script src="js/jquery.js">&#60/script>
&#60script src="js/img.js">&#60/script>
&#60script>
	$(".panel").jigsaw({freq: 2000, x: 4, y: 4, margin: 2});
&#60/script>
</pre>

##Explanation for property fields
```
freq: time in milli seconds when the images should change
x: no of columns
y: no of rows
margin: margin between each blocks
distinct: (new) set to false if you dont require each block to be distinct images
```


