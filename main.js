$(document).click(function(e) {
    if ($('#input-text').val() == '') {
        $('#vocal').addClass('active');
        $('#send').removeClass('active');
    }
    if (!$(e.target).hasClass('nrs')) {
        $('#search').removeClass('active');
        $('.icon-search i:first-child').addClass('active');
        $('.icon-search i:last-child').removeClass('active');
        $('#user-search').val('');
        $('.user').removeClass('unselected');
    }
})

$('#user-search').click(function() {
    $('#search').addClass('active');
    $('.icon-search i:first-child').removeClass('active');
    $('.icon-search i:last-child').addClass('active');
    setTimeout(function(){
        if ($('#user-search').val() == '') {
            $('.user').removeClass('unselected');
        }
    }, 5)
});

$('#search .icon-search i:first-child').click(function() {
    $('#search').addClass('active');
    $('.icon-search i:first-child').removeClass('active');
    $('.icon-search i:last-child').addClass('active');
    $('#user-search').focus();
});

$('#search .icon-search i:last-child').click(function() {
    $('#search').removeClass('active');
    $('.icon-search i:first-child').addClass('active');
    $('.icon-search i:last-child').removeClass('active');
    $('#user-search').blur();
    $('#user-search').val('');
    $('.user').removeClass('unselected');
});

$('#user-search').keyup(function(e) {
    if ($('#user-search').val() == '') {
        $('.user').removeClass('unselected');
    } else {
        $('.user-name  p:first-child').each(function() {
            if (e.which == 13) {
                $('#search').removeClass('active');
                $('.icon-search i:first-child').addClass('active');
                $('.icon-search i:last-child').removeClass('active');
                $('#user-search').blur();
                $('#user-search').val('');
            }
            var text = $('#user-search').val().toLowerCase();
            var name = $(this).text().toLowerCase();
            if (name.includes(text)) {
                $(this).parents('.user').removeClass('unselected');
            } else {
                $(this).parents('.user').addClass('unselected');
            }
        })
    }
})

$('#input-text').keyup(function(e) {
    if ($('#input-text').val() == '') {
        $('#vocal').addClass('active');
        $('#send').removeClass('active');
    } else {
        if (e.which == 13) {
            send_message();
            $('#vocal').addClass('active');
            $('#send').removeClass('active');
        } else {
            $('#vocal').removeClass('active');
            $('#send').addClass('active');
        }
    }
})

$('#send').click(send_message);

$('#users').on('click', '.user', function() {
    var i = $(this).index();
    $('.user').removeClass('active');
    $(this).addClass('active');
    $('.chat-details').addClass('unselected');
    $('.chat-details').eq(i).removeClass('unselected');
    $('.chat-box').addClass('unselected');
    $('.chat-box').eq(i).removeClass('unselected');
})

function send_message() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    if (m < 10) {
        m = '0' + m;
    }
    var time = '' + h + ':' + m;
    var text = $('#input-text').val();
    var box = $('.chat-box').not('.unselected');
    var user_access = $('.chat-details').not('.unselected').find('.chat-access p');
    if (box.children('.received-messages').is(':last-child')) {
        var message = $('.template .send-messages').clone();
        message.find('.text-message').text(text);
        message.find('.clock').html(time + ' <i class="fas fa-check"></i>');
        box.append(message);
    } else {
        var message = $('.template .send-messages .send-message').clone();
        message.find('.text-message').text(text);
        message.find('.clock').html(time + ' <i class="fas fa-check"></i>');
        box.children('.send-messages:last-child').append(message);
    }
    var user = $('.user.active');
    user.find('.user-message p').html('<i class="fas fa-check"></i> ' + text);
    user.find('.user-name small').text(time);
    $('#input-text').val('');
    $('#vocal').addClass('active');
    $('#send').removeClass('active');
    var first_user = user.clone();
    var i = user.index();
    user.remove();
    $('#users').prepend(first_user);
    var first_detail = $('.chat-details').eq(i).clone();
    $('.chat-details').eq(i).remove();
    $('#header-chat').prepend(first_detail);
    var first_chat = $('.chat-box').eq(i).clone();
    $('.chat-box').eq(i).remove();
    $('#chat-boxes').prepend(first_chat);
    user = first_user;
    user_access = first_detail.find('.chat-access p');
    box = first_chat;
    auto_reply(box, user, text, user_access);
}

function auto_reply(box, user, text, user_access) {
    setTimeout(function() {
        box.find('.send-messages:last-child .send-message .time i').removeClass('fa-check');
        box.find('.send-messages:last-child .send-message .time i').addClass('fa-check-double');
        user.find('.user-message p i').removeClass('fa-check');
        user.find('.user-message p i').addClass('fa-check-double');
        setTimeout(function() {
            box.find('.send-messages:last-child .send-message .time i').removeClass('fa-check');
            box.find('.send-messages:last-child .send-message .time i').addClass('fa-check-double');
            box.find('.send-messages:last-child .send-message .time i').addClass('read');
            user.find('.user-message p i').removeClass('fa-check');
            user.find('.user-message p i').addClass('fa-check-double');
            user.find('.user-message p i').addClass('read');
            user_access.text('online');
            setTimeout(function() {
                box.find('.send-messages:last-child .send-message .time i').removeClass('fa-check');
                box.find('.send-messages:last-child .send-message .time i').addClass('fa-check-double');
                box.find('.send-messages:last-child .send-message .time i').addClass('read');
                var d = new Date();
                var h = d.getHours();
                var m = d.getMinutes();
                if (m < 10) {
                    m = '0' + m;
                }
                var time = '' + h + ':' + m;
                var textr = 'ok'
                if (box.children('.send-messages').is(':last-child')) {
                    var message = $('.template .received-messages').clone();
                    message.find('.text-message').text(textr);
                    message.find('.clock').text(time);
                    box.append(message);
                } else {
                    var message = $('.template .received-messages .received-message').clone();
                    message.find('.text-message').text(textr);
                    message.find('.clock').text(time);
                    box.children('.received-messages:last-child').append(message);
                }
                user.find('.user-message p').text(textr);
                user.find('.user-name small').text(time);
                user_access.text('Ultimo accesso oggi alle ' + time)
                var first_user = user.clone();
                var i = user.index();
                user.remove();
                $('#users').prepend(first_user);
                var first_detail = $('.chat-details').eq(i).clone();
                $('.chat-details').eq(i).remove();
                $('#header-chat').prepend(first_detail);
                var first_chat = $('.chat-box').eq(i).clone();
                $('.chat-box').eq(i).remove();
                $('#chat-boxes').prepend(first_chat);
                user = first_user;
            }, 1000)
        }, 3000)
    }, 2000)
}
