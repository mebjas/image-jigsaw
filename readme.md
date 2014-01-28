Image jigsaw js library
================================================
easily create a jigsaw from any image

**screenshot**

![alt tag](http://cistoner.org/sample/image-jigsaw/screenshot/screenshot.png)


**How to use**



For the user interface you need to include the stylesheet in ./css/ directory like
<pre>
&#60link rel="stylesheet" href="css/img.css">
</pre>

**To create a jigsaw**
create a **div class="panel"** and place the required image inside it like
<pre>
&#60div class="panel">
	&#60img src="img.jpg" width="480" height="480">
&#60/div>
</pre>
**you need to mention the height and width for the code to perform its task**


you need to include the scripts in **./js/** directory like
<pre>
&#60script src="js/jquery.js">&#60/script>
&#60script src="js/img.js">&#60/script>
&#60script>
	$(".panel").jigsaw({freq: 2000});
&#60/script>
</pre>


