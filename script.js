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

function handleCTAButtonAnimations(element) {
    const ctaButton = document.querySelector(element);
    console.log(ctaButton);

    const ctaButtonPath = document.querySelector(`${element} svg path`);

    ctaButton.addEventListener('mouseenter', function() {
        animate(svg.createDrawable(ctaButtonPath), {
            draw: ["0.5 0.5", "0 1"],
            duration: 700,
            delay: stagger(100),
            ease: 'inOutQuad'
        });
    });
}

handleCTAButtonAnimations("#sign-in-button");
handleCTAButtonAnimations("#view-all-button");