console.log("Hello, Lets Go")

let songs;
let currFolder;

function formatTime(seconds) {
    // Calculate minutes and seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
  
    // Pad minutes and seconds with leading zeros if necessary
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
  
    // Return the formatted time in MM:SS format
    return `${formattedMinutes}:${formattedSeconds}`;
  }

async function getSongs(folder) {
    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/${folder}/`)
    let response = await a.text();
    // console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`${folder}/`)[1])
        }
    }


    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" src="img/music.svg" alt="">
            <div class="info">
                <div>${song.replaceAll("%20", " ")}</div>
                <div>Buriburi</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="img/play.svg" alt="">
            </div></li>`;
    }

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })

}

const playMusic = (track, pause=false)=>{
    //   let audio = new Audio("/songs/" + track)
    currentSong.Src = `/${currFolder}/` + track
    if(!pause){

        currentSong.play()
        play.src = "pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

let currentSong = new Audio();
async function main() {
 
    songs = await getSongs("songs/cs")
    playMusic(songs[0], true)
    

  



          play.addEventListener("click",()=>{
            if(currentSong.paused){
                currentSong.play()
                play.src = "pause.svg"
            }
            else{
                currentSong.pause()
                play.src = "play.svg"
            }
          })

        currentSong.addEventListener("timeupdate",()=>{
            console.log(currentSong.currentTime, currentSong.durration);
            document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.
            currentTime)} / ${formatTime(currentSong.duration)}`
            document.querySelector(".circle").Style.left = (currentSong.currentTime/ currentSong.duration) * 100 + "%";
        })


        

        document.querySelector(".seekbar").addEventListener("click",e=>{
            let percent = (e.offsetX/e.target.getBoundingClientRect().width) * 100;
            document.querySelector(".circle").style.left = percent + "%";
            currentSong.currentTime = ((currentSong.duration) * percent)/100;
        })


     

        document.querySelector(".hamburger").addEventListener("click", ()=>{
            document.querySelector(".left").style.left = "0";
        })

        document.querySelector(".close").addEventListener("click", ()=>{
            document.querySelector(".close").style.left = "-120%";
        })

        previous.addEventListener("click", ()=>{
            console.log("Previous clicked")
            
            let index = songs.indexOf(currentSong.src.split("/").slice(-1) [0])
            if((index-1) >= 0){
                playMusic(songs[index+1])
            }
        })

        next.addEventListener("click", ()=>{
            console.log("Next clicked")
            
            let index = songs.indexOf(currentSong.src.split("/").slice(-1) [0])
            if((index+1) < songs.length) {
                playMusic(songs[index+1])
            }
        })

      


        document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e)=>{
            console.log(e,e.target,e.target.value)
            currentSong.volume = parseInt(e.target.value)/100;
        })

        Array.from(document.getElementsByClassName(".card")).forEach(e=>{
            e.addEventListener("click", async item =>{
                songs = await getSongs("songs/ncs")
                item.dataset.folder
            })
        })

}


main()



