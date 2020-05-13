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

$('#search .nrs').click(function() {
    $('#search').addClass('active');
    $('.icon-search i:first-child').removeClass('active');
    $('.icon-search i:last-child').addClass('active');
    setTimeout(function() {
        if ($('#user-search').val() == '') {
            $('.user').removeClass('unselected');
        }
    }, 5)
});

$('#search icon-search i:first-child').click(function() {
    $('#search').addClass('active');
    $('.icon-search i:first-child').removeClass('active');
    $('.icon-search i:last-child').addClass('active');
    $('#user-search').focus();
});

$('#search icon-search i:last-child').click(function() {
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

function send_message() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    if (m < 10) {
        m = '0' + m;
    }
    var time = '' + h + ':' + m;
    var text = $('#input-text').val();
    if ($('#chat-box .received-messages').is(':last-child')) {
        var message = $('.template .send-messages').clone();
        message.find('.text-message').text(text);
        message.find('.clock').html(time + ' <i class="fas fa-check"></i>');
        $('#chat-box').append(message);
    } else {
        var message = $('.template .send-messages .send-message').clone();
        message.find('.text-message').text(text);
        message.find('.clock').html(time + ' <i class="fas fa-check"></i>');
        $('#chat-box .send-messages:last-child').append(message);
    }
    $('#input-text').val('');
    $('#vocal').addClass('active');
    $('#send').removeClass('active');
    auto_reply();
}

function auto_reply() {
    setTimeout(function() {
        $('#chat-box .send-messages:last-child .send-message .time i').removeClass('fa-check');
        $('#chat-box .send-messages:last-child .send-message .time i').addClass('fa-check-double');
        setTimeout(function() {
            $('#chat-box .send-messages:last-child .send-message .time i').removeClass('fa-check');
            $('#chat-box .send-messages:last-child .send-message .time i').addClass('fa-check-double');
            $('#chat-box .send-messages:last-child .send-message .time i').addClass('read');
            setTimeout(function() {
                $('#chat-box .send-messages:last-child .send-message .time i').removeClass('fa-check');
                $('#chat-box .send-messages:last-child .send-message .time i').addClass('fa-check-double');
                $('#chat-box .send-messages:last-child .send-message .time i').addClass('read');
                var d = new Date();
                var h = d.getHours();
                var m = d.getMinutes();
                if (m < 10) {
                    m = '0' + m;
                }
                var time = '' + h + ':' + m;
                var text = 'ok'
                if ($('#chat-box .send-messages').is(':last-child')) {
                    var message = $('.template .received-messages').clone();
                    message.find('.text-message').text(text);
                    message.find('.clock').text(time);
                    $('#chat-box').append(message);
                } else {
                    var message = $('.template .received-messages .received-message').clone();
                    message.find('.text-message').text(text);
                    message.find('.clock').text(time);
                    $('#chat-box .received-messages:last-child').append(message);
                }
            }, 10000)
        }, 30000)
    }, 20000)
}
