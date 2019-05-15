const username_el = document.querySelector('.username');
$(document).ready(function() {
    var user_login = localStorage['current_user'];
    username_el.innerText = user_login;
    let item_ids = localStorage[user_login + '_item_ids'];
    if (item_ids == undefined)
        return;
    var item_ids_split = item_ids.split(',');
    for (var i = 0; i < item_ids_split.length; i++) {
        let user_item_key = user_login + '_item_' + item_ids_split[i];
        let item_json = localStorage[user_item_key];
        let item = JSON.parse(item_json);
        additemOnPage(item);
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
        let item_li = ev.target;
        let item_id = item_li.getAttribute('item_id');
        let item_key_in_localstorage = username_el.innerText + '_item_' + item_id;
        let item = JSON.parse(localStorage[item_key_in_localstorage]);
        item.is_active = !item.is_active;
        localStorage[item_key_in_localstorage] = JSON.stringify(item);
        item_li.classList.toggle('checked');

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
    var item = {};
    item.user_login = user_login;
    item.text = todo_value;
    item.is_active = true;
    item.id = nextElementIndex();
    localStorage[user_login + '_item_' + item.id] = JSON.stringify(item);
    var item_ids = localStorage[user_login + '_item_ids'];
    if (item_ids == undefined) {
        item_ids = item.id;
    }
    else {
        item_ids = item_ids + ',' + item.id;
    }
    localStorage[user_login + '_item_ids'] = item_ids;

    additemOnPage(item);
}

function nextElementIndex() {
    var user_login = localStorage['current_user'];
    var index = localStorage[user_login + '_item_next_index'];
    if (index == undefined) {
        index = 0;
    }
    localStorage[user_login + '_item_next_index'] = parseInt(index) + 1;
    return index;
}

function additemOnPage(item) {
    var li = document.createElement("li");
    if (item.is_active === false) {
        li.setAttribute("class", "checked");
    }
    li.setAttribute("item_id", item.id);
    li.appendChild(document.createTextNode(item.text));
    document.getElementById("myUL").appendChild(li);

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("×");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            let item_id = div.getAttribute("item_id");
            let item_key_in_localstorage = username_el.innerText + '_item_' + item_id;
            localStorage.removeItem(item_key_in_localstorage);
            var user_login = localStorage['current_user'];
            let item_ids = localStorage[user_login + '_item_ids'];
            var item_ids_split = item_ids.split(',');
            let indexOfId = item_ids_split.indexOf(item_id);
            item_ids_split.splice(indexOfId, 1); //remove id from array
            localStorage[user_login + '_item_ids'] = item_ids_split;
            div.style.display = "none";
        }
    }

}
