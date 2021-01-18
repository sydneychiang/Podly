
import {names} from '../utils/first-names.js';

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



var peoplesNamesArr =  generateNames();
console.log("init: ", peoplesNamesArr);

function generateNames(){
    // var namesArr = new Array();
    let namesSet = new Set();
    while (namesSet.size != 20) {
        namesSet.add(names[Math.floor(Math.random() * Math.floor(names.length))]);
    }
    let namesArr = Array.from(namesSet);
    

    return namesArr;

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

onStart();

function onStart(){


    //default
    adjustMemberList(people.length, slider.value)
    memberCountArr[people.length-1].innerHTML = getMemberCountString(slider.value); // Display the default slider value
    updateMemberList(people.length);

    // console.log();


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
    var queryString = `?numDays=${daysToSimulate}`
    for (var i = 0; i < people.length; i++){
        queryString += `&newPod=${people[i].length}`;
    }
    window.location.href = "results.html" + queryString;
});

function addArrToPeople(){
    people.push([]);
}

function addEventListener(){
    var newSlider = document.getElementsByClassName("podSlider");
    var index = people.length;

    peoplesNamesArr = generateNames();
    adjustMemberList(people.length, newSlider[newSlider.length-1].value);
    memberCountArr[people.length-1].innerHTML = getMemberCountString(newSlider[newSlider.length-1].value);
    updateMemberList(people.length);


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
    // console.log("peoplesNamesArr", peoplesNamesArr, num);
    // console.log(`peoplesNamesArr[${podNum-1}]`, peoplesNamesArr[num]);
    // console.log(`index`, people[podNum - 1].length);
    // console.log("here", typeof(peoplesNamesArr));
    // console.log(peoplesNamesArr[0])
    // console.log("POD NUM: ", podNum-1);
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


