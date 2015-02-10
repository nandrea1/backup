$(document).ready(function(){
console.log('Document Ready!');
var buttonstring = '<a id="add-song-btn" onclick="checkGrooveshark()" class="btn btn-primary">Add Song ID!</a>';
$('#header-user-assets').append(buttonstring);
});

var gsstring = 'function checkGrooveshark(){ ' +
' console.log("Hello!"); ' + 
'}';

var groovescript = "<script type='text/javascript'>"+gsstring+"</script>";
var execscript = "<script type='text/javascript'>checkGrooveshark();</script>";
$('head').append(groovescript);
$('head').append(execscript);

function addSong(ids){
Grooveshark.addSongsByID(ids);
}