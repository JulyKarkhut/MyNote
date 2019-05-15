const username_el = document.querySelector('.username');
const add_new_note = document.querySelector('.add_note');

$(document).ready(function() {
    let user_login = localStorage['current_user'];
    username_el.innerText = user_login;
    $(".new_note_block").hide();

    let current_user_notes_keys = localStorage[user_login + '_notes'];

    if (current_user_notes_keys != undefined) {
        let note_keys = current_user_notes_keys.split(',');

        for (let i = 0; i < note_keys.length; i++) {
            let key_for_note_name = note_keys[i];
            let key_for_note_text = key_for_note_name.replace("_note_name_", "_note_text_");
            let name = localStorage[key_for_note_name];
            let text = localStorage[key_for_note_text];
            addNoteOnPage(name, text);
        }
    }

});
const text_input = document.querySelector('.textarea');
document.querySelector('.add_note').addEventListener('click', add_note);

function add_note(e) {
    e.preventDefault();
    $('.new_note_block').show();
}
document.querySelector('.save_note').addEventListener('click', save_note);

function save_note(e) {
    const note_name = document.querySelector('.new_note_block input[name=note_name]');
    const note_text = document.querySelector('.new_note_block input[name=note_text]');
    let user_login = localStorage['current_user'];
    let note_name_key = user_login + '_note_name_' + note_name.value;
    let note_text_key = user_login + '_note_text_' + note_name.value;
    localStorage[note_name_key] = '' + note_name.value;
    localStorage[note_text_key] = '' + note_text.value;
    $(".new_note_block").hide();
    let note_name_value = localStorage[note_name_key];
    let note_text_value = localStorage[note_text_key];
    addNoteOnPage(note_name_value, note_text_value);
    $('.new_note_block').find("input[type=textarea], textarea").val("");
    $('.new_note_block').find("input[type=textarea], textarea").val("");
    let user_notes_keys = localStorage[user_login + '_notes'];
    if (user_notes_keys == undefined) {
        user_notes_keys = note_name_key;
    }
    else {
        user_notes_keys += ',' + note_name_key;
    }
    localStorage[user_login + '_notes'] = user_notes_keys;
}

function addNoteOnPage(name, text) {
    var note_list = document.querySelector(".note_list");
    var main_textfield = document.createElement("div");
    main_textfield.setAttribute("class", "main_text_area");
    var title = document.createElement("textarea");
     title.setAttribute("class", "title_text_area");
    var input = document.createElement("textarea");
     input.setAttribute("class", "text_text_area");
    title.innerText = name;
    input.value = text;
    main_textfield.appendChild(title);
    main_textfield.appendChild(input);
    note_list.prepend(main_textfield);
}

// $('input').hide();
// text_name.addEventListener('click', open_note);

// function open_note(e) {
//     $('input').show();
// }
