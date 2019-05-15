const username_el = document.querySelector('.username');
const add_new_diary = document.querySelector('.add_diary');

$(document).ready(function() {
    let user_login = localStorage['current_user'];
    username_el.innerText = user_login;
    $(".new_diary_block").hide();

    let current_user_diarys_keys = localStorage[user_login + '_diarys'];

    if (current_user_diarys_keys != undefined) {
        let diary_keys = current_user_diarys_keys.split(',');

        for (let i = 0; i < diary_keys.length; i++) {
            let key_for_diary_name = diary_keys[i];
            let key_for_diary_text = key_for_diary_name.replace("_diary_name_", "_diary_text_");
            let name = localStorage[key_for_diary_name];
            let text = localStorage[key_for_diary_text];
            adddiaryOnPage(name, text);
        }
    }

});
const text_input = document.querySelector('.textarea');
document.querySelector('.add_diary').addEventListener('click', add_diary);

function add_diary(e) {
    e.preventDefault();
    $('.new_diary_block').show();
}
document.querySelector('.save_diary').addEventListener('click', save_diary);

function save_diary(e) {
    const diary_name = document.querySelector('.new_diary_block input[name=diary_name]');
    const diary_text = document.querySelector('.new_diary_block input[name=diary_text]');
    let user_login = localStorage['current_user'];

    let diary_name_key = user_login + '_diary_name_' + diary_name.value;
    let diary_text_key = user_login + '_diary_text_' + diary_name.value;

    localStorage[diary_name_key] = '' + diary_name.value;
    localStorage[diary_text_key] = '' + diary_text.value;

    $(".new_diary_block").hide();

    let diary_name_value = localStorage[diary_name_key];
    let diary_text_value = localStorage[diary_text_key];

    adddiaryOnPage(diary_name_value, diary_text_value);

    $('.new_diary_block').find("input[type=textarea], textarea").val("");
    $('.new_diary_block').find("input[type=textarea], textarea").val("");

    let user_diarys_keys = localStorage[user_login + '_diarys'];
    if (user_diarys_keys == undefined) {
        user_diarys_keys = diary_name_key;
    }
    else {
        user_diarys_keys += ',' + diary_name_key;
    }
    localStorage[user_login + '_diarys'] = user_diarys_keys;
}

function adddiaryOnPage(name, text) {
    var diary_list = document.querySelector(".diary_list");
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
    diary_list.prepend(main_textfield);
}