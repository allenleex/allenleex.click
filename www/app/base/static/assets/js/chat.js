var urlWords = "/api/words";
var urlTalk = "/api/talk";
var urlNum = '/api/num/tingyongci';

function jieba() {
    var k = $.trim($("#keyword").val());
    if(k=='') return false;

    json = $.post(
        urlWords,
        { keyword: k },
        function(json,status){
            var data = json.data;
            if(data){
                console.log(json);
                $("#tags").empty();
                for(i in data) {
                    $("#tags").append('<button class="badge">' + data[i] + '</button>');
                }
                $("#tagNum").html("（共" + data.length + "个）");
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
        $("#chatroom-wrapper").css('height', h-120);
    } else {
        return false;
    }
}


$(document).ready(function(){
    // autoHeight();
    // $(window).resize(autoHeight);
    focus();
    getNumbers();

//    post('123', 0);
//    post('收到', 1);
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
    var c = '<div class="clear"></div>';
    if( type==0 )
        p = '<div class="chat-row"><div class="chat left" onclick="copyToKeyword(this)">' + s + '</div></div>';
    else
        p = '<div class="chat-row"><div class="chat right" onclick="copyToKeyword(this)">' + s + '</div></div>';
    $("#chatroom").prepend(p);
    $("#chatroom").prepend(c);
    clearInput();
}

function focus() {
    $("#keyword").focus();
}

function getNumbers() {
    $.get(urlNum,function(data,status){
        $("#num_tingyongci").html(data.stopwords);
    });
}

function clearInput() {
    $("#keyword").val('');
    focus();
}

function clearChat() {
    $("#chatroom").empty();
    focus();
}

function clearTags() {
    $("#tags").empty();
    focus();
}

function copyToKeyword(e) {
    $("#keyword").val($(e).html());
}