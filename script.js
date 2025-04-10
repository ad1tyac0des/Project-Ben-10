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
        .call(() => tl.pause())
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
                display: "flex",
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

    // after load complete, resume timeline on click or space/enter keydown
    document.addEventListener("click", () => tl.paused && tl.resume());

    document.addEventListener("keydown", (e) => {
        if (tl.paused && (e.code === "Space" || e.code === "Enter")) tl.resume();
    });

    setupSkipIntroInteractions(tl);
    // return tl;
}

function setupSkipIntroInteractions(tl) {
    const skipIntro = document.querySelector("#skip-intro");

    // skip intro hover animation
    skipIntro.addEventListener("mouseenter", () => {
        animate(svg.createDrawable("#skip-intro svg path"), {
            draw: ["0 0", "0 1"],
            duration: 2000,
            ease: "inOutSine",
        });
    });

    // skip intro click animation
    skipIntro.addEventListener("click", () => {
        const introVideo = document.getElementById("intro-video");
        introVideo.pause();
        introVideo.style.opacity = 0;

        const labelPosition = tl.labels["intro-video-end"];
        tl.seek(labelPosition);
    });
}

setupPreloaderAnimations();
