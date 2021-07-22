var urlWords = "/api/words";
var urlTalk = "/api/talk";

function jieba() {
    var k = $.trim($("#keyword").val());
    if(k=='') return false;

    json = $.post(
        urlWords,
        { keyword: k },
        function(json,status){
            console.log(json);
            var data = json.data;
            if(data){
                $("#tags").empty();
                for(i in data) {
                    $("#tags").append('<button class="badge">' + data[i] + '</button>');
                }
            }
        }
    );
}

function answer(question) {
    /*
    json = $.post(
        urlTalk,
        { question: question },
        function(json,status){
            console.log(json);
            var data = json.data;
            if(data){
                post(data, 1);
            }
        }
    );
    */

    post("收到", 1);
}

function autoHeight() {
    var h = $(window).height();
    if (h > 100) {
        $("#chatroom-wrapper").css('height', h-200);
    } else {
        return false;
    }
}


$(document).ready(function(){
    autoHeight();
    $(window).resize(autoHeight);
    focus();

    /*
    post('123', 0);
    post('收到', 1);
    post('123', 0);
    post('收到', 1);
    post('123', 0);
    post('收到', 1);
    post('123', 0);
    post('收到', 1);
    post('123', 0);
    post('收到', 1);
    */
});

$(document).keyup(function(e){
  if(e.keyCode==13){
    var k = $.trim($("#keyword").val());
    if(k=='') return false;
    jieba();
    post(k, 0);
    answer(k);
    focus();
  }
});

$("#keyword").change(function(){
    // jieba();
});

$("#keyword").keyup(function(){
    // jieba();
});

function post(str="...", type=0) {
    // .............
    var s = $.trim(str);
    if(s=='') return false;

    // .............
    var p = '';
    if( type==0 )
        p = '<div class="chat-row"><div class="chat left">' + s + '</div></div>';
    else
        p = '<div class="chat-row"><div class="chat right">' + s + '</div></div>';
    $("#chatroom").prepend(p);
    $("#keyword").val('');
}

function focus() {
    $("#keyword").focus();
}