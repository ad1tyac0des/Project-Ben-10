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
            "<<="
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
    const hamburgerMenuContainer = document.querySelector("#hamburger-menu-container");
    const hamburgerPanelContainer = document.querySelector("#hamburger-panel-container");
    const hamburger = document.querySelector("#hamburger-menu");
    const hamburgerPanelLinks = document.querySelectorAll("#hamburger-panel-links a");

    const lineGap = window.getComputedStyle(hamburger).getPropertyValue("gap");
    let isOpen = false;

    function toggleBodyScroll() {
        if (isOpen) {
            // Enable scrolling
            document.body.style.overflow = '';
            document.body.style.height = '';
        } else {
            // Disable scrolling
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100vh';
        }
    }

    //hamburger menu animation
    function toggleHamburgerMenuAnimation() {
        const tl = createTimeline();

        toggleBodyScroll();

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
            ).add(
                hamburgerPanelContainer,
                {
                    translateX: isOpen ? ["0%", "100%"] : ["100%", "0%"],
                    duration: 500,
                    ease: "inOutSine",
                },
                "<<"
            ).add(
                ["#hamburger-line-1", "#hamburger-line-2"],
                {
                    backgroundColor: isOpen ? ["#000", "#fff"] : ["#fff", "#000"],
                    duration: 500,
                    ease: "inOutSine",
                },
                "<<-=500"
            ).add(
                ".indicator-line",
                {
                    backgroundColor: isOpen ? ["#000", "#fff"] : ["#fff", "#000"],
                    duration: 500,
                    ease: "inOutSine",
                },
                "<<"
            ).add(
                "#hamburger-panel-links a",
                {
                    x: isOpen ? ["0", "100"] : ["100", "0"],
                    opacity: isOpen ? ["1", "0"] : ["0", "1"],
                    duration: 400,
                    delay: stagger(30),
                    ease: "inOutSine",
                },
                "<<"
            ).add(
                "#hamburger-panel-sign-in-button",
                {
                    opacity: isOpen ? ["1", "0"] : ["0", "1"],
                    duration: 400,
                    ease: "inOutSine",
                },
                "<<"
            );

        isOpen = !isOpen;
    }

    // toggle hamburger menu animation on clicking any link
    hamburgerPanelLinks.forEach(link => {
        link.addEventListener("click", () => {
            toggleHamburgerMenuAnimation();
        })
    });

    // toggle hamburger menu animation on clicking close button
    hamburgerMenuContainer.addEventListener("click", () => {
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

function setupParallaxEffect() {
    const heroImage1 = document.querySelector("#hero-image-1");
    const heroImage2 = document.querySelector("#hero-image-2");
    const heroImage3 = document.querySelector("#hero-image-3");
    const heroBg = document.querySelector("#hero-bg-container img");

    // Get initial transforms
    const getInitialTransform = element => {
        const style = window.getComputedStyle(element);
        return style.transform !== 'none' ? style.transform : '';
    };

    // Store initial transforms
    const initialTransforms = {
        heroImage1: getInitialTransform(heroImage1),
        heroImage2: getInitialTransform(heroImage2),
        heroImage3: getInitialTransform(heroImage3),
        heroBg: getInitialTransform(heroBg)
    };

    // Setup parallax elements
    const parallaxElements = [
        { element: heroImage1, factor: 0.015, mobileFactor: 0.55, transform: initialTransforms.heroImage1 },
        { element: heroImage2, factor: 0.01, mobileFactor: 0.48, transform: initialTransforms.heroImage2 },
        { element: heroImage3, factor: 0.02, mobileFactor: 0.42, transform: initialTransforms.heroImage3 },
        { element: heroBg, factor: 0.03, mobileFactor: 0.45, transform: initialTransforms.heroBg }
    ];

    let isMobile = window.innerWidth < 768;

    // Apply appropriate 'transition' class to elements
    function updateTransitionClasses() {
        parallaxElements.forEach(({ element }) => {
            element.classList.remove("desktop-transition", "mobile-transition");
            element.classList.add(isMobile ? "mobile-transition" : "desktop-transition");
        });
    }

    // Move element based on cursor/tilt position
    function moveElement(element, x, y, baseTransform) {
        element.style.transform = `${baseTransform} translate3d(${x}px, ${y}px, 0)`;
    }

    // Handle mouse movement on desktop
    function handleMouseMove(event) {
        if (isMobile) return;

        const mouseX = event.clientX - window.innerWidth / 2;
        const mouseY = event.clientY - window.innerHeight / 2;

        parallaxElements.forEach(({ element, factor, transform }) => {
            moveElement(element, mouseX * factor, mouseY * factor, transform);
        });
    }

    // Handle device tilt on mobile
    function handleDeviceTilt(event) {
        if (!isMobile || !event.beta || !event.gamma) return;

        // Limit tilt values
        const tiltY = Math.min(Math.max(event.beta, -45), 45);
        const tiltX = Math.min(Math.max(event.gamma, -45), 45);

        parallaxElements.forEach(({ element, mobileFactor, transform }) => {
            moveElement(element, tiltX * mobileFactor, tiltY * mobileFactor, transform);
        });
    }

    // Request permission for device orientation on iOS
    function requestTiltPermission() {
        if (typeof DeviceOrientationEvent !== 'undefined' &&
            typeof DeviceOrientationEvent.requestPermission === 'function') {

            DeviceOrientationEvent.requestPermission()
                .then(response => {
                    if (response === 'granted') {
                        window.addEventListener('deviceorientation', handleDeviceTilt);
                    }
                })
                .catch(console.error);
        } else {
            window.addEventListener('deviceorientation', handleDeviceTilt);
        }
    }

    // Initialize event listeners
    window.addEventListener('mousemove', handleMouseMove);

    // Handle mobile initialization
    if (isMobile) {
        document.addEventListener('touchstart', function initTilt() {
            requestTiltPermission();
            document.removeEventListener('touchstart', initTilt);
        }, { once: true });
    }

    // Update on window resize
    window.addEventListener('resize', () => {
        isMobile = window.innerWidth < 768;
        updateTransitionClasses();
    });

    // Set initial states
    updateTransitionClasses();
}

setupHeroSectionImages();

setupParallaxEffect();


function setupSeries() {
    const seriesData = [
        {
            header: "Classic",
            para: "10-year-old Ben Tennyson finds the Omnitrix, a device that transforms him into powerful aliens. Alongside Gwen and Grandpa Max, he battles villains and uncovers the watch’s secrets on a summer road trip.",
            sequels: "2005-2008",
            season: '4',
            episodes: '52',
            stars: "4",
            visit: '11',
            seriesImgUrl: "assets/images/series_images/classic_banner.jpg"
        },
        {
            header: "ALIEN FORCE",
            para: "Five years later, a now-teenaged Ben reunites with Gwen and former foe Kevin to fight the Highbreed, an alien race plotting Earth’s destruction. Leading a team, Ben wields the Omnitrix to stop invasions, uncover conspiracies, and grow into a more responsible hero.",
            sequels: "2008-2010",
            season: '3',
            episodes: '46',
            stars: "6",
            visit: '15',
            seriesImgUrl: "assets/images/series_images/af_banner.webp"
        },
        {
            header: "ULTIMATE ALIEN ",
            para: "Ben, now 16, gains the Ultimatrix, an evolved Omnitrix that lets him upgrade his aliens into ultimate forms. Facing powerful enemies like Aggregor and a fame-hungry public, he navigates new challenges, balancing heroism with the pressures of his exposed identity.",
            sequels: "2010-2012",
            season: '3',
            episodes: '52',
            stars: "10",
            visit: '14',
            seriesImgUrl: "assets/images/series_images/ua_banner.webp"
        },
        {
            header: "OMNIVERSE",
            para: "Ben, partnered with rookie alien Plumber Rook, explores a multiverse of alien worlds and timelines. With a redesigned Omnitrix, he battles foes like Khyber and Malware, blending humor, teamwork, and wild adventures across dimensions.",
            sequels: "2012-2014",
            season: '8',
            episodes: '80',
            stars: "7",
            visit: '8',
            seriesImgUrl: "assets/images/series_images/ov_banner.jpg"
        },
    ]
    
    const seriesContainer = document.getElementById('series-container');
    
    seriesContainer.innerHTML = seriesData.map((item, index) => {
        return (
            `
            <div class="series-card flex justify-start  ${index % 2 === 0 ? 'justify-start' : 'justify-end'}">
                        <div 
                            class="series w-full xl:w-[80%] min-h-[600px] md:min-h-[400px] bg-[#151515] p-2 sm:p-4 xl:p-8 flex flex-col md:flex-row gap-8 md:gap-10 xl:gap-20 border border-zinc-600 ">
    
                            <div class="series-thumbnail w-full h-[300px] md:w-[40%] md:h-[59vh] xl:h-[80vh] overflow-hidden">
                                <img src="${item.seriesImgUrl}" class="w-full h-full object-cover"
                                    alt="">
                            </div>
    
                            <div class="series-info w-full  md:w-[60%]   flex flex-col  justify-between ">
                                <div class="series-info-top  w-full h-[40%] flex flex-col gap-14">
                                    <div class="series-info-top-part1 flex flex-col gap-8">
                                        <div class="series-header flex justify-between items-center ">
                                            <h1
                                                class="uppercase font-[jetbrains-mono] font-light text-2xl md:text-3xl xl:text-4xl text-white lead">
                                                ${item.header}
                                            </h1>
                                            <div class="flex items-center gap-2">
                                                <p
                                                    class="w-16 md:w-20 text-center py-[.15rem] text-sm sm:text-base md:text-lg text-white bg-[#2D2D2D] font-[lexend] font-light cursor-pointer">
                                                     ${item.visit}M <i class="ri-eye-line"></i></p>
                                                <p
                                                    class="w-16 md:w-20 text-center py-[.15rem] text-sm sm:text-base md:text-lg text-white bg-[#2D2D2D] font-[lexend] font-light cursor-pointer">
                                                    ${item.stars}M<i class="ri-star-fill text-yellow-400"></i></p>
                                            </div>
                                        </div>
                                        <div class="series-para w-[97%] md:w-[80%]">
                                            <p
                                                class="font-[ibm-plex-mono-400] text-base md:text-lg xl:text-xl leading-5 md:leading-[1.30rem] xl:leading-6 text-[#7F7D7D]">
                                            ${item.para}</p>
                                        </div>
                                    </div>
                                    <div class="series-info-top-part2 flex gap-16">
                                        <div class="leading-loose flex flex-col gap-2">
                                            <h1 class="font-[inter] text-base md:text-lg text-white font-light">SEQUELS</h1>
                                            <h1 class="font-[inter] text-base md:text-lg text-white font-light">SEASONS
                                            </h1>
                                            <h1 class="font-[inter] text-base md:text-lg text-white font-light">EPISODES
                                            </h1>
    
                                        </div>
                                        <div class="leading-loose flex flex-col gap-2">
                                            <p class="font-[lexend] text-base md:text-base text-white font-light ">${item.sequels}
                                            </p>
                                            <p class="font-[lexend] text-base md:text-base text-white font-light ">${item.season}</p>
                                            <p class="font-[lexend] text-base md:text-base text-white font-light ">${item.episodes}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="series-info-bottom  w-full flex  justify-between items-center mt-8 md:mt-0 ">
                                    <div id="rate-now-button"
                                        class="relative  w-[8rem] h-[2.2rem] 2xl:w-[10rem] 2xl:h-[2.5rem] 2xl:bottom-0  cursor-pointer ">
                                        <svg class="w-full h-full" viewBox="0 0 178 56" fill="none"
                                            preserveAspectRatio="none">
                                            <path d="M161 56H1V2H175V30" stroke="white" />
                                        </svg>
                                        <p
                                            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-full text-center font-[lexend] font-normal uppercase text-xs 2xl:text-sm">
                                            Rate Now <i class="ri-star-fill text-yellow-400 ml-2"></i>
    
                                        </p>
                                    </div>
    
                                    <p
                                        class="px-4 md:px-6 text-center py-[.2rem] md:py-[.3rem] text-base md:text-base text-white bg-[#2D2D2D] font-[lexend] font-light cursor-pointer">
                                        See All
                                        <i class="ri-arrow-right-line text-white mt-4"></i>
                                    </p>
    
                                </div>
                            </div>
                        </div>
                    </div>`
        )
    })
}

setupSeries();