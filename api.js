//Quiz app code. 
const printQuestion = (name) => {
  return `
    <h1>${name} <span class ="persisted"> was warned. 
    She was given an explanation.</span> Nevertheless, she persisted by:</h1>
  `
}
const state = {//single source of truth/the brain of the operation 
  items: [{
    name: "Rosa Parks", 
    warnings: [
      "Working", 
      "Voting", 
      "Refusing to give up her seat for a white man", 
      "Marching"
    ],
    result:2,
  }, {
    name: "Mary Jackson (engineer)",
    warnings:[
      "Learning math",
      "Wearing a dress",
      "Driving over the speed limit",
      "Petitioning a Judge so she could attend classes at the all-white Hampton Highschool"
    ],
    result: 3,
  },
    {
    name: "Malala Yousafzai",
    warnings:[
      "Traveling with her family",
      "Speaking in public",
      "Speaking at the United Nations",
      "Defying the Taliban and going to school"
    ],  
    result: 3,
  },
    { 
    name: "May Edward Chinn",
    warnings:[
      "When denied an internship at the Rockefeller Institute for being black, she opened her own medical practice at home",
      "Applying for an internship at Harlem Hospital",
      "Pursuing her love of music",
      "Getting married"
    ],  
    result: 0,
  },  
    {
    name: "Sonia Sotomayor",
    warnings:[
      "Attending Harvard",
      "Visiting Puerto Rico on her school break",
      "Ignoring accusations she only becaume a passable lawyer thanks to Title IX",
      "Joining the Supreme court",
    ],
    result: 2,
  }], 
  currentQuestion: 0, 
  correctCounter: 0 
}
//Rendering
const renderList = (state) => {
  var question = state.items[state.currentQuestion]
  if (question === undefined) {

    return $('.questions').html(`
      You got ${state.correctCounter} out of ${state.items.length} correct. 
      <div>
      <button class="end-button">Play Again!
          </button>
          </div>
    `);
  }

  var name = question.name
  var warnings = question.warnings
  const itemsHtml = warnings.map((item,index) => {
    //update classes
    return `
      <li index = ${index}> 
            <span class="answers">${item}</span>
            <div class="quiz-item-controls">
              <button class="choice-item-toggle">
                <span class="button-label">your choice </span>
              </button>
            </div>
          </li>
  `
  });

  // Old, crappy ES5 way:
  //var str = "<div>" +
    // "Correct answers: " + state.correctCounter + " out of " + state.items.length +
    // "</div>"

  // New, happy ES6 way:
  var html = `
    <div>
      ${printQuestion(name)}
      ${itemsHtml.join("")}
    </div>
    <div>
      Correct answers: ${state.correctCounter} out of ${state.items.length}. 
    </div>
    <div>
      Question: ${state.currentQuestion + 1} out of ${state.items.length}
    </div>
  `
  $('.questions').html(html);
}
renderList(state)

$("body").on("click", "button.choice-item-toggle", function provideAnswer(event){
  var itemToCheck = $(event.currentTarget).closest("li").attr("index");

   if (state.items[state.currentQuestion].result == itemToCheck) {
    state.correctCounter += 1
    state.currentQuestion += 1
    $(".results").html("")
    $(".select").val("choose");

    swal("She persisted!", null, "success");
   }
   else {
    swal("hmm, click the dropdown menu for more info...", null, "error");
   }
  renderList(state)
}); 

$("body").on("click", ".end-button", function(){
  state.currentQuestion = 0
  state.correctCounter = 0
  renderList(state)

});
/////////////// API CODE   ////////////////
var wikipedia_base_URL = 'https://crossorigin.me/https://en.wikipedia.org/w/api.php';

const getJSONPromise = (baseUrl, myQuery) => {
  return new Promise((resolve, reject) => {
    $.getJSON(baseUrl, myQuery, function(data) {
      resolve(data);
    });
  });
}

$(() => {
  $("form").submit(function(event){
    event.preventDefault();
    var input = $(".select").val();
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

    getJSONPromise(wikipedia_base_url, query).then(data => {
      renderData(data, input);
    })
    // example of a promise:
    // fetch(wikipedia_base_url, query)
    // .then((data) => {
    //   renderData(data, input);
    //   return fetch(wikipedia_base_url, query);
    // })
  });

});

var getPageId = function(data) {
  var printOnPage = Object.keys(data.query.pages);
  console.log(printOnPage);
  return printOnPage[0]

}

var testGetPageId = function() {
  var sampleData = {
    "batchcomplete": "",
    "query": {
      "pages": {
        "25568315": {
          "pageid": 25568315,
          "ns": 0,
          "title": "Katherine Johnson",
          "extract": "Katherine Coleman Goble Johnson... words words words"
        }
      }
    }
  }
  var pageId = getPageId(sampleData);
  if (pageId === "25568315") {
    console.log(`SUCCESS! Got the right page ID: "${pageId}"`);
  }
  else {
    console.log(`ERROR: getPageId returned ${JSON.stringify(pageId)} instead of "25568315"`);
  }
}

testGetPageId();

var renderData = function(data, input) {
  console.log(JSON.stringify(data, null, 2));
  console.log(data);

  $(".results").html(data.query.pages[getPageId(data)].extract)
  
}

