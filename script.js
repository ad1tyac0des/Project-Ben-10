const { animate, svg, createTimeline, stagger } = anime;

function setupLenis() {
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}
setupLenis();

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

function setupSeriesAnimations() {
    document.querySelectorAll('.left-series').forEach((series) => {
        gsap.from(series, {
            opacity: 0,
            x: -30,
            duration: 0.6,
            scrollTrigger: {
                trigger: series,
                start: "top 50%",
                end: "top 30%",
                // scrub: true,
                // markers: true
            }
        });
    });

    document.querySelectorAll('.right-series').forEach((series) => {
        gsap.from(series, {
            opacity: 0,
            x: 30,
            duration: 0.6,
            delay: window.innerWidth < 768 ? 0 : 0.35,
            scrollTrigger: {
                trigger: series,
                start: "top 40%",
                end: "top 20%",
                // scrub: true,
                // markers: true
            }
        });
    });
}

function setupChronologyAnimations() {
    document.querySelectorAll('.left-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            x: -30,
            duration: 0.6,
            scrollTrigger: {
                trigger: card,
                start: "top 50%",
                end: "top 30%",
                // scrub: true,
                // markers: true
            }
        });
    });

    document.querySelectorAll('.right-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            x: 30,
            duration: 0.6,
            delay: window.innerWidth < 768 ? 0 : 0.35,
            scrollTrigger: {
                trigger: card,
                start: "top 40%",
                end: "top 20%",
                // scrub: true,
                // markers: true
            }
        });
    });

    document.querySelectorAll('.last-image').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            duration: 0.6,
            scrollTrigger: {
                trigger: card,
                start: "top 40%",
                end: "top 20%",
                // scrub: true,
                // markers: true
            }
        });
    });
}

// Header Wireframe Animation
function handleHeaderWireframeAnimations() {
    document.querySelectorAll('.header-wireframe').forEach((wireframe, index) => {
        const path = wireframe.querySelector("svg path")

        const pathLength = path.getTotalLength();

        gsap.set(path, { strokeDasharray: pathLength })

        gsap.fromTo(path, {
            strokeDashoffset: pathLength
        }, {
            strokeDashoffset: 0,
            duration: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: wireframe,
                start: "top 50%",
                end: "bottom bottom",
                // markers: true,
            }
        })
    })
}

// Section Fade Up Animation
function sectionFadeUpAnimation(element) {
    const container = document.querySelector(element);
    
    gsap.from(container, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        scrollTrigger: {
            trigger: container,
            start: "top 40%",
            end: "top 20%",
            // scrub: true,
            // markers: true
        }
    });
}

// ------------------------------------------------------------------------------------------------
// Preloader Section
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
                duration: 5000,
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
                onComplete: () => {
                    setupSeriesAnimations();
                    setupChronologyAnimations();
                    handleHeaderWireframeAnimations();
                    sectionFadeUpAnimation("#heroes-content");
                    sectionFadeUpAnimation("#main-forum-container");
                }
            },
            "<-=500"
        ).add(
            ".hero-main-texts",
            {
                opacity: [0, 1],
                y: [20, 0],
                duration: 500,
                ease: "inOutSine",
            }, 
            "<<+=100"
        ).add(
            ["#hero-image-1", "#hero-image-2", "#hero-image-3"],
            {
                opacity: [0, 1],
                y: [20, 0],
                duration: 500,
                ease: "inOutSine",
            }, 
            "<<"
        );

    // after load complete, resume timeline on click or press space/enter button
    document.addEventListener("click", () => {
        if (tl.paused) {
            tl.resume();
            
            if (window.innerWidth > 768 && window.innerHeight < 850) {
                enterFullScreen();
            }
        }
    });

    document.addEventListener("keydown", (e) => {
        if (tl.paused && (e.code === "Space" || e.code === "Enter")) {
            tl.resume();

            if (window.innerWidth > 768 && window.innerHeight < 850) {
                enterFullScreen();
            }
        }
        
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
        document.querySelector("#info-text").innerHTML = "Tap to Enter";
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
setupPreloaderAnimations();


// ------------------------------------------------------------------------------------------------
// Home Page(Hero Section)
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

function setupAudioButton() {
    let isAudioPlaying = false;
    let isIndicatorActive = false;
    let clickCount = 1;
    let fadeIntervalRef = null;
    let maxVolume = 0.45; 

    const audioButton = document.getElementById("audio-button");
    const audioElement = document.getElementById("audio-element");
    const indicatorLines = document.querySelectorAll(".indicator-line");
    const volumePiece = document.querySelector('#volume-piece');

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

        if (fadeIntervalRef) {
            clearInterval(fadeIntervalRef);
        }

        audioElement.volume = 0;
        audioElement.play();

        fadeIntervalRef = setInterval(() => {
            if (audioElement.volume < maxVolume - 0.01) {
                audioElement.volume = Math.min(audioElement.volume + 0.1, maxVolume);
            } else {
                audioElement.volume = maxVolume;
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
                audioElement.volume = 0;
                audioElement.pause();
                clearInterval(fadeIntervalRef);
                fadeIntervalRef = null;
            }
        }, 100);
    }

    // Play audio on first click(anywhere on the main section)
    document.querySelector("main").addEventListener("click", (e) => {
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
        e.stopPropagation();
        toggleAudioIndicator();
    });
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
        { element: heroBg, factor: 0.03, mobileFactor: 0.25, transform: initialTransforms.heroBg }
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

setupHamburgerMenu();
setupAudioButton();
setupHeroSectionImages();
setupParallaxEffect();


// ------------------------------------------------------------------------------------------------
// Heroes Section
const aliens_data = [
    {
        name: "Swampfire",
        abilities: [
            "Pyrokinesis",
            "Plant manipulation",
            "Regeneration",
            "Methane gas"
        ],
        species: "Methanosian",
        home_world: "Methanos",
        first_appearance: {
            series: "AF",
            episode_number: "1",
            episode_name: "Ben 10 Returns"
        },
        height: "7 feet",
        stats: {
            Strength: 70,
            Speed: 50,
            Intelligence: 50,
            Control: 85
        },
        about: "A Methanosian from Methanos, Swampfire blends fire and plant powers with a knack for regeneration.",
        url1: "assets/images/alien_images/swampfire.jpg",
        url2: "assets/images/alien_images/swampfire_af.png",
    },
    {
        name: "Heatblast",
        abilities: [
            "Pyrokinesis",
            "Fire generation",
            "Heat resistance",
            "Flight"
        ],
        species: "Pyronite",
        home_world: "Pyros",
        first_appearance: {
            series: "OS",
            episode_number: "1",
            episode_name: "And Then There Were"
        },
        height: "6 feet",
        stats: {
            Strength: 70,
            Speed: 50,
            Intelligence: 40,
            Control: 80
        },
        about: "A fiery Pyronite from the star Pyros, Heatblast wields intense flames and molten rock, capable of both destruction and flight.",
        url1: "assets/images/alien_images/heatblast.jpg",
        url2: "assets/images/alien_images/heatblast_os.png"
    },
    {
        name: "Diamondhead",
        abilities: [
            "Crystal manipulation",
            "Super durability",
            "Crystal projectiles",
            "Regeneration"
        ],
        species: "Petrosapien",
        home_world: "Petropia",
        first_appearance: {
            series: "OS",
            episode_number: "1",
            episode_name: "And Then There Were"
        },
        height: "7 feet",
        stats: {
            Strength: 85,
            Speed: 40,
            Intelligence: 50,
            Control: 90
        },
        about: "A durable Petrosapien from Petropia, Diamondhead uses crystalline strength and sharp projectiles to dominate battles.",
        url1: "assets/images/alien_images/diamondhead.jpg",
        url2: "assets/images/alien_images/Diamondhead_os.png"
    },
    {
        name: "XLR8",
        abilities: [
            "Super speed",
            "Enhanced reflexes",
            "Friction resistance",
            "Tail whip"
        ],
        species: "Kineceleran",
        home_world: "Kinet",
        first_appearance: {
            series: "OS",
            episode_number: "1",
            episode_name: "And Then There Were"
        },
        height: "6 feet",
        stats: {
            Strength: 50,
            Speed: 95,
            Intelligence: 40,
            Control: 85
        },
        about: "A lightning-fast Kineceleran from Kinet, XLR8 races through challenges with unmatched speed and agility.",
        url1: "assets/images/alien_images/xlr8.jpg",
        url2: "assets/images/alien_images/xlr8_os.png"
    },
    {
        name: "Four Arms",
        abilities: [
            "Super strength",
            "Enhanced durability",
            "Four arms for combat",
            "Shockwave generation"
        ],
        species: "Tetramand",
        home_world: "Khoros",
        first_appearance: {
            series: "OS",
            episode_number: "2",
            episode_name: "Washington"
        },
        height: "12 feet",
        stats: {
            Strength: 90,
            Speed: 40,
            Intelligence: 30,
            Control: 75
        },
        about: "A towering Tetramand from Khoros, Four Arms uses his immense strength and four fists to overpower enemies.",
        url1: "assets/images/alien_images/fourarms.jpg",
        url2: "assets/images/alien_images/fourarms_os.png"
    },
    {
        name: "Upgrade",
        abilities: [
            "Technological merging",
            "Shape-shifting",
            "Weapon enhancement",
            "Regeneration"
        ],
        species: "Galvanic Mechamorph",
        home_world: "Galvan B",
        first_appearance: {
            series: "OS",
            episode_number: "4",
            episode_name: "Permanent"
        },
        height: "6 feet",
        stats: {
            Strength: 40,
            Speed: 50,
            Intelligence: 85,
            Control: 90
        },
        about: "A versatile Galvanic Mechamorph from Galvan B, Upgrade merges with tech to enhance or reshape it.",
        url1: "assets/images/alien_images/upgrade.png",
        url2: "assets/images/alien_images/upgrade_os.webp"
    },
    {
        name: "Big Chill",
        abilities: [
            "Ice breath",
            "Flight",
            "Intangibility",
            "Cold resistance"
        ],
        species: "Necrofriggian",
        home_world: "Kylmyys",
        first_appearance: {
            series: "AF",
            episode_number: "2",
            episode_name: "Ben 10 Returns"
        },
        height: "7 feet",
        stats: {
            Strength: 50,
            Speed: 70,
            Intelligence: 50,
            Control: 80
        },
        about: "A Necrofriggian from Kylmyys, Big Chill freezes foes with icy breath and phases through obstacles.",
        url1: "assets/images/alien_images/bigchill.jpg",
        url2: "assets/images/alien_images/bigchill_af.webp"
    },
    {
        name: "Chromastone",
        abilities: [
            "Energy absorption",
            "Light generation",
            "Super strength",
            "Flight"
        ],
        species: "Crystalsapien",
        home_world: "Petropia",
        first_appearance: {
            series: "AF",
            episode_number: "5",
            episode_name: "All That"
        },
        height: "7 feet",
        stats: {
            Strength: 75,
            Speed: 50,
            Intelligence: 50,
            Control: 85
        },
        about: "A Crystalsapien from Petropia, Chromastone absorbs energy and unleashes it as powerful light.",
        url1: "assets/images/alien_images/chromastone.jpg",
        url2: "assets/images/alien_images/chromastone_af.png"
    },
    {
        name: "Feedback",
        abilities: [
            "Energy absorption",
            "Energy redirection",
            "Enhanced agility",
            "Tendril attacks"
        ],
        species: "Conductoid",
        home_world: "Teslavorr",
        first_appearance: {
            series: "OV",
            episode_number: "1",
            episode_name: "The More Things Change"
        },
        height: "6 feet",
        stats: {
            Strength: 50,
            Speed: 70,
            Intelligence: 50,
            Control: 85
        },
        about: "A Conductoid from Teslavorr, Feedback absorbs and redirects energy with tendril precision.",
        url1: "assets/images/alien_images/feedback.jpg",
        url2: "assets/images/alien_images/feedback_ov.webp"
    },
    {
        name: "Alien X",
        abilities: [
            "Omnipotence",
            "Reality manipulation",
            "Invulnerability",
            "Requires consensus of internal personalities"
        ],
        species: "Celestialsapien",
        home_world: "Forge of Creation",
        first_appearance: {
            series: "AF",
            episode_number: "13",
            episode_name: "X = Ben"
        },
        height: "7 feet",
        stats: {
            Strength: 100,
            Speed: 100,
            Intelligence: 100,
            Control: 30
        },
        about: "A Celestialsapien from the Forge of Creation, Alien X wields ultimate power, limited by internal debate.",
        url1: "assets/images/alien_images/alienX.webp",
        url2: "assets/images/alien_images/alienX_af.png"
    },
]

function updateHeroInfo(index) {
    document.getElementById("heroes-info-part1").innerHTML = `
        <div id="About">
            <h1
                class="w-fit h-fit bg-[#333333] text-[#727272] py-[.1rem] px-2 md:px-4 tracking-wider font-[inter] uppercase text-xs md:text-base">
                About</h1>
            <p class="font-[ibm-plex-mono-400] text-[#CDCDCD] text-[0.85rem] md:text-base xl:text-lg leading-tight md:leading-5 mt-5 xl:mt-8 w-[95%] h-[5rem] xl:h-[6rem] min-[1900px]:h-[4rem] md:w-[80%]">
                ${aliens_data[index].about}
            </p>
        </div>
        <div id="Abilities" >
            <h1
                class="w-fit h-fit bg-[#333333] text-[#727272] py-[.1rem] px-2 md:px-4 tracking-wider font-[inter] uppercase text-xs md:text-base">
                Abilities</h1>
            <div
                class="flex flex-wrap w-[100%] min-[500px]:w-[60%] gap-2 mt-5 h-[5.5rem]">
                ${aliens_data[index].abilities.map((ability, i) => `
                    <p class="w-fit h-fit px-2 py-1 text-white font-[jetbrains-mono] font-light text-xs lg:text-sm ${['bg-[#F4940E]', 'bg-[#67AC00]', 'bg-[#D9B800]', 'bg-[#458CCF]'][i]
        } rounded-sm">
                        ${ability}
                    </p>
                `).join('')}
            </div>
        </div>
        <div id="Stats" class="pr-3 min-[500px]:pr-[8rem] md:pr-[0]">
            <h1
                class="w-fit h-fit bg-[#333333] text-[#727272] py-[.1rem] px-2 md:px-4 tracking-wider font-[inter] uppercase text-xs md:text-base">
                Stats</h1>
            <div class="flex flex-col gap-2 mt-5">
                ${Object.entries(aliens_data[index].stats).map(([statName, value]) => `
                    <div class="w-full h-fit bg-[#282828]">
                        <div class="flex w-[${value}%] bg-[#5B5B5B] items-center gap-1 ">
                            <p class="h-fit px-1.5 bg-white text-xs md:text-sm font-[lexend] font-light py-[.1rem] xl:py-[.27rem] min-[1900px]:py-[.3rem]">
                                ${value}
                            </p>
                            <p class="font-[ibm-plex-mono-400] uppercase text-xs md:text-sm text-white">
                                ${statName}
                            </p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div id="know-more-button"
            class="relative md:absolute md:bottom-3 w-[8rem] h-[1.7rem] 2xl:w-[10rem] 2xl:h-[2.5rem] 2xl:bottom-0  cursor-pointer">
            <svg class="w-full h-full" viewBox="0 0 178 56" fill="none" preserveAspectRatio="none">
                <path d="M161 56H1V2H175V30" stroke="white" />
            </svg>
            <p
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-full text-center font-[lexend] font-normal uppercase text-xs 2xl:text-sm">
                Know More
            </p>
        </div>
`
    document.getElementById("heroes-info-part2").innerHTML = `
         <div
            class="w-full min-[500px]:w-full   border border-white bg-[#2D2D2D] pt-2 pb-2 pl-2.5">
            <h1 class="text-white uppercase font-[jetbrains-mono] font-light text-xl">
                ${aliens_data[index].name}
            </h1>
            <div class="leading-none mt-2 mb-4">
                <p class="text-[#727272] font-[ibm-plex-mono-400]">${aliens_data[index].species}</p>
                <p class="text-[#727272] font-[ibm-plex-mono-400]"><span class="font-[ibm-plex-mono-400] mt-2">${aliens_data[index].height}</p>
            </div>
            <div class="xl:flex xl:flex-row items-center gap-1 flex-wrap">
                <div class="flex">
                    <p
                        class="text-white bg-[#9A9A9A] w-fit h-fit py-[.1rem] px-2 font-[ibm-plex-mono-400] text-xs">
                ${aliens_data[index].first_appearance.series}</p>
                    <p
                        class="text-white bg-[#F4940E] w-fit h-fit py-[.1rem] px-2 font-[lexend] text-xs">
                        ${aliens_data[index].first_appearance.episode_number}</p>
                </div>
                <p
                    class="text-white bg-[#D9B800] font-[ibm-plex-mono-400] text-xs w-fit px-1 py-[.1rem] mt-2 xl:mt-0">
                    ${aliens_data[index].first_appearance.episode_name}</p>
                </p>
                <p class="leading-none mt-2 xl:mt-0 font-[ibm-plex-mono-400] w-fit py-[.24rem] px-2 bg-[#458CCF] text-white text-xs">${aliens_data[index].home_world}</p>
            </div>
        </div>
          <div
            class="hero-info-image-container bg-white  w-[30%] sm:w-[20%] h-[21vh] md:w-full md:h-full clip-shape overflow-hidden p-px">
            <div
                class="hero-info-image-label w-full h-full  bg-[#2D2D2D] flex items-center justify-center p-1 md:p-4">
                <img src="${aliens_data[index].url2}" alt="Hero Image"
                    class="w-full h-full object-contain " />
            </div>
        </div>
`
}

function setUpAliensData() {
    aliens_data.map((item, i) => {
        const selectionBtn = `<div id="hero-selection-btn-${i}" onclick="updateHeroInfo(${i})"
            class="hero-selection-btns w-20 h-20 sm:w-24 sm:h-24 md:h-32 md:w-32 xl:h-40 min-[1900px]:h-48 xl:w-40 min-[1900px]:w-48 relative bg-[#151515] p-1.5 sm:p-2.5 md:p-3 xl:p-3 min-[1900px]:p-4 shrink-0">
            <svg class="absolute top-0 left-0 max-[648px]:w-3 max-[648px]:h-3" width="21" height="21"
                viewBox="0 0 21 21" fill="none" stroke="#777" xmlns="http://www.w3.org/2000/svg">
                <line x1="1.02344" y1="20.8894" x2="1.02344" y2="1.52345" />
                <line x1="1.52344" y1="1.02344" x2="20.8894" y2="1.02344" />
                <line x1="1.52344" y1="1.5" x2="1.00003" y2="1.5" />
            </svg>
            <svg class="absolute top-0 right-0 max-[648px]:w-3 max-[648px]:h-3" width="21" height="21"
                viewBox="0 0 21 21" fill="none" stroke="#777" xmlns="http://www.w3.org/2000/svg">
                <line x1="0.109375" y1="1.02344" x2="19.4753" y2="1.02344" />
                <line x1="19.9727" y1="1.52344" x2="19.9727" y2="20.8894" />
                <line x1="19.5" y1="1.52344" x2="19.5" y2="1.00003" />
            </svg>
            <svg class="absolute bottom-0 left-0 max-[648px]:w-3 max-[648px]:h-3" width="21" height="21"
                viewBox="0 0 21 21" fill="none" stroke="#777" xmlns="http://www.w3.org/2000/svg">
                <line x1="20.8906" y1="19.9766" x2="1.52467" y2="19.9766" />
                <line x1="1.02734" y1="19.4766" x2="1.02734" y2="0.110605" />
                <line x1="1.5" y1="19.4766" x2="1.5" y2="20" />
            </svg>
            <svg class="absolute bottom-0 right-0 max-[648px]:w-3 max-[648px]:h-3" width="21" height="21"
                viewBox="0 0 21 21" fill="none" stroke="#777" xmlns="http://www.w3.org/2000/svg">
                <line x1="19.9766" y1="0.110596" x2="19.9766" y2="19.4766" />
                <line x1="19.4766" y1="19.9766" x2="0.110605" y2="19.9766" />
                <line x1="19.4766" y1="19.5" x2="20" y2="19.5" />
            </svg>
            <div class="w-full h-full">
                <img src="${aliens_data[i].url1}" class="w-full h-full object-cover" alt="">
            </div>
        </div>`

        document.getElementById("heroes-images").innerHTML += selectionBtn
    })

    updateHeroInfo(0)
}
setUpAliensData()

function handleHeroSelectionBtns() {
    document.querySelectorAll('.hero-selection-btns').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.hero-selection-btns svg').forEach(svg => {
                svg.style.stroke = "#777";
            });
    
            const btnElement = document.getElementById(btn.id);
            const svgs = btnElement.querySelectorAll("svg")
            svgs.forEach(svg => {
                svg.style.stroke = "white"
            })
    
            const audio = new Audio("assets/audio/hero_selected.mp3");
            audio.play();
        })
    })
}

handleHeroSelectionBtns()

// ------------------------------------------------------------------------------------------------
// Series Section
function setupSeriesSection() {
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
            <div class="series-card flex ${index % 2 === 0 ? 'justify-start left-series' : 'justify-end right-series'}">
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
                                    <div id="rate-now-button-${index}"
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

setupSeriesSection();

// ------------------------------------------------------------------------------------------------
// Forum Section
function handleForumToggles() {
    const categoriesHeader = document.getElementById('categories-header');
    const categoriesArrow = document.getElementById('categories-arrow');
    const categoriesContent = document.getElementById('categories-content');

    if (categoriesHeader && categoriesContent && categoriesArrow) {
        categoriesHeader.addEventListener('click', function () {
            if (window.innerWidth < 768) {
                categoriesContent.classList.toggle('hidden');
                categoriesArrow.style.transform = categoriesContent.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        });
    }

    // Toggle Stats on Mobile
    const statsHeader = document.getElementById('stats-header');
    const statsArrow = document.getElementById('stats-arrow');
    const statsContent = document.getElementById('stats-content');

    if (statsHeader && statsContent && statsArrow) {
        statsHeader.addEventListener('click', function () {
            if (window.innerWidth < 768) {
                statsContent.classList.toggle('hidden');
                statsArrow.style.transform = statsContent.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        });
    }

    // Ensure content is visible on desktop regardless of toggle state
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768) {
            const allCategoryContents = document.querySelectorAll('.category-content');
            allCategoryContents.forEach(content => {
                content.classList.remove('hidden');
            });
        }
    });
}

handleForumToggles();

// ------------------------------------------------------------------------------------------------
//Footer Text Animation
function handleFooterTextAnimation() {
    const textEl = document.getElementById('textElement');
    const footerSection = document.getElementById('footer-section');

    function handleMouseMove(e) {
        const { width, left } = footerSection.getBoundingClientRect();
        const centerX = width / 2;

        const mouseX = e.clientX - left;
        const relativeX = (mouseX - centerX) / centerX;

        let matrix;

        if (Math.abs(relativeX) < 0.1) {
            // at Center
            matrix = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)";
        } else if (relativeX > 0) {
            // at Right
            const intensity = Math.min(Math.abs(relativeX), 1);
            matrix = `matrix3d(
        ${0.912144 + (1 - 0.912144) * (1 - intensity)}, 
        ${-0.221361 * intensity}, 
        0, 
        ${0.0011759 * intensity}, 
        ${0.266799 * intensity}, 
        ${0.327775 + (1 - 0.327775) * (1 - intensity)}, 
        0, 
        ${-0.0004667 * intensity}, 
        0, 0, 1, 0, 
        ${334.04 * intensity}, 
        ${-143.073 * intensity}, 
        0, 1)`;
        } else {
            // at Left
            const intensity = Math.min(Math.abs(relativeX), 1);
            matrix = `matrix3d(
        ${0.956236 + (1 - 0.956236) * (1 - intensity)}, 
        ${0.232741 * intensity}, 
        0, 
        ${-0.0012364 * intensity}, 
        ${-0.1329 * intensity}, 
        ${0.293217 + (1 - 0.293217) * (1 - intensity)}, 
        0, 
        ${-0.0002324 * intensity}, 
        0, 0, 1, 0, 
        ${-378.999 * intensity}, 
        ${-141.278 * intensity}, 
        0, 1)`;
        }

        textEl.style.transform = matrix;
    }

    function handleMouseLeave() {
        textEl.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)";
    }

    // Add event listeners
    footerSection.addEventListener('mousemove', handleMouseMove);
    footerSection.addEventListener('mouseleave', handleMouseLeave);
}
handleFooterTextAnimation();

// ------------------------------------------------------------------------------------------------
// CTA Button Animations
function handleCTAButtonAnimations(element) {
    const ctaButton = document.querySelector(element);
    // console.log(ctaButton);

    const ctaButtonPath = document.querySelector(`${element} svg path`);

    ctaButton.addEventListener('mouseenter', function() {
        animate(svg.createDrawable(ctaButtonPath), {
            draw: ["0.5 0.5", "0 1"],
            duration: 900,
            delay: stagger(100),
            ease: 'inOutQuad'
        });
    });
}

handleCTAButtonAnimations("#sign-in-button");
handleCTAButtonAnimations("#hamburger-panel-sign-in-button")
handleCTAButtonAnimations("#view-all-button");
handleCTAButtonAnimations("#know-more-button");
handleCTAButtonAnimations("#rate-now-button-0");
handleCTAButtonAnimations("#rate-now-button-1");
handleCTAButtonAnimations("#rate-now-button-2");
handleCTAButtonAnimations("#rate-now-button-3");
