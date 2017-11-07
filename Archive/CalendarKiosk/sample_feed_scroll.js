// START SCRIPT


var SNshow	= "yes"		// SHOW NEWS IFRAME



   if (SNshow == "yes") {

// START SCROLLING FEED
document.write('<div id="feed_iframe_scroll">');
document.write('<div class="scroll_feed-title">');
document.write('RSS News Feed<br>');
document.write('</div>');
document.write('<iframe name="FeedIFrame" src="feed_scroll.html" frameborder="0" scrolling="no"></iframe>');
document.write('</div>');
// END SCROLLING FEED


}

// END SCRIPT
