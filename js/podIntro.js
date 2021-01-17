
var people = [[]];
var podListArr = document.getElementsByClassName("podList");

var rangeSliderArr = document.getElementsByClassName("podSlider");
var memberCountArr = document.getElementsByClassName("memberCount");
var memberListArr = document.getElementsByClassName("memberList");

var memberList = document.getElementById("memberList");
var logo = document.getElementById("logoImg");
var calculateBtn = document.getElementById("calculate");



var slider = document.getElementById("myRange");
var memberCount = document.getElementById("memberCount");
var daysToSimulate;
var daySlider = document.getElementById("dayRange");
var dayCount = document.getElementById("dayCount");



// add window.fetch polyfill from
// https://github.com/developit/unfetch
self.fetch||(self.fetch=function(e,n){return n=n||{},new Promise(function(t,s){var r=new XMLHttpRequest,o=[],u=[],i={},a=function(){return{ok:2==(r.status/100|0),statusText:r.statusText,status:r.status,url:r.responseURL,text:function(){return Promise.resolve(r.responseText)},json:function(){return Promise.resolve(JSON.parse(r.responseText))},blob:function(){return Promise.resolve(new Blob([r.response]))},clone:a,headers:{keys:function(){return o},entries:function(){return u},get:function(e){return i[e.toLowerCase()]},has:function(e){return e.toLowerCase()in i}}}};for(var c in r.open(n.method||"get",e,!0),r.onload=function(){r.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(e,n,t){o.push(n=n.toLowerCase()),u.push([n,t]),i[n]=i[n]?i[n]+","+t:t}),t(a())},r.onerror=s,r.withCredentials="include"==n.credentials,n.headers)r.setRequestHeader(c,n.headers[c]);r.send(n.body||null)})});

/** namey */
window.namey = {
  /**
   * API for namey random name generator.  There's two basic ways to use it.  First, just call namey.get with a callback:
   *
   * namey.get(function(n) { console.log(n); }); => ["John Clark"]
   *
   * The call returns an array because there's an option to request more than one random name. For example:
   *
   * namey.get({ count: 3, callback: function(n) { console.log(n); }}); ; => ["John Cook", "Ruth Fisher", "Donna Collins"]
   *
   * Here's the full list of parameters:
   * 
   * count -- how many names you would like (default: 1)
   *
   * type -- what sort of name you want 'female', 'male', 'surname', or leave blank if you want both genders
   *
   * with_surname -- true/false, if you want surnames with the first
   * name. If false, you'll just get first names.  Default is true.
   *
   * frequency -- 'common', 'rare', 'all' -- default is 'common'. This
   * picks a subset of names from the database -- common names are
   * names that occur frequently, rare is names that occur rarely.
   * 
   * min_freq/max_freq  -- specific values to get back a really
   * specific subset of the names db. values should be between 0 and
   * 100. You probably don't need this, but here's an example:
   * namey.get({ count: 3, min_freq: 30, max_freq: 50, callback: function(n) { console.log(n); }});
   * => ["Crystal Zimmerman", "Joshua Rivas", "Tina Bryan"]
   *
   * callback -- a function to do something with the data.  The data
   * passed in will be an array of names -- use them wisely.
   * 
   */
  get : function(options) {
	  var callback;
	  var tmp_params = {};
    var host = "namey.muffinlabs.com";
    //var host = window.location.host;
    var query;
    
	  if ( typeof(options) == "function" ) {
	    callback = options;
	  }
	  else if ( typeof(options) == "object" ) {
	    callback = options.callback;
      
      if ( typeof(options.host) !== "undefined" ) {
        host = options.host;
      }
      
	    if ( typeof(options.count) == "undefined" ) {
		    options.count = 1;
	    }
	    tmp_params.count = options.count;
      
	    if ( typeof(options.type) != "undefined" && options.type != "both" ) {
		    tmp_params.type = options.type;
	    };
      
	    if ( options.type != "surname" && typeof(options.with_surname) != "undefined" ) {
		    tmp_params.with_surname = options.with_surname;
	    }
	    if ( options.min_freq ) {
		    tmp_params.min_freq = options.min_freq;
		    tmp_params.max_freq = options.max_freq;
	    }
	    else if ( typeof(options.frequency) != "undefined" ) {
		    tmp_params.frequency = options.frequency;
	    }
	  }


    query = Object.keys(tmp_params)
                  .map(function(k) {
                    return encodeURIComponent(k) + '=' + encodeURIComponent(tmp_params[k]);
                  })
                  .join('&');
    
	  window.fetch('https://namey.muffinlabs.com/name.json?' + query, { mode: 'cors' })
          .then(function(d) { return d.json(); })
          .then(function(d) {
	          if ( typeof(callback) == "function" ) {
		          callback(d);
	          }
	          else {
		          console.log(d);
	          }
	        });
  }
}

var peoplesNamesArr =  generateNames();

function generateNames(){
    var namesArr = new Array();
    namey.get({ count: 10, callback: function(n) {
        for (var i = 0; i < n.length; i++){
            namesArr.push(n[i]);
        }
    }});

    namey.get({ count: 10, callback: function(n) {
        for (var i = 0; i < n.length; i++){
            namesArr.push(n[i]);
        }
    }});

    namey.get({ count: 5, callback: function(n) {
        for (var i = 0; i < n.length; i++){
            namesArr.push(n[i]);
        }
    }});

    // console.log(namesArr);
    return namesArr;

}


onStart();

function onStart(){

    // peoplesNamesArr = generateNames();
    adjustMemberList(people.length, slider.value)
    memberCountArr[people.length-1].innerHTML = getMemberCountString(slider.value); // Display the default slider value
    updateMemberList(people.length);


    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
        var index = findIndexOf(rangeSliderArr, slider);
        adjustMemberList(1, this.value);
        memberCountArr[index].innerHTML = getMemberCountString(this.value);
        updateMemberList(1);

        
    }

    dayCount.innerHTML = getDayCountString(daySlider.value);
    daysToSimulate = daySlider.value;


    daySlider.oninput = function(){
        dayCount.innerHTML = getDayCountString(this.value);
        daysToSimulate = this.value;
    }  
}



var addPodBtn = document.getElementById("newPodListBtn");
addPodBtn.addEventListener("click", function(){

    var newPod = addPodToList();
    var newSlider = addSliderToList();

    insertAfter(podListArr[podListArr.length-1], newSlider);
    insertAfter(newSlider, newPod);

    addArrToPeople();

    podListArr = document.getElementsByClassName("podList");
    rangeSliderArr = document.getElementsByClassName("podSlider");

    addEventListener();
    memberCountArr = document.getElementsByClassName("memberCount");
    memberListArr = document.getElementsByClassName("memberList");
});


calculateBtn.addEventListener("click", function(){

});

function addArrToPeople(){
    people.push([]);
}

function addEventListener(){
    var newSlider = document.getElementsByClassName("podSlider");
    var index = people.length;

    adjustMemberList(people.length, newSlider[newSlider.length-1].value);
    memberCountArr[people.length-1].innerHTML = getMemberCountString(newSlider[newSlider.length-1].value);
    updateMemberList(people.length);
    peoplesNamesArr = generateNames();
    // console.log("here: ", peoplesNamesArr);

    newSlider[newSlider.length-1].oninput = function() {

        adjustMemberList(index, this.value);
        memberCountArr[index-1].innerHTML = getMemberCountString(this.value);
        updateMemberList(index);
    }
}

function addSliderToList(){
    var newSliderContainer = document.createElement('div');
    newSliderContainer.classList.add("slidecontainer");
    var newSlider = document.createElement('input');
    newSlider.type = 'range';
    newSlider.min = 2;
    newSlider.id = `slider${rangeSliderArr.length}`;
    newSlider.classList.add("podSlider");
    newSlider.classList.add("slider");
    newSlider.max = 20;
    newSlider.value = 10;
    newSlider.step = 1;

    newSliderContainer.appendChild(newSlider);
    return newSliderContainer;
}

function findIndexOf(arr, item){
    for (var i = 0; i < arr.length; i++){
        if (arr[i] == item){
            return i;
        }
    }
    return -1;
}

function addPodToList(){
    var newPod = document.createElement("div");
    newPod.classList.add("podList");

    var newMemberCount = document.createElement("div");
    newMemberCount.classList.add("memberCount");
    var newMemberList = document.createElement("div");
    newMemberList.classList.add("memberList");

    newPod.appendChild(newMemberCount);
    newPod.appendChild(newMemberList);


    return newPod
}

// referenceNode comes first, newNode comes after
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }


logo.addEventListener("click", function(){
    windows.location.href = "../index.html";
})


function getDayCountString(num){
    return num.toString() + " Days";
}


function getMemberCountString(num){
    if (num == 1){
        return num.toString() + " Member";
    }
    else{
        return num.toString() + " Members";
    }
}

function adjustMemberList(podNum, num){
    if (people[podNum - 1].length > num){
        while(people[podNum - 1].length > num){
            removePerson(podNum);   
        }
    }
    else if (people[podNum - 1].length < num){
        while(people[podNum - 1].length < num){
            createPerson(podNum, people[podNum - 1].length);
        }
        // console.log("POD ONEEEEE: ", people[0]);
    }
}


function createPerson(podNum, num){
    console.log("peoplesNamesArr", peoplesNamesArr, num);
    console.log(`peoplesNamesArr[${podNum-1}]`, peoplesNamesArr[num]);
    // console.log(`index`, people[podNum - 1].length);
    // console.log("here", typeof(peoplesNamesArr));
    // console.log(peoplesNamesArr[0])
    console.log("POD NUM: ", podNum-1);
    people[podNum - 1].push(peoplesNamesArr[num]);
    // people[podNum - 1].push("Person " + (people[podNum - 1].length + 1).toString());

}

function removePerson(podNum){
    people[podNum - 1].pop();
}

function updateMemberList(podNum){
    memberListArr[podNum-1].innerHTML = `
    ${people[podNum-1].map(person => `<div class="podMember">${person}</div>`).join('')}`;
    // memberListArr[podNum-1].innerHTML = `
    // ${people[podNum-1].map(person => `<div class="podMember">${person}</div>`).join('')}`;
}


