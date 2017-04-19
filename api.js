var wikipedia_base_URL = 'https://crossorigin.me/https://en.wikipedia.org/w/api.php';


$(function(){
	$("form").submit(function(event){
		event.preventDefault();
		var input = $(".search").val();
		//format=json&action=query&prop=extracts&exintro=&explaintext=&titles=Stack%20Overflow
		var query = {
		    format: "json",
		    action: "query",
		    prop: "extracts",
		    exintro: "",
		    explaintext: "",
		    titles: input,
		  
		}
		$.getJSON(wikipedia_base_URL, query, function(data) {
			renderData(data, input);
		});
	});

});

// {
//   "batchcomplete": "",
//   "query": {
//     "pages": {
//       "25568315": {
//         "pageid": 25568315,
//         "ns": 0,
//         "title": "Katherine Johnson",
//         "extract": "Katherine Coleman Goble Johnson... words words words"
//       }
//     }
//   }
// }

var renderData = function(data, input) {
	console.log(JSON.stringify(data, null, 2));
	console.log(data);
	// $('.results').html(data.items[0].snippet.thumbnails.default.url);//how I got at the thumbnail of the youtube result. Will do similar navigation for wikipedia. 
	
	// var items = data.items.map(function(item) {
	// 	return 	`<a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank"><img src ="${item.snippet.thumbnails.default.url}"></a>`
	// });

	// $('.results').html(items);
	// $('.results').html(`
	// 	${items.join("")}
	// `)
	
	//   + <a href="blank"
}

