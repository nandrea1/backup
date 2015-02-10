console.log('Content Script Working!');
$(document).ready(function(){
console.log('Document is ready!');
$('#trackInfoButtons .buttons').append('<button class="button btn_bg" id="savesong" onclick="getCurrentInfo()">Save Song</button><div style="display: none;" id="confirm">Song Saved</div>');
$('head').append('<script type="text/javascript">var savedsongs = [];var savedsongscount=0;</script>');
var functionstring = getCurrentInfo.toString();
$('head').append("<script type='text/javascript'>" + functionstring + "</script>");
var function2string = getSongEntry.toString();
$('head').append("<script type='text/javascript'>" + function2string + "</script>");
var function3string = removeSavedSong.toString();
$('head').append("<script type='text/javascript'>" + function3string + "</script>");
$('#trackDetail').prepend('<div class="item savedSongs" style="display: block;"><div class="heading">Saved Songs</div><div id="savedsongs" class="itemContent"></div></div>');
});

function getCurrentInfo(){  
 var song = new Object(); 
 var songTitle = $('.songTitle').text();
 var artistName = $('.artistSummary').text();
 var albumTitle = $('.albumTitle').text();
   song.title = songTitle;
    song.artist = artistName;
    song.album = albumTitle;
    savedsongs.push(song);
    savedsongscount++;
    var htmltext = getSongEntry(song);
    $('#savedsongs').append(htmltext);
    $("#confirm").show().delay(5000).fadeOut();
    
 }

function getSongEntry(song){
    var imgline = "<div id='savedSong"+savedsongscount+"'> <img onclick='removeSavedSong(this)' src='http://www.pandora.com/img/close1_btn.png' style='float: right; cursor: pointer;'></img>";
    var titleline = "<p><strong>Song Name: </strong><span class='songTitle'>" + song.title + "</span></p>";
    var artistline = "<p><strong>Artist Name: </strong><span class='artistName'>" + song.artist + "</span></p>";
    var albumline = "<p><strong>Album Name: </strong><span class='albumName'>" + song.album + "</span></p>";
    var bottomline = "<hr/></div>";
    var htmltext = imgline + titleline + artistline + albumline + bottomline;
    return htmltext;
}

function removeSavedSong(obj){
    var currtitle = $(obj).parent().children('.songTitle').text();
     var currartist = $(obj).parent().children('.artistName').text();
     var curralbum = $(obj).parent().children('.albumName').text();
    var deletesong = new Object();
    deletesong.title = currtitle;
    deletesong.artist = currartist;
    deletesong.album = curralbum;
    $(obj).parent().remove();
    savedsongscount = savedsongscount -1;
     var deletesongstring = deletesong.toString();
    for(var i=0; i<savedsongs.length; i++){
        var currsong = savedsongs[i];
        var currsongstring = currsong.toString();
        if(currsongstring == deletesongstring){
         savedsongs.splice(i,1);   
        }
    }
}
