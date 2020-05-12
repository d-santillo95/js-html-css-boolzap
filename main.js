$('#input-text').keyup(function() {
    if ($('#input-text').val() == '') {
        $('#vocal').addClass('active');
        $('#send').removeClass('active');
    } else {
        $('#vocal').removeClass('active');
        $('#send').addClass('active');
    }
})

$(document).click(function() {
    if ($('#input-text').val() == '') {
        $('#vocal').addClass('active');
        $('#send').removeClass('active');
    }
})

$('#send').click(function() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var time = '' + h + ':' + m;
    var text = $('#input-text').val();
    if ($('.received-messages').is(':last-child')) {
        $('#chat-box').append('<div class="send-messages"><div class="send-message"><p>' + text + '</p><div class="time"><p>' + time + ' <i class="fas fa-check-double"></i></p></div><div class="message-setting"><i class="fas fa-angle-down"></i></div></div>');
    } else {
        $('#chat-box .send-messages:last-child').append('<div class="send-message"><p>' + text + '</p><div class="time"><p>' + time + ' <i class="fas fa-check-double"></i></p></div><div class="message-setting"><i class="fas fa-angle-down"></i></div>');
    }
    $('#input-text').val('');
    $('#vocal').addClass('active');
    $('#send').removeClass('active');
})
