var data = [];
var positiveCases = [];
var firstCaseDay = [];
var culpritActivity = [];
var isCovidFree = [];
var infectedIDs = [];
var uninfectedIDs = [];
var DayByDay;

const getData = async (queryString, podNumber) => {
    const response = await axios.get(queryString).then(function (outcome) {
         
        data = outcome;
        console.log("getdata: ", data)
        
        for (let i=0; i<podNumber; i++) {
            positiveCases.push(data.data[i].numInfected);
            firstCaseDay.push(data.data[i].compromisedDate);
            culpritActivity.push(data.data[i].compromiseActivity);
            isCovidFree.push(data.data[i].isCovidFree);
            infectedIDs.push(data.data[i].infectedIDs);
            uninfectedIDs.push(data.data[i].unInfectedIDs);
        }
        DayByDay = data.data.DayByDay;
    });


    return response;
}


function returnData(){
    return data;
}

function returnPositiveCases(){
    return positiveCases;
}

function returnFirstCaseDay(){
    return firstCaseDay;
}

function returnCulpritActivity(){
    return culpritActivity;
}

function returnIsCovidFree(){
    return isCovidFree;
}

function returnInfectedIDs(){
    return infectedIDs;
}

function returnUninfectedIDs(){
    return uninfectedIDs;
}

function returnDayByDay(){
    return DayByDay;
}

export {
    getData,
    returnData,
    returnPositiveCases,
    returnFirstCaseDay,
    returnCulpritActivity,
    returnIsCovidFree, 
    returnInfectedIDs,
    returnUninfectedIDs,
    returnDayByDay,

};