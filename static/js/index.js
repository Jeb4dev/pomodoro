function togglesSideBarRight() {
    var right = document.getElementById('right');
    var rightNav = document.getElementById('sideNavRight');

    if (right.style.flexBasis == "20%") {
      setTimeout(function () {
            right.style.flexBasis = "0%";
            right.style.visibility = "hidden";
            rightNav.style.display = "none";
        }, 400);
      rightNav.style.animation = "rightToggleOff 0.5s";
      right.style.animation = "rightToggleOff2 0.5s";
    } else {
        right.style.flexBasis = "0%";
        rightNav.style.display = "block";
        right.style.visibility = "visible";
        setTimeout(function () {
          right.style.flexBasis = "20%";
        }, 400);
      rightNav.style.animation = "rightToggleOn 0.5s";
      right.style.animation = "rightToggleOn2 0.5s";
    }
}
function togglesSideBarLeft() {
    var left = document.getElementById('left');
    var leftNav = document.getElementById('sideNavLeft');
    if (left.style.flexBasis == "20%") {
      setTimeout(function () {
            left.style.flexBasis = "0%";
            left.style.visibility = "hidden";
            leftNav.style.display = "none";
        }, 400);
      leftNav.style.animation = "leftToggleOff 0.5s";
      left.style.animation = "leftToggleOff2 0.5s";
    } else {
        right.style.flexBasis = "0%";
        leftNav.style.display = "block";
        left.style.visibility = "visible";
        setTimeout(function () {
          left.style.flexBasis = "20%";
        }, 400);
      leftNav.style.animation = "leftToggleOn 0.5s";
      left.style.animation = "leftToggleOn2 0.5s";
    }
}

//function toggleMain(){
//    var right = document.getElementById('right');
//    var left = document.getElementById('left');
//    var main = document.getElementById('main');
//    if (right.style.flexBasis == "0%") {
//      if (left.style.flexBasis == "0%"){
//        main.style.flexBasis = "100%";
//      } else {
//        main.style.flexBasis = "80%";
//      }
//    } else {
//      if (left.style.flexBasis == "0%"){
//        main.style.flexBasis = "85%";
//      } else {
//        main.style.flexBasis = "65%";
//      }
//    }
//}

var pomodoro_length = 25;
var short_break_length = 5;
var long_break_length = 15;

var timerAdd = 60000 * pomodoro_length + 1000;
var now = new Date().getTime();
var countDownDate = new Date().getTime() + timerAdd;
var reset = false;
var pause = true;
var playing = false;
var music_volume = 100;
var timer_volume = 0.2;
youtube_video_id = 'sjkrrmBnpGE'

function selectTimer(active) {
    var pomodoro = document.getElementById('pomodoro');
    var shortBreak = document.getElementById('short-break');
    var longBreak = document.getElementById('long-break');

    if (active == "pomodoro") {
      pomodoro.className = "header-btn-active";
      shortBreak.className = "header-btn";
      longBreak.className = "header-btn";

      timerAdd = 60000 * pomodoro_length + 1000;
      now = new Date().getTime();
      countDownDate = new Date().getTime() + timerAdd;
      reset = true;
      pause = true;

    }
    else if (active == "short-break"){
      pomodoro.className = "header-btn";
      shortBreak.className = "header-btn-active";
      longBreak.className = "header-btn";

      timerAdd = 60000 * short_break_length + 1000;
      now = new Date().getTime();
      countDownDate = new Date().getTime() + timerAdd;
      reset = true;
      pause = true;
    }
    else{
      pomodoro.className = "header-btn"
      shortBreak.className = "header-btn"
      longBreak.className = "header-btn-active"

      timerAdd = 60000 * long_break_length + 1000
      now = new Date().getTime();
      countDownDate = new Date().getTime() + timerAdd;
      reset = true;
      pause = true;
    }
}

// toggle task done / not done
function task(DivId) {
    var divID = document.getElementById(DivId);

    if (divID.className == "task") {
      divID.className = "task-done"
    }
    else{
      divID.className = "task"
    }
}
pause = true
last_distance = countDownDate - now
function play() {
 var PlayBtn = document.getElementById('PlayBtn');
 var PauseBtn = document.getElementById('PauseBtn');
 pause = !pause
 if (!pause) {
        player.playVideo();

        PlayBtn.style.display = "none";
        PauseBtn.style.display = "block";

    } else {
        player.pauseVideo();
        PlayBtn.style.display = "block";
        PauseBtn.style.display = "none";
    }
}
function resetTime() {
      countDownDate = new Date().getTime() + timerAdd;
      reset = true;
      pause = true;
      player.stopVideo();
}

// Update the count down every 1 second
var x = setInterval(function() {
  // Get today's date and time
  var now = new Date().getTime();
  if (!reset) {
      if (pause) {
        countDownDate = new Date().getTime() + last_distance;
      }
  } else {
    reset = false
  }


  var distance = countDownDate - now;
  last_distance = distance



  // Time calculations for days, hours, minutes and seconds
  //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);



  document.getElementById("countdown").innerHTML = minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
  if (!pause) {
    document.title = minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0') + " - Pomodoro Time Left";
  } else {
    document.title = "Pomodoro - For Productivity";
  }

  // If the count down is over, write some text
  if (playing) {
    if (distance > 0){
        playing = false}}
  if (distance < 0) {
    if (!playing) {
        playing = true
        var a = new Audio("/static/audio/world_clear.wav");
        a.play();
        a.volume = timer_volume;
        if (timerAdd >= 60000 * pomodoro_length + 1100) {
              timerAdd = 60000 * short_break_length
              now = new Date().getTime();
              countDownDate = new Date().getTime() + timerAdd;
              reset = true;
              pause = true;
        } else {
          timerAdd = 60000 * pomodoro_length + 1100
          now = new Date().getTime();
          countDownDate = new Date().getTime() + timerAdd;
          reset = true;
          pause = true;
          player.stopVideo();
        }
    }
    document.getElementById("countdown").innerHTML = "00:00";
  }

}, 1000);

var pick_img = 1
function next_img(custom_url) {
  var images = []
  images[1] = 'url(/static/images/1.jpg)';//https://images.unsplash.com/photo-1463288889890-a56b2853c40f
  images[2] = 'url(/static/images/2.jpeg)';//https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg
  images[3] = 'url(/static/images/3.jpg)';//https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg
  images[4] = 'url(/static/images/4.jpg)';//https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg
  images[5] = 'url(/static/images/5.jpeg)';//https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg
  images[6] = 'url(/static/images/6.jpg)';//https://images.pexels.com/photos/1840794/pexels-photo-1840794.png
  images[7] = 'url(/static/images/7.jpg)';//https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg
  images[8] = 'url(/static/images/8.jpg)';//https://images.pexels.com/photos/6992/forest-trees-northwestisbest-exploress.jpg
  images[9] = 'url(/static/images/9.jpeg)';//https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg
  images[10] = 'url(/static/images/10.jpeg)';//https://images.pexels.com/photos/315938/pexels-photo-315938.jpeg

  if (custom_url) {
    images[10] = ('url('+custom_url+')');//custom url
    pick_img = 10
  } else {
      pick_img = pick_img + 1
      if (pick_img == 11) {
        pick_img = 1;
      }
  }


  document.getElementById("main-template").style.backgroundImage = images[pick_img]
//  document.getElementById("main-template").backgroundImage = images[pick_img]
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function toggleMusicDropdown() {
  document.getElementById("musicDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.control-btn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// change music
function play_music(video_id, id_) {
    if (video_id == "none") {
    player.stopVideo();} else {
    youtube_video_id = video_id;
    playNewVideo();
    }
    var selected = document.getElementById(id_);
    var musicBnt = document.getElementById("control-btn");
    musicBnt.innerHTML = selected.innerHTML
}


// youtube player

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
  height: '390',
  width: '640',
  videoId: youtube_video_id,
  playerVars: {
    'playsinline': 1
  },
  events: {
    'onReady': onPlayerReady,
//    'onStateChange': onPlayerStateChange
  }
});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
event.target.pauseVideo();
}
function changeVolume() {
player.setVolume(music_volume);
}
function stopVideo() {
player.stopVideo();
}
function pauseVideo() {
player.pauseVideo();
}
function playVideo() {
player.playVideo();
}
function playNewVideo() {
player.loadVideoById(youtube_video_id)
if (pause) {player.pauseVideo();}

}
var modal;
// Get the modal
function openModule(moduleId) {
  modal = document.getElementById(moduleId);
  modal.style.display='block';

  var short_break = document.getElementById("short-break_input");
  short_break.value = short_break_length

}
function closeModule() {
  modal.style.display='none';
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
  if (event.target.id == "main-template") {
      if (document.getElementById("sideNavLeft").style.display == "block") {togglesSideBarLeft()}
      if (document.getElementById("sideNavRight").style.display == "block") {togglesSideBarRight()}
  }
}

function defineMusic() {
    if (document.getElementById("custom-music-id").value) {
    youtube_video_id = document.getElementById("custom-music-id").value;
    playNewVideo();
    }
    music_volume = document.getElementById("music-volume").value;
    timer_volume = (document.getElementById("timer-volume").value / 100);
    changeVolume();
}

function defineIntervals() {
    pomodoro_length = document.getElementById("pomodoro-time_input").value;
    short_break_length = document.getElementById("short-break_input").value;
    long_break_length = document.getElementById("long-break_input").value;
}
function uploadBackground() {
    custom_url = document.getElementById("custom-bg-img-url").value;
    next_img(custom_url);
}