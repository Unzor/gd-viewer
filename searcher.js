function showLoad(){ 
  document.getElementById('spin').style.display="block"; 
}; 
function hideLoad(){ 
  document.getElementById('spin').style.display="none";
}; 
var num=0; 
var entered=false;
setInterval(function(){ 
  if (num === 0){
    document.getElementById('prev').disabled='disabled'; 
  } else { 
    document.getElementById('prev').removeAttribute('disabled'); 
  }; 
  if (entered === false){ 
    document.getElementById('next').disabled='disabled'; 
  } else { 
    document.getElementById('next').removeAttribute('disabled');
  }; }, 10); 
document.getElementById('go').onclick=function(){ 
  entered=true; 
  setInterval(function(){ 
    var fakeNum=num+1; 
    document.getElementById('page').innerHTML='Page: ' + fakeNum; }, 10); 
  num=0; 
  getLevels(document.getElementById('lvl').value, document.getElementById('results'), 0); }; 
document.getElementById('next').onclick=function(){
  num=num+1; 
  getLevels(document.getElementById('lvl').value, document.getElementById('results'), num); };
document.getElementById('prev').onclick=function(){ 
  num=num-1; getLevels(document.getElementById('lvl').value, document.getElementById('results'), num); 
}; 
function getLevels(name, appende, pg){ 
  showLoad(); 
  appende.innerHTML=""; 
  geometryDash.getApi('/api/search/' + name,{page: pg}, function(data){ 
    function createResult(num){ 
      var name=document.createElement('pre'); 
      var songname=document.createElement('pre'); 
      var diff=document.createElement('img'); 
      var lvlid=document.createElement('pre');
      var plpstats=document.createElement('pre');
      plpstats.innerHTML='<img src="https://gdbrowser.com/assets/download.png" width="30" height="30"></img> ' + data[num].downloads + ' <img src="https://gdbrowser.com/assets/like.png" width="30" height="30"></img> ' + data[num].likes + '<img src="https://gdbrowser.com/assets/orbs.png" width="30" height="30"></img>' + data[num].orbs + '<img src="https://gdbrowser.com/assets/time.png" width="30" height="30"></img>' + data[num].length; 
      lvlid.innerHTML="Level ID: " + data[num].id; 
      name.innerHTML=data[num].name + ' - by <a href="profile.html?user=' + data[num].author + '">' + data[num].author + '</a>'; 
      if (data[num].customSong !== 0){ 
        songname.innerHTML='Song: <a target="_blank" href="https://www.newgrounds.com/audio/listen/' + data[num].customSong + '">' + data[num].songName + '</a>' + ' by <a target="_blank" href="https://' + data[num].songAuthor + '.newgrounds.com">' + data[num].songAuthor + '</a>'; 
      } 
      else { 
        songname.innerHTML='Song: ' + data[num].songName + ' by ' + data[num].songAuthor; 
      }; 
      diff.src="https://gdbrowser.com/assets/difficulties/" + data[num].difficultyFace + ".png"; 
      diff.width="50"; 
      appende.appendChild(diff); 
      appende.appendChild(name); 
      appende.appendChild(songname);
      appende.appendChild(lvlid); 
      appende.appendChild(plpstats); 
      appende.appendChild(document.createElement('hr'));
      hideLoad(); }; 
    createResult(0); 
    createResult(1); 
    createResult(2); 
    createResult(3); 
    createResult(4); 
    createResult(5); 
    createResult(6); 
    createResult(7); 
    createResult(8); 
    createResult(9); 
  }); 
}