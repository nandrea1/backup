
$(document).ready(function(){
$('#trackInfoButtons .buttons').append('<button class="button btn_bg" id="savesong">Save Song</button><div style="display: none;" id="confirm">Song Saved</div>');
$('head').append('<script type="text/javascript">var savedsongs =[];</script>');
$('head').append('<script type="text/javascript">var savedsongscount =0;</script>');
$('#trackDetail').prepend('<div class="item savedSongs" style="display: block;"><div class="heading">Saved Songs</div><div id="savedsongs" class="itemContent"></div></div>');
$('#savesong').on('click', getCurrentInfo);
launchGrooveshark();
});

var savedsongs =[];
var savedsongscount = 0;

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
	$('.songEntry').on('click', function(){removeSavedSong(this);});
    
 }

function getSongEntry(song){
    var imgline = "<div> <img class='songEntry' id='savedSong"+savedsongscount+"' src='http://www.pandora.com/img/close1_btn.png' style='float: right; cursor: pointer;'></img>";
    var titleline = "<p><strong>Song Name: </strong><span class='songTitle1'>" + song.title + "</span></p>";
    var artistline = "<p><strong>Artist Name: </strong><span class='artistName1'>" + song.artist + "</span></p>";
    var albumline = "<p><strong>Album Name: </strong><span class='albumName1'>" + song.album + "</span></p>";
    var bottomline = "<hr/></div>";
    var htmltext = imgline + titleline + artistline + albumline + bottomline;
    return htmltext;
}

function launchGrooveshark(){
console.log('launching grooveshark');
chrome.runtime.sendMessage({data: "", command:"launchGrooveshark"}, function(response) {
  console.log(response.farewell);
});
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
