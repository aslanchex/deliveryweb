$(document).ready(getProfileInfo);
$(document).ready(loadFriends);


function getUrl(method, params) {
    if (!method) throw new Error("Вы не указали метод!");
    params = params || {};
    params['access_token'] = 'cf4ba29864f13c4eebcf00ca8d683774b1dda4051b8abd9c9639519e223c8ef1c369faeae7e7fa2e8ba8c';
    return 'https://api.vk.com/method/'+ method + '?' + $.param(params);
};

function sendRequest(method, params, func) {
    $.ajax({
        url: getUrl(method, params),
        method: 'GET',
        dataType: 'JSONP',
        success: func,
    });
}

function loadFriends() {
    sendRequest('friends.get', {count: 5, order: 'random', fields: 'nickname, photo_100', v: 5.90}, function (data) {
        drawFriends(data.response.items);
        // console.log(data.response.items);
        
    });
}

function drawFriends(friends) {
    let html = '';

    for (let i = 0; i < friends.length; i++) {
        let f = friends[i];

        html += '<li>'+
            '<a href="http://vk.com/id'+ f.id + '">'+ 
                '<img class="friend" src="'+ f.photo_100 +'" />'
                    +'<div>'
                    +'<p style="color: #000; font-size: 15px">' + f.first_name + ' ' + f.last_name + '</p>'
                    +'</div>'
            +'</a>'
            +'</li>';
    }

    $('ul').html(html);
}

function getProfileInfo() {
    sendRequest('users.get', {fields: 'photo_50', v: 5.90}, function(data) {
        drawProfileInfo(data.response[0]);
        console.log(data.response[0]);
    });
}

function drawProfileInfo(userinfo) {
    let html = '';
    let u = userinfo;
    html = '<div class="userinfo">'
        +'<a href="http://vk.com/id'+ u.id +'">'+'<p>'+ u.first_name + ' ' + u.last_name + '</p>'
        + '<img class="user" src="'+ u.photo_50 +'"/>'
        +'</a>'
        +'</div>';
    

    $('.header').html(html) ;   
}