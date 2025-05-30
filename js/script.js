
    // create a API of my songs

    let myMusics = [
        {
            songer: "mohsen chavoshi",
            name: "bad az to",
            src: "1",
            like: false
        },
        {
            songer: "mohsen chavoshi",
            name: "parouye bi ghayegh",
            src: "2",
            like: false
        },
        {
            songer: "mohsen chavoshi",
            name: "rahaya kon",
            src: "3",
            like: false
        },
        {
            songer: "mohsen chavoshi",
            name: "zakhm kari",
            src: "4",
            like: false
        },
        {
            songer: "ebi",
            name: "hezaro yek shab",
            src: "5",
            like: false
        },
        {
            songer: "Fereidoon Foroughi",
            name: "parvane man",
            src: "6",
            like: false
        },
        {
            songer: "hayedeh",
            name: "saghare hasti",
            src: "7",
            like: false
        },
        {
            songer: "arctic monkeys",
            name: "505",
            src: "8",
            like: false
        },
        {
            songer: "shayea",
            name: "ye moghehaei",
            src: "9",
            like: false
        },
        {
            songer: "shayea",
            name: "az avval",
            src: "10",
            like: false
        }
    ]

    // create a API of my songs

    //selectors
    let $ = document;
    const musicImg = $.querySelector(".musicimg"),
        musicName = $.querySelector(".musicname"),
        songer = $.querySelector(".songer"),
        likeMusic = $.querySelector(".likeMain"),
        music = $.querySelector("audio"),
        playBtn = $.querySelector(".play"),
        musicDuration = $.querySelector(".duration"),
        musicCurrent = $.querySelector(".current"),
        progressCurrent = $.querySelector(".progresscurrent"),
        progressDuration = $.querySelector(".progressduration"),
        myVolume = $.querySelector(".progressvolum"),
        durationVolume = myVolume.firstElementChild.nextElementSibling,
        currentVolume = durationVolume.firstElementChild,
        volumeP = myVolume.firstElementChild,
        nextOrPervBtn = $.querySelectorAll(".bi-fast-forward-fill"),
        shuffleBtn = $.querySelector(".bi-shuffle"),
        repeatBtn = $.querySelector(".bi-repeat"),
        sampleAudio = $.querySelector(".sample"),
        myMusicsUl = $.querySelector(".musicslist"),
        myfavoritUl = $.querySelector(".favoritlist"),
        xBtns = $.querySelectorAll(".bi-x-circle")




    //selectors

    //variables

    let duration,
        currentTime,
        changeVolume = true,
        flag = false,
        index = 0,
        randomsNumber = [],
        shuffle = false,
        indexLoad = index,
        repeat = false,
        myLis;


    //variables


    //cheac local storeg for get music and stats

    localStorage.getItem("musics") && (myMusics = JSON.parse(localStorage.getItem("musics")))
    localStorage.getItem("loadIndex") && (indexLoad = +localStorage.getItem("loadIndex"))
    localStorage.getItem("shuffle") && (shuffle = JSON.parse(localStorage.getItem("shuffle")))
    localStorage.getItem("repeat") && (repeat = JSON.parse(localStorage.getItem("repeat")))
    setTimeout(() => {
        index = indexLoad
        shuffle && shuffleBtn.click()
        repeat && repeatBtn.click()
    }, 100);
    //cheac local storeg for get music and stats

    //add click on bi-b-circles

    function leftX() { myMusicsUl.classList.add("left") }
    function rightX() { myfavoritUl.classList.add("right") }



    //add click on bi-b-circles

    //add click on h3 for remove class

    function leftIn() {
        myMusicsUl.classList.remove("left")
    }
    function rightIn() {
        myfavoritUl.classList.remove("right")
    }
    //add click on h3  for remove class


    //create shuffle list

    function createRandomNumberList() {

        let numbers = []
        randomsNumber = []
        myMusics.forEach((element, i) => {
            numbers.push(i)
        });

        let rand

        while (numbers.length) {
            rand = Math.round(Math.random() * (numbers.length - 1))
            randomsNumber.push((numbers.splice(rand, 1)[0]))
        }

    }

    // create shuffle list

    //get duration and load duration

    loadMusic(indexLoad)
    music.addEventListener("loadeddata", function (e) {
        duration = e.target.duration
        musicDuration.innerHTML = setTime(duration)
        changeVolume = true
    })

    //get duration and load duration

    //loadmusic

    function loadMusic(index) {
        localStorage.setItem("loadIndex", JSON.stringify(index))
        changeActiveLiToNext()
        music.src = `music/${myMusics[index].src}.mp3`
        musicImg.src = `img/${myMusics[index].src}.jpg`
        musicName.innerHTML = myMusics[index].name;
        songer.innerHTML = myMusics[index].songer;
        myMusics[index].like ? likeMusic.classList.replace("bi-heart", "bi-heart-fill") : likeMusic.classList.replace("bi-heart-fill", "bi-heart")
    }

    //loadmusic


    //settime

    function setTime(time) {
        let min = Math.floor((time / 60))
        let sec = Math.floor((time % 60))
        sec < 10 && (sec = "0" + sec)
        let res = `${min}:${sec}`
        return res
    }

    //settime

    //add click on playBtn
    playBtn.addEventListener("click", function () {
        playBtn.classList.contains("bi-play-circle") ? playMusic() : pauseMusic()
    })
    //add click on playBtn

    //play
    function playMusic() {
        music.play()
        playBtn.classList.replace("bi-play-circle", "bi-pause-circle")
    }

    //play

    //pause
    function pauseMusic() {
        music.pause()
        playBtn.classList.replace("bi-pause-circle", "bi-play-circle")
    }
    //pause


    //shuffle Btn

    shuffleBtn.addEventListener("click", function (e) {
        let shuffleBtnClass = e.target.classList
        shuffleBtnClass.toggle("active")
        shuffle = shuffleBtnClass.contains("active")
        localStorage.setItem('shuffle', shuffle)
        !shuffle && (index = randomsNumber[index])
        if (shuffle) {
            createRandomNumberList()
            index = randomsNumber.indexOf(index)
        }
    })

    //shuffle Btn

    //repeat Btn

    repeatBtn.addEventListener("click", function (e) {
        e.target.classList.toggle("active")
        repeat = !repeat
        localStorage.setItem("repeat", repeat)
    })

    //repeat Btn

    //set current 
    function timeUp(event) {

        if (!flag) {
            currentTime = event.target.currentTime
            setProgress(currentTime)
            changeVolume && (music.volume = convertProgressToTime(currentVolume, durationVolume, 1))
            changeVolume = false
        }
    }

    music.addEventListener("timeupdate", timeUp)

    //set current 

    //set proggress bar

    function setProgress(time) {
        musicCurrent.innerHTML = setTime(currentTime)
        progressCurrent.style.width = ((currentTime / duration) * 100) + "%"
    }
    //set proggress bar


    //set progress to time
    function convertProgressToTime(cur, dur, durationProgses) {
        let currenStyle = parseFloat(getComputedStyle(cur).width)
        let durationStyle = parseFloat(getComputedStyle(dur).width)
        return (currenStyle / durationStyle) * durationProgses
    }
    progressCurrent.style.width = "0"
    function leftOfset(event) {

        if (flag) {
            event.target.className == "progressduration" && (event.target.firstElementChild.style.width = event.offsetX + "px")
            event.target.className == "progresscurrent" && (event.target.style.width = event.offsetX + "px")
            let p = parseFloat(getComputedStyle(progressDuration).width)
            let ch = parseFloat(getComputedStyle(progressCurrent).width)
            ch >= p && (progressCurrent.style.width = p + "px")
            musicCurrent.innerHTML = setTime(convertProgressToTime(progressCurrent, progressDuration, duration))
        }
    }
    function mouseUpLeave() {
        flag && (music.currentTime = convertProgressToTime(progressCurrent, progressDuration, duration))
        flag && playMusic()
        flag = false
    }
    progressDuration.addEventListener("mousemove", leftOfset);
    progressDuration.addEventListener("mousedown", function () {
        progressDuration.addEventListener("mouseup", mouseUpLeave)
        progressDuration.addEventListener("mouseleave", mouseUpLeave)
        flag = true
    })
    progressDuration.addEventListener("click", function (e) {
        flag = true
        leftOfset(e)
        music.currentTime = convertProgressToTime(progressCurrent, progressDuration, duration)
        playMusic()
        flag = false
    })
    progressDuration.addEventListener("mouseenter", function () {
        progressDuration.removeEventListener("mouseup", mouseUpLeave)
        progressDuration.removeEventListener("mouseleave", mouseUpLeave)
        flag = false
    })

    //set progress to time

    // set volume and volume progress
    let firstVolume = parseFloat(getComputedStyle(currentVolume).width) / parseFloat(getComputedStyle(durationVolume).width)
    volumeP.innerHTML = Math.round(firstVolume * 100) + "%"

    function leftOfsetV(event) {
        event.target.className == "progressdurationV" && (event.target.firstElementChild.style.width = event.offsetX + "px")
        event.target.className == "progresscurrentV" && (event.target.style.width = event.offsetX + "px")
        let p = parseFloat(getComputedStyle(durationVolume).width)
        let ch = parseFloat(getComputedStyle(currentVolume).width)
        ch >= p && (durationVolume.style.width = p + "px")
        let persent = Math.round(convertProgressToTime(currentVolume, durationVolume, 100))
        persent < 10 && (persent = "0" + persent)
        volumeP.innerHTML = persent + "%"
        changeVolume = true
    }
    durationVolume.addEventListener("mousedown", function () {
        durationVolume.addEventListener("mousemove", leftOfsetV)
    })
    durationVolume.addEventListener("mouseup", function () {
        durationVolume.removeEventListener("mousemove", leftOfsetV)
    })
    durationVolume.addEventListener("mouseleave", function () {
        durationVolume.removeEventListener("mousemove", leftOfsetV)
    })
    durationVolume.addEventListener("click", leftOfsetV)
    // set volume and volume progress

    //load And Play

    function loadAndPlay(indexLoad) {
        loadMusic(indexLoad)
        playMusic()
    }

    //load And Play

    // next btn

    function nextMusic() {
        index = ++index
        index == myMusics.length && (index = 0)
        shuffle ? (indexLoad = randomsNumber[index]) : (indexLoad = index)
        loadAndPlay(indexLoad)
    }

    // next btn


    // perv btn

    function prevMusic() {
        index = --index
        index == -1 && (index = myMusics.length - 1)
        shuffle ? (indexLoad = randomsNumber[index]) : (indexLoad = index)
        loadAndPlay(indexLoad)
    }

    // perv btn


    // set next or prev btn

    nextOrPervBtn.forEach(element => {
        element.classList.contains("back") ? element.addEventListener("click", prevMusic) : element.addEventListener("click", nextMusic);
    });

    // set next or prev btn

    //next music when music ended

    music.addEventListener("ended", function () {
        repeat ? loadAndPlay(indexLoad) : nextMusic()
    })

    //next music when music ended

    //get data-numbe of element
    function elementData(element) {
        return +element.dataset.number
    }
    //get data-numbe of element


    //cheak bi-heart

    function isHeart(element) {
        return element.classList.contains("bi-heart")
    }

    //cheak bi-heart


    //set ckick on likemain

    likeMusic.addEventListener("click", function (e) {
        let iToChange = myMusicsUl.querySelector(`[data-number="${indexLoad}"]`).querySelector("i")
        isHeart(e.target) ? heart(iToChange) : heartFill(iToChange)

    })

    //set ckick on likemain

    //change heart to heart-fill or heart-fill to heart

    function changelike(element) {
        let myClassCh = element.classList
        isHeart(element) ? myClassCh.replace("bi-heart", "bi-heart-fill") : myClassCh.replace("bi-heart-fill", "bi-heart")
    }

    //change heart to heart-fill or heart-fill to heart


    //heart function
    function heart(element) {

        let indexOfLi = elementData(element.parentElement.parentElement.parentElement)
        changelike(element)
        indexOfLi == indexLoad && changelike(likeMusic)
        myMusics[indexOfLi].like = true
        localStorage.setItem("musics", JSON.stringify(myMusics))
        insetToFavUl(indexOfLi)
    }
    //heart function

    //heart-fill function 

    function heartFill(element) {

        let indexOfLi = elementData(element.parentElement.parentElement.parentElement)
        changelike(element)
        indexOfLi == indexLoad && changelike(likeMusic)
        myMusics[indexOfLi].like = false
        localStorage.setItem("musics", JSON.stringify(myMusics))
        removeFromFavUl(indexOfLi)

    }
    //heart-fill function

    //remove from favorite ul

    function removeFromFavUl(liNumber) {
        myfavoritUl.querySelector(`[data-number="${liNumber}"]`).remove()
    }

    //remove from  favorite ul



    //insert to favorite ul



    function insetToFavUl(liNumber) {

        let selectedLi = myLis[liNumber].cloneNode(true)
        let beforeLi = myfavoritUl.querySelector(`[data-number="${--liNumber}"]`)
        while (!beforeLi && (liNumber >= 0)) {
            beforeLi = myfavoritUl.querySelector(`[data-number="${--liNumber}"]`)

        }
        beforeLi ? beforeLi.insertAdjacentElement("afterend", selectedLi) : myfavoritUl.firstElementChild.insertAdjacentElement("afterend", selectedLi)

    }

    //insert to favorite ul



    // set event click for likeBtns
    function heartIcon(event) {
        event.stopPropagation()
        isHeart(event.target) ? heart(event.target) : heartFill(event.target)
    }
    // set event click for likeBtn

    // change activeli from prev to next

    function changeActiveLiToNext() {

        let prev = $.querySelectorAll(".activeli")
        prev.forEach(element => {
            element.classList.remove("activeli")
            element.querySelector("span").innerText = musicDuration.innerText
        })
        let myNew = $.querySelectorAll(`[data-number="${indexLoad}"]`)
        myNew.forEach(element => {
            element.classList.add("activeli")
            element.querySelector("span").innerText = "playing..."
        })
    }

    // change activeli from prev to next

    function liHandle(element) {
        indexLoad = elementData(element)
        shuffle ? (index = randomsNumber.indexOf(indexLoad)) : (index = indexLoad)
        loadAndPlay(indexLoad)

    }

    //create list of musics
    let sampleIndex = 0
    sampleAudio.src = `music/${myMusics[sampleIndex].src}.mp3`
    sampleAudio.addEventListener("loadeddata", function (e) {
        let myLi = `<li onclick="liHandle(this)" data-number="${sampleIndex}">
                    <div>
                        <img src="img/${myMusics[sampleIndex].src}.jpg" alt="">
                    </div>
                    <div>
                        <h3>${myMusics[sampleIndex].name}
                            <span>${setTime(e.target.duration)}</span>
                        </h3>
                        <h4>${myMusics[sampleIndex].songer}
                            <i onclick="heartIcon(event)" class="like bi ${myMusics[sampleIndex].like ? `bi-heart-fill` : `bi-heart`}"></i>
                        </h4>
                    </div>
                </li>`
        myMusicsUl.innerHTML += myLi
        myMusics[sampleIndex].like && (myfavoritUl.innerHTML += myLi)
        sampleIndex == myMusics.length - 1 && (myLis = myMusicsUl.querySelectorAll("[data-number]"))
        sampleIndex == changeActiveLiToNext()
        sampleIndex != myMusics.length - 1 && (sampleAudio.src = `music/${myMusics[++sampleIndex].src}.mp3`)
    })


    //create list of musics
