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
    if (!$(e.target).hasClass('message-setting') && !$(e.target).hasClass('fa-angle-down')) {
        $('.message-menu').removeClass('active');
    }
})

$('#user-search').click(function() {
    $('#search').addClass('active');
    $('.icon-search i:first-child').removeClass('active');
    $('.icon-search i:last-child').addClass('active');
    setTimeout(function() {
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
            $('.chat-box').not('.unselected').find('.not-ready-message').remove();
        }
    }
})

$('#send').click(send_message);

$('#users').on('click', '.user', function() {
    var i = $(this).index();
    $('.user').removeClass('active');
    $(this).addClass('active');
    $(this).find('.count-notify').removeClass('active');
    $(this).find('.count-notify p').text('0');
    $('.chat-details').addClass('unselected');
    $('.chat-details').eq(i).removeClass('unselected');
    $('.chat-box').addClass('unselected');
    $('.chat-box').eq(i).removeClass('unselected');
    $('.chat-box').eq(i).scrollTop(300000000);
    $('#input-text').focus();
    setTimeout(function() {
        $('.chat-box').not('.unselected').find('.not-ready-message').remove();
    }, 10000);
})

$('#chat-boxes').on('click', '.message-setting', function(e) {
    $('.message-menu').removeClass('active');
    $(e.target).next('.message-menu').toggleClass('active');
    $(e.target).parent().next('.message-menu').toggleClass('active');
})

$('#chat-boxes').on('click', '.message-menu p:nth-child(2)', function(e) {
    var mes_u = $(e.target).closest('.message:only-child');
    var mes = $(e.target).closest('.message');
    if (mes_u.length > 0 && mes_u.parent().next().length > 0) {
        mes_u.parent().prev().append(mes_u.parent().next().children());
        mes_u.parent().next().remove();
    }
    mes_u.parent().remove();
    mes.remove();
    var box = $('.chat-box').not('.unselected');
    if (box.children('.received-messages').is(':last-child')) {
        var text = box.find('.received-messages:last-child .received-message:last-child > p').text();
    } else {
        var text = '<i class="' + box.find('.send-messages:last-child .send-message:last-child .time i').attr("class") + '"></i> ' + box.find('.send-messages:last-child .send-message:last-child > p').text();
    }
    $('.user.active .user-message p').html(text);
})

function send_message() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    if (m < 10) {
        m = '0' + m;
    }
    var time = '' + h + ':' + m + ' <i class="fas fa-check"></i>';
    var text = $('#input-text').val();
    var user = $('.user.active');
    var box = $('.chat-box').not('.unselected');
    var user_detail = $('.chat-details').not('.unselected');
    if (box.children('.send-messages').is(':last-child')) {
        var template = Handlebars.compile($('#send-message-template').html());
        var context = {
            text : text,
            time : time
        }
        var message = template(context);
        // var message = $('.template .send-messages .send-message').clone();
        // message.find('.text-message').text(text);
        // message.find('.clock').html(time + ' <i class="fas fa-check"></i>');
        box.children('.send-messages:last-child').append(message);
    } else {
        var template = Handlebars.compile($('#send-messages-template').html());
        var context = {
            text : text,
            time : time
        }
        var message = template(context);
        // var message = $('.template .send-messages').clone();
        // message.find('.text-message').text(text);
        // message.find('.clock').html(time + ' <i class="fas fa-check"></i>');
        box.append(message);
    }
    time = '' + h + ':' + m;
    $('#users').prepend(user);
    $('#header-chat').prepend(user_detail);
    $('#chat-boxes').prepend(box);
    user_access = user_detail.find('.chat-access p');
    user.find('.user-message p').html('<i class="fas fa-check"></i> ' + text);
    user.find('.user-name small').text(time);
    $('#input-text').val('');
    $('#vocal').addClass('active');
    $('#send').removeClass('active');
    box.scrollTop(300000000);
    auto_reply(box, user, text, user_access, user_detail);
}

function auto_reply(box, user, text, user_access, user_detail) {
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
                user_access.text('sta scrivendo ...');
                user.find('.user-message').addClass('writing');
                user.find('.user-message p').text('sta scrivendo ...');
                setTimeout(function() {
                    var d = new Date();
                    var h = d.getHours();
                    var m = d.getMinutes();
                    if (m < 10) {
                        m = '0' + m;
                    }
                    var time = '' + h + ':' + m;
                    var textr = 'ok'
                    if (!user.hasClass('active')) {
                        user.find('.count-notify').addClass('active');
                        var n = parseInt(user.find('.count-notify p').text());
                        n += 1;
                        user.find('.count-notify p').text(n);
                        if (box.children('.not-ready-message').length == 0) {
                            mnr = $('.template .not-ready-message').clone();
                            box.append(mnr);
                        }
                        if (n == 1) {
                            box.find('.not-ready-message p').text(n + ' MESSAGGIO NON LETTO');
                        } else {
                            box.find('.not-ready-message p').text(n + ' MESSAGGI NON LETTI')
                        }
                    }
                    if (box.children('.received-messages').is(':last-child')) {
                        var template = Handlebars.compile($('#received-message-template').html());
                        var context = {
                            text : textr,
                            time : time
                        }
                        var message = template(context);
                        // var message = $('.template .received-messages .received-message').clone();
                        // message.find('.text-message').text(textr);
                        // message.find('.clock').text(time);
                        box.children('.received-messages:last-child').append(message);
                    } else {
                        var template = Handlebars.compile($('#received-messages-template').html());
                        var context = {
                            text : textr,
                            time : time
                        }
                        var message = template(context);
                        // var message = $('.template .received-messages').clone();
                        // message.find('.text-message').text(textr);
                        // message.find('.clock').text(time);
                        box.append(message);
                    }
                    user.find('.user-message').removeClass('writing')
                    user.find('.user-message p').text(textr);
                    user.find('.user-name small').text(time);
                    user_access.text('Ultimo accesso oggi alle ' + time)
                    $('#users').prepend(user);
                    $('#header-chat').prepend(user_detail);
                    $('#chat-boxes').prepend(box);
                    box.scrollTop(300000000);
                }, 5000)
            }, 1000)
        }, 6000)
    }, 4000)
}
