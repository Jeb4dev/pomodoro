let socket = io();

let pomodoro_length = 25;
let short_break_length = 5;
let long_break_length = 15;

let timerAdd = 60000 * pomodoro_length + 1000;
let now = new Date().getTime();
let countDownDate = new Date().getTime() + timerAdd;
let reset = false;
let pause = true;
let playing = false;
let music_volume = 100;
let timer_volume = 0.2;
youtube_video_id = 'sjkrrmBnpGE'

function selectTimerLogic(active) {
    let pomodoro = document.getElementById('pomodoro');
    let shortBreak = document.getElementById('short-break');
    let longBreak = document.getElementById('long-break');

    if (active === "pomodoro") {
        pomodoro.className = "header-btn-active";
        shortBreak.className = "header-btn";
        longBreak.className = "header-btn";

        timerAdd = 60000 * pomodoro_length + 1000;
        now = new Date().getTime();
        countDownDate = new Date().getTime() + timerAdd;
        reset = true;
        pause = true;

    } else if (active === "short-break") {
        pomodoro.className = "header-btn";
        shortBreak.className = "header-btn-active";
        longBreak.className = "header-btn";

        timerAdd = 60000 * short_break_length + 1000;
        now = new Date().getTime();
        countDownDate = new Date().getTime() + timerAdd;
        reset = true;
        pause = true;
    } else {
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
    let divID = document.getElementById(DivId);

    if (divID.className === "task") {
        divID.className = "task-done"
    } else {
        divID.className = "task"
    }
}

pause = true
last_distance = countDownDate - now

function play() {
    socket.emit('play', {'username': "{{username}}", 'room': "{{chatRoomName}}", 'pause': pause});
}

function playlogic() {
    let PlayBtn = document.getElementById('PlayBtn');
    let PauseBtn = document.getElementById('PauseBtn');
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

socket.on('uploadPause', function (pauseV) {
    pause = pauseV
    playlogic()
})
;

function resetTime() {
    socket.emit('reset', {'username': "{{username}}", 'room': "{{chatRoomName}}"});
}

function resetTimelogic() {
    countDownDate = new Date().getTime() + timerAdd;
    reset = true;
    pause = true;
    player.stopVideo();
}

socket.on('resetTimer', function () {
    resetTimelogic()
})
;

function selectTimer(active) {
    socket.emit('active', {'username': "{{username}}", 'room': "{{chatRoomName}}", 'active': active});
}

socket.on('changeActive', function (active) {
    selectTimerLogic(active)
})
;
// Update the count down every 1 second
let x = setInterval(function () {
            // Get today's date and time
            let now = new Date().getTime();
            if (!reset) {
                if (pause) {
                    countDownDate = new Date().getTime() + last_distance;
                }
            } else {
                reset = false
            }


            let distance = countDownDate - now;
            last_distance = distance


            // Time calculations for days, hours, minutes and seconds
            //let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            //let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);


            document.getElementById("countdown").innerHTML = minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
            if (!pause) {
                document.title = minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0') + " - Pomodoro Time Left";
            } else {
                document.title = "Pomodoro - For Productivity";
            }

            // If the count-down is over, write some text
            if (playing) {
                if (distance > 0) {
                    playing = false
                }
            }
            if (distance < 0) {
                if (!playing) {
                    playing = true
                    let a = new Audio("/static/audio/world_clear.wav");
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

        }, 1000
    )
;

let pick_img = 1

function next_img(custom_url) {
    let images = []
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
        images[10] = ('url(' + custom_url + ')');//custom url
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
window.onclick = function (event) {
    if (!event.target.matches('.control-btn')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// change music
function play_music(video_id, id_
) {
    if (video_id == "none") {
        player.stopVideo();
    } else {
        youtube_video_id = video_id;
        playNewVideo();
    }
    let selected = document.getElementById(id_);
    let musicBnt = document.getElementById("control-btn");
    musicBnt.innerHTML = selected.innerHTML
}


// youtube player

// 2. This code loads the IFrame Player API code asynchronously.
let tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag
)
;

// 3. This function creates an <iframe> (and YouTube player)
// after the API code downloads.
let player;

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
    if (pause) {
        player.pauseVideo();
    }

}

let modal;

// Get the modal
function openModule(moduleId) {
    modal = document.getElementById(moduleId);
    modal.style.display = 'block';

    let short_break = document.getElementById("short-break_input");
    short_break.value = short_break_length

}

function closeModule() {
    modal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
    if (event.target.id === "main-template") {
        if (document.getElementById("sideNavLeft").style.display === "block") {
            togglesSideBarLeft()
        }
        if (document.getElementById("sideNavRight").style.display === "block") {
            togglesSideBarRight()
        }
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


function uploadBackground() {
    custom_url = document.getElementById("custom-bg-img-url").value;
    next_img(custom_url);
}


////////////////
// SOCKETS //
////////////////


socket.on('greetings', function (msg) {
    console.log(msg)
    socket.emit('greetings', {'username': "{{username}}", 'room': "{{chatRoomName}}", 'userId': socket.id});
});


socket.on('connect', function () {
    console.log("connected")
});

socket.on('disconnect', function () {
    console.log("disconnected")
});

socket.on('notify', function (txt) {
    div = document.getElementById("main-div")
    connected = document.getElementById("connected")
    console.log(txt);

    let alert = document.createElement('div');
    alert.setAttribute('class', 'vnotify-item vnotify-notify');
    alert.setAttribute('style', 'display: block;');
    alert.setAttribute('id', 'alert');

    let msg = document.createElement('div');
    msg.setAttribute('class', 'vnotify-text');
    msg.innerHTML = txt;

    let close = document.createElement('span');
    close.setAttribute('class', 'vn-close');
    close.setAttribute('onclick', 'document.getElementById("alert").remove()');

    alert.appendChild(msg);
    alert.appendChild(close);

    div.appendChild(alert);
});

socket.on('connectedusers', function (txt) {


    let user = document.getElementById('insession');
    user.innerHTML = txt.join("<br><br>");
});

// browser - for other users
socket.on('user_left_group', function (user) {
    console.log(user + " disconnected")
})

window.addEventListener('onunload', function (e) {
    console.log("unload")
    e.preventDefault();
    e.returnValue = ' ';
});

let dummy = document.createElement('input'),
    text = window.location.href;


function CopyToClipboard() {
    /* Get the text field */
    let copyText = document.getElementById("myInput");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);

    /* Alert the copied text */
    notification("Session link copied to clipboard.");
}

function notification(txt) {
    div = document.getElementById("main-div")
    connected = document.getElementById("connected")
    console.log(txt);

    let alert = document.createElement('div');
    alert.setAttribute('class', 'vnotify-item vnotify-notify');
    alert.setAttribute('style', 'display: block;');
    alert.setAttribute('id', 'alert');

    let msg = document.createElement('div');
    msg.setAttribute('class', 'vnotify-text');
    msg.innerHTML = txt;

    let close = document.createElement('span');
    close.setAttribute('class', 'vn-close');
    close.setAttribute('onclick', 'document.getElementById("alert").remove()');

    alert.appendChild(msg);
    alert.appendChild(close);

    div.appendChild(alert);
}

function defineIntervals() {
    pomodoro_length = document.getElementById("pomodoro-time_input").value;
    short_break_length = document.getElementById("short-break_input").value;
    long_break_length = document.getElementById("long-break_input").value;
    socket.emit('defineIntervals', {
        'username': "{{username}}",
        'room': "{{chatRoomName}}",
        'pomodoro_length': pomodoro_length,
        'short_break_length': short_break_length,
        'long_break_length': long_break_length
    });
}

socket.on('uploadIntervals', function (data) {
    pomodoro_length = data["pomodoro_length"]
    short_break_length = data["short_break_length"]
    long_break_length = data["long_break_length"]
    console.log(long_break_length)
});