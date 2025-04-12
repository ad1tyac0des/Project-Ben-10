const { animate, svg, createTimeline, stagger } = anime;

function setupPreloaderAnimations() {
    const tl = createTimeline({
        delay: 1000,
    });

    tl.add(
        "#side-vector-1",
        {
            translateX: [-200, 0],
            opacity: [0, 1],
            duration: 500,
            ease: "inOutQuad",
        },
        0
    )
        .add(
            "#side-vector-2",
            {
                translateX: [200, 0],
                rotate: [180, 180],
                opacity: [0, 1],
                duration: 500,
                ease: "inOutQuad",
            },
            "<<"
        )
        .add(
            svg.createDrawable("#side-vector-2 path"),
            {
                draw: ["0 0", "0.2 0.4", "0.4 0.8", "0 1"],
                duration: 1500,
                ease: "cubicBezier(0.25, 0.1, 0.25, 1)",
            },
            "<<+=100"
        )
        .add(
            svg.createDrawable("#side-vector-1 path"),
            {
                draw: ["0 0", "0.2 0.4", "0.4 0.8", "0 1"],
                duration: 1500,
                ease: "cubicBezier(0.25, 0.1, 0.25, 1)",
            },
            "<<+=100"
        )
        .add(
            "#omnitrix-logo",
            {
                opacity: [0, 1],
                rotate: [0, 180],
                duration: 1000,
                ease: "inOutSine",
            },
            "<<+=150"
        )
        .add(
            [
                svg.createDrawable("#main-vector-1 path"),
                svg.createDrawable("#main-vector-2 path"),
            ],
            {
                draw: ["0 0", "0 1"],
                duration: 1000,
                ease: "inOutQuad",
            }
        )
        .add(
            [
                svg.createDrawable("#main-vector-filling-1 path"),
                svg.createDrawable("#main-vector-filling-2 path"),
            ],
            {
                draw: ["0 0", "0 1"],
                duration: 1000,
                ease: "inOutSine",
            }
        )
        .label("load-complete")
        .call(() => {
            tl.pause();
            animate("#info-text-container", {
                y: [10, 0],
                opacity: [0, 1],
                duration: 400,
                ease: "inOutSine",
            });
        })
        .add("#main-vector-container-1", {
            x: ["0", "-100vw"],
            opacity: [1, 0],
            duration: 2500,
            ease: "inOutSine",
        })
        .add(
            "#main-vector-container-2",
            {
                x: ["0", "100vw"],
                opacity: [1, 0],
                duration: 2500,
                ease: "inOutSine",
            },
            "<<"
        )
        .add(
            "#side-vector-1",
            {
                translateX: [0, -200],
                opacity: [1, 0],
                duration: 500,
                ease: "inOutSine",
            },
            "<<"
        )
        .add(
            "#side-vector-2",
            {
                translateX: [0, 200],
                opacity: [1, 0],
                duration: 500,
                ease: "inOutSine",
            },
            "<<"
        )
        .add(
            "#omnitrix-logo",
            {
                translateX: [0, -200],
                opacity: [1, 0],
                duration: 500,
                ease: "inOutSine",
            },
            "<<"
        )
        .add(
            "#info-text-container",
            {
                y: [0, 10],
                opacity: [1, 0],
                duration: 400,
                ease: "inOutSine",
            },
            "<<"
        )
        .add(
            "#intro-video",
            {
                opacity: [0, 1],
                duration: 1000,
                ease: "inOutSine",
                onComplete: () => {
                    const introVideo = document.getElementById("intro-video");
                    introVideo.play();
                    introVideo.muted = false;
                },
            },
            "<<+=800"
        )
        .label("intro-video-start")
        .add(
            "#skip-intro",
            {
                display: "block",
                opacity: [0, 1],
                duration: 500,
                ease: "inOutSine",
            },
            "<<"
        )
        .add(
            svg.createDrawable("#skip-intro svg path"),
            {
                draw: ["0 0", "0 1"],
                duration: 1200,
                ease: "inOutSine",
            },
            "<<+=2000"
        )
        .add(
            "#intro-video",
            {
                opacity: [1, 0],
                duration: 1000,
                delay: 24500,
                ease: "inOutSine",
            },
            "<<"
        )
        .label("intro-video-end")
        .add(
            svg.createDrawable("#skip-intro svg path"),
            {
                draw: ["0 1", "0 0"],
                duration: 1200,
                ease: "inOutSine",
            },
            "<<-=4000"
        )
        .add(
            "#preloader",
            {
                opacity: [1, 0],
                duration: 1000,
                ease: "inOutSine",
            },
            "<+=3500"
        )
        .add(
            "#preloader",
            {
                display: ["block", "none"],
                duration: 500,
            },
            "<"
        )
        .add(
            "main",
            {
                display: "block",
                duration: 500,
            },
            "<"
        )
        .add(
            "main",
            {
                opacity: [0, 1],
                duration: 1000,
                ease: "inOutSine",
            },
            "<-=500"
        );

    // after load complete, resume timeline on click or press space/enter button
    document.addEventListener("click", () => tl.paused && tl.resume());

    document.addEventListener("keydown", (e) => {
        if (tl.paused && (e.code === "Space" || e.code === "Enter")) tl.resume();
        if (e.code === "Space") {
            animate("#info-text-container span", {
                backgroundColor: ["#000", "#fff"],
                color: ["#fff", "#000"],
                duration: 10,
                ease: "linear",
            });
        }
    });

    if (window.innerWidth <= 768) {
        document.querySelector("#info-text").innerHTML = "Click to Enter";
    }

    setupSkipIntroInteractions(tl);
    // return tl;
}

function setupSkipIntroInteractions(tl) {
    const skipIntroBtn = document.querySelector("#skip-intro");

    // skip intro button hover animation
    skipIntroBtn.addEventListener("mouseenter", () => {
        animate(svg.createDrawable("#skip-intro svg path"), {
            draw: ["0 0", "0 1"],
            duration: 2000,
            ease: "inOutSine",
        });
    });

    // skips intro video and jumps to end
    function skipIntro() {
        const introVideo = document.getElementById("intro-video");
        introVideo.pause();
        introVideo.style.opacity = 0;

        const introVideoEndPosition = tl.labels["intro-video-end"];
        tl.seek(introVideoEndPosition);
    }

    // call skipIntro function on clicking skip button
    skipIntroBtn.addEventListener("click", () => skipIntro());

    // call skipIntro function on pressing space button
    document.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
            const introVideoStartPosition = tl.labels["intro-video-start"];
            // make sure we r on intro video page
            if (tl.currentTime > introVideoStartPosition) skipIntro();
        }
    });
}

// setupPreloaderAnimations();

function setupHamburgerMenu() {
    const hamburger = document.querySelector("#hamburger-menu");
    const lineGap = window.getComputedStyle(hamburger).getPropertyValue("gap");
    let isOpen = false;

    //hamburger menu animation
    function toggleHamburgerMenuAnimation() {
        const tl = createTimeline();

        tl.add("#hamburger-line-1", {
            width: ["100%", "0%"],
            duration: 400,
            ease: "linear",
        })
            .add(
                "#hamburger-line-2",
                {
                    width: ["100%", "0%"],
                    duration: 400,
                    ease: "linear",
                },
                "<<"
            )
            .add(
                hamburger,
                {
                    gap: isOpen ? ["0px", lineGap] : [lineGap, "0px"],
                    duration: 10,
                    ease: "linear",
                },
                "<+=200"
            )
            .add(
                "#hamburger-line-1-container",
                {
                    rotate: isOpen ? 0 : 45,
                    duration: 10,
                    ease: "linear",
                },
                "<<"
            )
            .add(
                "#hamburger-line-2-container",
                {
                    rotate: isOpen ? 0 : -45,
                    duration: 10,
                    ease: "linear",
                },
                "<<"
            )
            .add(
                "#hamburger-line-1",
                {
                    width: ["0%", "100%"],
                    duration: 400,
                    ease: "linear",
                },
                "<"
            )
            .add(
                "#hamburger-line-2",
                {
                    width: ["0%", "100%"],
                    duration: 400,
                    ease: "linear",
                },
                "<<"
            );

        isOpen = !isOpen;
    }

    // toggle hamburger menu animation on click
    hamburger.addEventListener("click", () => {
        toggleHamburgerMenuAnimation();
    });
}
setupHamburgerMenu();

function setupAudioButton() {
    let isAudioPlaying = false;
    let isIndicatorActive = false;
    let clickCount = 1;
    let fadeIntervalRef = null;

    const audioButton = document.getElementById("audio-button");
    const audioElement = document.getElementById("audio-element");
    const indicatorLines = document.querySelectorAll(".indicator-line");

    // Main Function which plays the line animation and calls all the audio play/pause functions
    function toggleAudioIndicator() {
        isAudioPlaying = !isAudioPlaying;
        isIndicatorActive = !isIndicatorActive;

        // Indicator lines animation
        indicatorLines.forEach((line) => {
            if (isIndicatorActive) {
                line.classList.add("active");
            } else {
                line.classList.remove("active");
            }
        });

        // Play or pause audio with fade in/out
        if (isAudioPlaying) {
            fadeInAudio();
        } else {
            fadeOutAudio();
        }
    }

    // Fade in audio function(plays the audio)
    function fadeInAudio() {
        if (!audioElement) return;

        // [safety check] Clear existing fade interval (if any)
        if (fadeIntervalRef) {
            clearInterval(fadeIntervalRef);
        }

        // Play the audio(ensure volume is set to 0 first)
        audioElement.volume = 0;
        audioElement.play();

        fadeIntervalRef = setInterval(() => {
            if (audioElement.volume < 0.99) {
                audioElement.volume = Math.min(audioElement.volume + 0.1, 1);
            } else {
                audioElement.volume = 1;
                // After volume reached its max, stop the fadeInterval
                clearInterval(fadeIntervalRef);
                fadeIntervalRef = null;
            }
        }, 100);
    }

    // Fade out audio function(pauses the audio)
    function fadeOutAudio() {
        if (!audioElement) return;

        if (fadeIntervalRef) {
            clearInterval(fadeIntervalRef);
        }

        fadeIntervalRef = setInterval(() => {
            if (audioElement.volume > 0.01) {
                audioElement.volume = Math.max(audioElement.volume - 0.1, 0);
            } else {
                // Pause the audio(ensure volume is set to 0 first)
                audioElement.volume = 0;
                audioElement.pause();
                // After audio is paused, stop the fadeInterval
                clearInterval(fadeIntervalRef);
                fadeIntervalRef = null;
            }
        }, 100);
    }

    // Play audio on first click(anywhere on the page)
    document.addEventListener("click", (e) => {
        if (e.target.id !== "audio-button" && clickCount === 1) {
            isAudioPlaying = true;
            isIndicatorActive = true;

            indicatorLines.forEach((line) => {
                line.classList.add("active");
            });

            fadeInAudio();
        }
        clickCount++;
    });

    // Play or pause audio on clicking audio btn
    audioButton.addEventListener("click", (e) => {
        e.stopPropagation(); // prevent document click from firing
        toggleAudioIndicator();
    });
}
setupAudioButton();

function enterFullScreen() {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { // Safari
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
        elem.msRequestFullscreen();
    }
}

function setupHeroSectionImages() {
    const heroImage1 = document.querySelector("#hero-image-1");
    const heroImage2 = document.querySelector("#hero-image-2");
    const heroImage3 = document.querySelector("#hero-image-3");

    let viewportHeight = window.innerHeight;
    let viewportWidth = window.innerWidth;

    window.addEventListener("resize", (e) => {
        viewportHeight = e.target.innerHeight;
        viewportWidth = e.target.innerWidth;
    });

    if (viewportHeight > 800) {
        heroImage1.classList.replace("w-56", "w-60");
        heroImage2.classList.replace("w-[19.5rem]", "w-[22rem]");
        heroImage3.classList.replace("w-[10.75rem]", "w-[11.5rem]");
        // heroImage1.classList.add("bg-red-500");
    }

    if (viewportWidth < 768) {
        if (viewportHeight < 750) {
            heroImage1.classList.replace("mb-16", "mb-0");
            heroImage2.classList.replace("mb-16", "mb-0");
            heroImage3.classList.replace("mb-16", "mb-0");
        }
    }
}

setupHeroSectionImages();
