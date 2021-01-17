
var people = []
var memberList = document.getElementById("memberList");

var logo = document.getElementById("logoImg");
logo.addEventListener("click", function(){
    // alert("here");

    windows.location.href = "../index.html";
})


var slider = document.getElementById("myRange");
var memberCount = document.getElementById("memberCount");
adjustMemberList(slider.value);
memberCount.innerHTML = getMemberCountString(slider.value); // Display the default slider value
updateMemberList();

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    adjustMemberList(this.value);
    memberCount.innerHTML = getMemberCountString(this.value);
    updateMemberList();
//   memberCount.innerHTML = this.value;
}


function getMemberCountString(num){
    if (num == 1){
        return num.toString() + " Member";
    }
    else{
        return num.toString() + " Members";
    }
}

function adjustMemberList(num){
    if (people.length > num){
        while(people.length > num){
            removePerson();   
        }
    }
    else if (people.length < num){
        while(people.length < num){
            createPerson();
        }
    }
}


function createPerson(){
    return people.push("Person " + (people.length + 1).toString());
}

function removePerson(){
    people.pop();
}

function updateMemberList(){
    memberList.innerHTML = `
    ${people.map(person => `<div class="podMember">${person}</div>`).join('')}`;
}