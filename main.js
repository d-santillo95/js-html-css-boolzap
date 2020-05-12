$('#input-text').keyup(function(e) {
    if ($('#input-text').val() == '') {
        $('#vocal').addClass('active');
        $('#send').removeClass('active');
    } else {
        $('#vocal').removeClass('active');
        $('#send').addClass('active');
    }
    if (e.which==13) {
        send_message();
    }
})

$(document).click(function() {
    if ($('#input-text').val() == '') {
        $('#vocal').addClass('active');
        $('#send').removeClass('active');
    }
})

$('#send').click(send_message);

function send_message() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var time = '' + h + ':' + m;
    var text = $('#input-text').val();
    if ($('.received-messages').is(':last-child')) {
        $('#chat-box').append('<div class="send-messages"><div class="send-message"><p>' + text + '</p><div class="time"><p>' + time + ' <i class="fas fa-check"></i></p></div><div class="message-setting"><i class="fas fa-angle-down"></i></div></div>');
    } else {
        $('#chat-box .send-messages:last-child').append('<div class="send-message"><p>' + text + '</p><div class="time"><p>' + time + ' <i class="fas fa-check"></i></p></div><div class="message-setting"><i class="fas fa-angle-down"></i></div>');
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
            $('#chat-box .send-messages:last-child .send-message .time i').addClass('read');
            setTimeout(function(){
                var d = new Date();
                var h = d.getHours();
                var m = d.getMinutes();
                var time = '' + h + ':' + m;
                if ($('.send-messages').is(':last-child')) {
                    $('#chat-box').append('<div class="received-messages"><div class="received-message"><p>' + 'ok' + '</p><div class="time"><p>' + time + '</p></div><div class="message-setting"><i class="fas fa-angle-down"></i></div></div>');
                } else {
                    $('#chat-box .received-messages:last-child').append('<div class="received-message"><p>' + 'ok' + '</p><div class="time"><p>' + time + '</p></div><div class="message-setting"><i class="fas fa-angle-down"></i></div>');
                }
            }, 10000)
        }, 30000)
    }, 20000)
}
