const username_el = document.querySelector('.username');
$(document).ready(function() {
    var user_login = localStorage['current_user'];
    username_el.innerText = user_login;
    let point_ids = localStorage[user_login + '_point_ids'];
    if (point_ids == undefined)
        return;
    var point_ids_split = point_ids.split(',');
    for (var i = 0; i < point_ids_split.length; i++) {
        let user_point_key = user_login + '_point_' + point_ids_split[i];
        let point_json = localStorage[user_point_key];
        let point = JSON.parse(point_json);
        addPointOnPage(point);
    }

});
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("×");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
}
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        let point_li = ev.target;
        let point_id = point_li.getAttribute('point_id');
        let point_key_in_localstorage = username_el.innerText + '_point_' + point_id;
        let point = JSON.parse(localStorage[point_key_in_localstorage]);
        point.is_active = !point.is_active;
        localStorage[point_key_in_localstorage] = JSON.stringify(point);
        point_li.classList.toggle('checked');
    }
}, false);

function newElement() {
    var inputValue = document.getElementById("myInput").value;
    if (inputValue === '') {
        alert("You have to write something");
        return;
    }

    var todo_value = document.getElementById("myInput").value;
    todo_value.value = "";
    var user_login = localStorage['current_user'];
    var point = {};
    point.user_login = user_login;
    point.text = todo_value;
    point.is_active = true;
    point.id = nextElementIndex();
    localStorage[user_login + '_point_' + point.id] = JSON.stringify(point);
    var point_ids = localStorage[user_login + '_point_ids'];
    if (point_ids == undefined) {
        point_ids = point.id;
    }
    else {
        point_ids = point_ids + ',' + point.id;
    }
    localStorage[user_login + '_point_ids'] = point_ids;

    addPointOnPage(point);
}

function nextElementIndex() {
    var user_login = localStorage['current_user'];
    var index = localStorage[user_login + '_point_next_index'];
    if (index == undefined) {
        index = 0;
    }
    localStorage[user_login + '_point_next_index'] = parseInt(index) + 1;
    return index;
}

function addPointOnPage(point) {
    var li = document.createElement("li");
    if (point.is_active === false) {
        li.setAttribute("class", "checked");
    }
    li.setAttribute("point_id", point.id);
    li.appendChild(document.createTextNode(point.text));
    document.getElementById("myUL").appendChild(li);
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("×");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            let point_id = div.getAttribute("point_id");
            let point_key_in_localstorage = username_el.innerText + '_point_' + point_id;
            localStorage.removeItem(point_key_in_localstorage);
            var user_login = localStorage['current_user'];
            let point_ids = localStorage[user_login + '_point_ids'];
            var point_ids_split = point_ids.split(',');
            let indexOfId = point_ids_split.indexOf(point_id);
            point_ids_split.splice(indexOfId, 1); //remove id from array
            localStorage[user_login + '_point_ids'] = point_ids_split;
            div.style.display = "none";
        }
    }

}
