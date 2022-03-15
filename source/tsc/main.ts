addEventListener("DOMContentLoaded", (event) => {
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
	const htmlText = ("\r\n\r\n" + markdownText
		.replace(/^### (.*$)/gim, '<h3>$1</h3>')
		.replace(/^## (.*$)/gim, '<h2>$1</h2>')
		.replace(/^# (.*$)/gim, '<h1>$1</h1>')
		.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
		.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
		.replace(/\*(.*)\*/gim, '<i>$1</i>')
		.replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
		.replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>") + "\r\n\r\n")
        .replace(/\r\n\r\n/gim, "</div><div>")
		.replace(/\n/gim, ' ')
        .replace(/\<\/div\>/im, "")
		.replace(/\<div\>$/im, "")
		console.log(htmlText);


	return htmlText.trim()
}