import {   
    getData,
    returnData,
    returnPositiveCases,
    returnFirstCaseDay,
    returnCulpritActivity,
    returnIsCovidFree,  
    returnInfectedIDs,
    returnUninfectedIDs,
    returnDayByDay,
    // getDataPodNumber    
} from '../utils/getSimData.js';
// import {getPodNumPeople} from '../utils/people.js';

var modals = document.getElementsByClassName("modal");


var resultBoxes = document.getElementsByClassName("results");
var modalBoxes = document.getElementsByClassName("modal-content");

var testing = document.getElementById("testing");
var queryString;
var data;
var isCovidFreeArr;
var positiveCasesArr;
var firstCaseDaysArr;
var culpritActivitiesArr;
var infectedIDsArr;
var uninfectedIDsArr;
var dayByDayArr;



var podNumber;

//results boxes
var posCaseCountArr = document.getElementsByClassName("posCaseCount");
var firstDaysArr = document.getElementsByClassName("firstDayCount");
var culpritActivityArr = document.getElementsByClassName("activity");

//modal boxes
var posPeopleDesc = document.getElementsByClassName("posPeople");
var negPeopleDesc = document.getElementsByClassName("negPeople");
var causeDesc = document.getElementsByClassName("cause");
var rundownDesc = document.getElementsByClassName("rundown");


async function callAPI(){
    var location = window.location.href.split("?")[1];
    podNumber = countOccurrences(location);
    queryString = `http://localhost:8008/simulation?${location}`;
    data = await getData(queryString, podNumber);
    isCovidFreeArr = returnIsCovidFree();
    positiveCasesArr = returnPositiveCases();
    firstCaseDaysArr = returnFirstCaseDay();
    culpritActivitiesArr = returnCulpritActivity();
    infectedIDsArr = returnInfectedIDs();
    // console.log("infectedIDsArr", infectedIDsArr);
    uninfectedIDsArr = returnUninfectedIDs();
    dayByDayArr = returnDayByDay();
    console.log(dayByDayArr)
    console.log("async", isCovidFreeArr);
    initFirstResultBox();
    initAllBoxes();

}

callAPI();



function updateAllArrs(){
    modals = document.getElementsByClassName("modal");
    resultBoxes = document.getElementsByClassName("results");
    modalBoxes = document.getElementsByClassName("modal-content");

    testing = document.getElementById("testing");
    //results boxes
    posCaseCountArr = document.getElementsByClassName("posCaseCount");
    firstDaysArr = document.getElementsByClassName("firstDayCount");
    culpritActivityArr = document.getElementsByClassName("activity");

    //modal boxes
    posPeopleDesc = document.getElementsByClassName("posPeople");
    negPeopleDesc = document.getElementsByClassName("negPeople");
    causeDesc = document.getElementsByClassName("cause");
    rundownDesc = document.getElementsByClassName("rundown");
}

function countOccurrences(string){
    var count = 0;
    var lst = string.split("&");
    for (var i = 0; i < lst.length; i++){
        var paramsLst = lst[i].split("=");
        if (paramsLst[0] == "newPod"){
            count++;
        }
    }
    return count;
}

function initAllBoxes(){

    for(var i = 1; i < podNumber; i++){

        var newResultsBox = createResultsBox(resultBoxes.length);
        var newModal = createModalBox(resultBoxes.length);
        updateBoxDisplays(newResultsBox, newModal);

        var index = findIndexOf(resultBoxes, newResultsBox);
        updateResultsBox(index);
        updateModalBox(index);
        addEventListener(newResultsBox, index);

        updateAllArrs();
    
    }

    updateDayByDay();

}

function updateDayByDay(){
    var rundownDesc = document.getElementsByClassName("rundown")[0];
    rundownDesc.innerHTML = `${dayByDayArr.map(rundown => `<div class="podMember">${rundown}</div>`).join('')}`
}

function updateResultsBox(index){

    var podNum = document.getElementsByClassName("podNum");
    podNum[index].innerHTML = `Pod ${index+1}`;

    console.log(returnIsCovidFree()[0]);
    if (isCovidFreeArr[index] !== "true"){
        posCaseCountArr[index].innerHTML = returnPositiveCases()[index];
        firstDaysArr[index].innerHTML = returnFirstCaseDay()[index];
        culpritActivityArr[index].innerHTML = returnCulpritActivity()[index];

    }
    else if(isCovidFreeArr[index] === "true"){
        posCaseCountArr[index].innerHTML = 0;
        firstDaysArr[index].style.display = "none";
        var firstDayText = document.getElementsByClassName("firstDayText");
        firstDayText[index].style.display = "none";
        var activityText = document.getElementsByClassName("activityText");
        activityText[index].style.display = "none";
        culpritActivityArr[index].innerHTML = "COVID-Free";
    }
}

function updateModalBox(index){

    var h2Arr = document.getElementsByClassName("podNumber");

    h2Arr[index].innerHTML = `Pod ${index+1}`;
    if (isCovidFreeArr[index] !== "true"){
        console.log("posPeople", posPeopleDesc);
        posPeopleDesc[index].innerHTML =  `${infectedIDsArr[index].map(person => `${person}`).join(', ')}`;

        if(uninfectedIDsArr[index].length == 0){
            negPeopleDesc[index].innerHTML = "Everyone tested Positive";
        }
        else{
            negPeopleDesc[index].innerHTML = `${uninfectedIDsArr[index].map(person => `${person}`).join(', ')}`;
        }
        causeDesc[index].innerHTML = culpritActivitiesArr[index];
    }
    else if(isCovidFreeArr[index] === "true"){
        posCaseCountArr[index].innerHTML = 0;
        posPeopleDesc[index].innerHTML =  "No one tested Positive!";
        if(uninfectedIDsArr[index].length == 0){
            negPeopleDesc[index].innerHTML = `${uninfectedIDsArr[index].map(person => `${person}`).join(', ')}`;
        }
        else{
            negPeopleDesc[index].innerHTML = `${uninfectedIDsArr[index].map(person => `<div class="podMember">${person}</div>`).join('')}`;
        }
        causeDesc[index].innerHTML = culpritActivitiesArr[index];
    }

}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}


function updateBoxDisplays(newResultBox, newModal){
    modals = document.getElementsByClassName("modal");
    var lastModal = modals[modals.length-1];

    insertAfter(lastModal, newResultBox);
    insertAfter(newResultBox, newModal);
}

function printModals(){
    for (var i = 0; i < modals.length; i++){
        console.log(modals[i]);
    }
}

function addEventListener(newResultBox, index){
    newResultBox.addEventListener("click", function(){
        modals[index].style.display = "block";
    });

    var span = document.getElementsByClassName("close");
    span[index].onclick = function() {
        modals[index].style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modals[index]) {
        modals[index].style.display = "none";
        }
    }
}

function findIndexOf(arr, item){
    for (var i = 0; i < arr.length; i++){
        if (arr[i] == item){
            return i;
        }
    }
    return -1;
}


async function initFirstResultBox(){
    resultBoxes[0].addEventListener("click", function(){
        modals[0].style.display = "block";
    })

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    var index = 0;
    updateResultsBox(index);
    updateModalBox(index);

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modals[0].style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modals[0]) {
        modals[0].style.display = "none";
        }
    }
  
}

function createResultsBox(index){
    var br = document.createElement("br");

    var newResult = document.createElement("div");
    newResult.classList.add("results");

    var newPodNum = document.createElement("div");
    newPodNum.classList.add("podNum");

    var newBr = document.createElement("br");
    var newContent = document.createElement("div");
    newContent.classList.add("content");


    var posCasesSection = document.createElement("div");
    posCasesSection.classList.add("posCases");
    posCasesSection.classList.add("section");

    var posCaseCountBigText = document.createElement("div");
    posCaseCountBigText.classList.add("posCaseCount");
    posCaseCountBigText.classList.add("bigText");

    var posCaseTextSmallText = document.createElement("div");
    posCaseTextSmallText.classList.add("posCaseText");
    posCaseTextSmallText.classList.add("smallText");
    posCaseTextSmallText.innerHTML = "Positive Cases";


    var firstDaySection = document.createElement("div");
    firstDaySection.classList.add("firstDay");
    firstDaySection.classList.add("section");

    var firstDayCountBigText = document.createElement("div");
    firstDayCountBigText.classList.add("firstDayCount");
    firstDayCountBigText.classList.add("bigText");

    var firstDayTextSmallText = document.createElement("div");
    firstDayTextSmallText.classList.add("firstDayText");
    firstDayTextSmallText.classList.add("smallText");
    firstDayTextSmallText.innerHTML = "Day of First Case";

    var culpritActivitySection = document.createElement("div");
    culpritActivitySection.classList.add("culpritActivity");
    culpritActivitySection.classList.add("section");

    var activityTextSmallText = document.createElement("div");
    activityTextSmallText.classList.add("activityText");
    activityTextSmallText.classList.add("smallText");
    activityTextSmallText.innerHTML = "From the Activity";

    var activityBigText = document.createElement("div");
    activityBigText.classList.add("activity");
    activityBigText.classList.add("bigText");

    posCasesSection.appendChild(posCaseCountBigText);
    posCasesSection.appendChild(br);
    posCasesSection.appendChild(posCaseTextSmallText);
    console.log(posCasesSection, br);

    firstDaySection.appendChild(firstDayCountBigText);
    firstDaySection.appendChild(br);
    firstDaySection.appendChild(firstDayTextSmallText);
    console.log(firstDaySection);

    culpritActivitySection.appendChild(activityTextSmallText);
    culpritActivitySection.appendChild(br);
    culpritActivitySection.appendChild(activityBigText);
    console.log(culpritActivitySection, br);

    newContent.appendChild(posCasesSection);
    newContent.appendChild(firstDaySection);
    newContent.appendChild(culpritActivitySection);
    
    newResult.appendChild(newPodNum);
    newResult.appendChild(newBr);
    newResult.appendChild(newContent);
    console.log(newResult, br);
    return newResult;
}

function createModalBox(index){
    var modal = document.createElement("div");
    modal.classList.add("modal");
    var modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    var modalHeader = document.createElement("modal-header");
    modalHeader.classList.add("modal-header");
    var close = document.createElement("span");
    close.classList.add("close")
    close.innerHTML = "&times";
    var h2 = document.createElement("h2");
    h2.classList.add("podNumber");
    var detailedContent = document.createElement("div");
    detailedContent.classList.add("detailedContent");
    var posBackSection = document.createElement("div");
    posBackSection.classList.add("pos");
    posBackSection.classList.add("backSection");
    var posTitleTitle = document.createElement("div");
    posTitleTitle.classList.add("posTitle");
    posTitleTitle.classList.add("title");
    posTitleTitle.innerHTML = "Positive Cases";

    var posPeopleDesc = document.createElement("div");
    posPeopleDesc.classList.add("posPeople");
    posPeopleDesc.classList.add("desc");
    var negBackSection = document.createElement("div");
    negBackSection.classList.add("neg");
    negBackSection.classList.add("backSection");
    var negTitleTitle = document.createElement("div");
    negTitleTitle.classList.add("negTitle");
    negTitleTitle.classList.add("title");
    negTitleTitle.innerHTML = "COVID-Free";

    var negPeopleDesc = document.createElement("div");
    negPeopleDesc.classList.add("negPeople");
    negPeopleDesc.classList.add("desc");
    var causeSectionBackSection = document.createElement("div");
    causeSectionBackSection.classList.add("causeSection");
    causeSectionBackSection.classList.add("backSection");
    var causeTitleTitle = document.createElement("div");
    causeTitleTitle.classList.add("causeTitle");
    causeTitleTitle.classList.add("title");
    causeTitleTitle.innerHTML = "Cause";

    var causeDesc = document.createElement("div");
    causeDesc.classList.add("cause");
    causeDesc.classList.add("desc");

    modalHeader.appendChild(close);
    modalHeader.appendChild(h2);

    posBackSection.appendChild(posTitleTitle);
    posBackSection.appendChild(posPeopleDesc);

    negBackSection.appendChild(negTitleTitle);
    negBackSection.appendChild(negPeopleDesc);

    causeSectionBackSection.appendChild(causeTitleTitle);
    causeSectionBackSection.appendChild(causeDesc);

    detailedContent.appendChild(posBackSection);
    detailedContent.appendChild(negBackSection);
    detailedContent.appendChild(causeSectionBackSection);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(detailedContent);

    modal.appendChild(modalContent);

    return modal;
}