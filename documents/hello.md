    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        });
    });
    

        
         currentSong.addEventListener("timeupdate", () => {
            console.log(currentSong.currentTime, currentSong.duration);
            document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`;
            document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
        });


   document.querySelector(".seekbar").addEventListener("click", (e) => {
            if (currentSong.duration > 0) {
                let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
                document.querySelector(".circle").style.left = percent + "%";
                currentSong.currentTime = (currentSong.duration * percent) / 100;
            }
        });
        

  previous.addEventListener("click", () => {
            console.log("Previous clicked");
            let index = songs.indexOf(currentSong.src.split(`${currFolder}/`)[1]);
            if ((index - 1) >= 0) {
                playMusic(songs[index - 1]);
            }
        });
        
        next.addEventListener("click", () => {
            console.log("Next clicked");
            let index = songs.indexOf(currentSong.src.split(`${currFolder}/`)[1]);
            if ((index + 1) < songs.length) {
                playMusic(songs[index + 1]);
            }
        });
        