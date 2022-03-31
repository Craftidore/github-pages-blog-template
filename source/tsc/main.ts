addEventListener("DOMContentLoaded", (event) => {
	// set marked settings
	marked.use({
		pedantic: false,
		gfm: true,
		breaks: false,
		sanitize: false,
		smartLists: true,
		smartypants: false,
		xhtml: false
	});

	// render hash is necessary
	if (location.hash != "" && location.hash != "#") {
		loadBlog(location.hash)
	}
	else {
		loadBlog("#Home")
	}

});
addEventListener("hashchange", (event) => {
	loadBlog(location.hash)
})
function loadBlog(hash:string){
	$ajaxUtils.sendGetRequest("/blog/"+hash.substring(1)+".md", (response:any) => {
		let markdown = response.responseText;
		document.getElementById("content").innerHTML = parseMarkdown(markdown);
	});	document.getElementById("content");
}
function parseMarkdown(markdownText:string):string {
	console.log(markdownText)
	const htmlText = marked.parse(markdownText);
	console.log(htmlText);


	return htmlText.trim()
}