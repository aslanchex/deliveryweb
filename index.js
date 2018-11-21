$('.autorize').click(logIn);

// $(document).ready(getProfileInfo);
// $(document).ready(loadFriends);

// let token = 'cf4ba29864f13c4eebcf00ca8d683774b1dda4051b8abd9c9639519e223c8ef1c369faeae7e7fa2e8ba8c';

function logIn() {
    VK.Auth.login(function(response) {
        if (response.status == "connected") {
            // console.log(response.status);
            $('.autorize').remove();
            setTimeout(() => {
                getProfileInfo();
            }, 0);
            setTimeout(() => {
                loadFriends();
            }, 0);
            
        } else {
            console.log(404);   
        }
    }, 2);
}

function loadFriends() {
    VK.Api.call('friends.get', {count: 5, order: 'random', fields: 'nickname, photo_100', v: 5.90}, function (data) {
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
    $('.container').attr('style', '')  
}

function getProfileInfo() {
    VK.Api.call('users.get', {fields: 'photo_50', v: 5.90}, function(data) {
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
    $('.header').html(html);
    $('.header').attr('style', '')   
}