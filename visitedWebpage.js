/*
3. We have an application that crawls
the internet looking at web pages
and following the URLs it finds to
scrape data from each page for processing later.
As the amount of content on the internet has grown,
the application has had trouble with scalability.
In its current state, when the crawler finds a link,
it enqueues that link, and eventually scrapes
that page as it works through its queue.
We've found that there is nothing in place
to prevent the crawler from scraping a page
even if it has already visited that page.

So, we need you to implement a solution
that the crawler will use to traverse a
page at most one time.
Your solution needs to provide a method
to check if a page has been visited,
and another method to store a URL
once it has been visited.
*/

class WebpageTracker {
	constructor() {

		// A set should be used to hold the list of visited pages
		// Lookup time to check if a page is already visited is constant time
		this.visited = new Set();
	}

	hasVisited(webPage) {
		return this.visited.has(webPage);
	}

	// This function assumes that the crawler has already
	// visited the page so this function should be used
	// immediately after visiting the page to update
	// the set of visited pages
	add(webPage) {
		if (!this.hasVisited(webPage)) {
			this.visited.add(webPage);
		}
	}

}

// Example list of urls to track visiting
testInput = [ 
 "https://www.google.com/search?q=best+movies+of+all+time",  "https://www.imdb.com/chart/top", 
 "https://www.imdb.com/title/godfather", 
 "https://www.imdb.com/title/godfather-part-2", 
 "https://www.imdb.com/title/lord-of-the-rings", 
 "https://www.imdb.com/title/inception", 
 "https://www.facebook.com/imdb", 
 "https://www.facebook.com/rottentomatoes", 
 "https://www.rottentomatoes.com/top/bestofrt", 
 "https://www.rottentomatoes.com/m/godfather", 
 "https://www.rottentomatoes.com/m/godfather-2", 
 "https://www.rottentomatoes.com/m/lord-of-the-rings",    "https://www.facebook.com/rottentomatoes", 
 "https://www.facebook.com/imdb", 
 "https://www.imdb.com/chart/top", 
 "https://www.imdb.com/title/godfather", 
 "https://www.imdb.com/title/godfather-part-2", 
 "https://www.imdb.com/title/lord-of-the-rings", 
 "https://www.imdb.com/title/inception", 
 "https://www.facebook.com/imdb", 
 "https://www.facebook.com/rottentomatoes", 
 "https://www.rottentomatoes.com/top/bestofrt", 
 "https://www.rottentomatoes.com/m/godfather", 
 "https://www.rottentomatoes.com/m/godfather-2", 
 "https://www.rottentomatoes.com/m/lord-of-the-rings" ]

 wpTracker = new WebpageTracker();
 for (let url of testInput) {
	console.log(url);
	console.log(wpTracker.hasVisited(url));
	wpTracker.add(url);
 }
 console.log(wpTracker.visited);
