/* ==========================================================
   WAIT FOR PAGE TO LOAD
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================
       ELEMENTS
    ========================================================== */

    const beginBtn = document.getElementById("beginBtn");
    const musicBtn = document.getElementById("musicBtn");
    const music = document.getElementById("bgMusic");

    const scenes = document.querySelectorAll(".scene");
    const dots = document.querySelectorAll(".progress span");

    let isPlaying = false;

    /* ==========================================================
       SHOW COVER IMMEDIATELY
    ========================================================== */

    const cover = document.querySelector(".cover .reveal");

    if (cover) {
        cover.classList.add("active");
    }

    /* ==========================================================
       BEGIN STORY BUTTON
       (FIXED: no longer "await"s music.play() before scrolling.
       If the audio promise hangs or rejects, the page still
       advances to the next section.)
    ========================================================== */

    if (beginBtn) {

        beginBtn.addEventListener("click", () => {

            music.play()
                .then(() => {
                    isPlaying = true;
                    musicBtn.textContent = "🎵";
                })
                .catch((err) => {
                    console.log("Music couldn't autoplay.", err);
                });

            document.getElementById("story").scrollIntoView({
                behavior: "smooth"
            });

        });

    }

    /* ==========================================================
       MUSIC BUTTON
       (FIXED: same "don't block on the promise" approach)
    ========================================================== */

    if (musicBtn) {

        musicBtn.addEventListener("click", () => {

            if (isPlaying) {

                music.pause();

                musicBtn.textContent = "🔇";

                isPlaying = false;

            } else {

                music.play()
                    .then(() => {
                        musicBtn.textContent = "🎵";
                        isPlaying = true;
                    })
                    .catch((err) => {
                        console.log("Music couldn't play.", err);
                    });

            }

        });

    }

    /* ==========================================================
       REVEAL ON SCROLL
    ========================================================== */

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    }, {

        threshold: 0.25

    });

    document.querySelectorAll(".reveal").forEach(section => {

        if (!section.closest(".cover")) {
            observer.observe(section);
        }

    });

    /* ==========================================================
       PROGRESS DOTS
    ========================================================== */

    function updateProgress() {

        let current = 0;

        scenes.forEach((scene, index) => {

            const rect = scene.getBoundingClientRect();

            if (rect.top <= window.innerHeight / 2) {

                current = index;

            }

        });

        dots.forEach(dot => dot.classList.remove("active"));

        if (dots[current]) {

            dots[current].classList.add("active");

        }

    }

    window.addEventListener("scroll", updateProgress);

    updateProgress();

    /* ==========================================================
       FLOATING PETALS
    ========================================================== */

    const petals = document.querySelector(".petals");

    if (petals) {

        function createPetal() {

            const petal = document.createElement("div");

            petal.className = "petal";

            petal.innerHTML = "🌸";

            petal.style.left = Math.random() * 100 + "%";

            petal.style.animationDuration =
                (8 + Math.random() * 6) + "s";

            petal.style.fontSize =
                (18 + Math.random() * 12) + "px";

            petals.appendChild(petal);

            setTimeout(() => {

                petal.remove();

            }, 14000);

        }

        createPetal();

        setInterval(createPetal, 1200);

    }

    /* ==========================================================
       YES BUTTON
       (FIXED: now scrolls to the ending section after the
       heart animation, instead of doing nothing)
    ========================================================== */

    const yesBtn = document.getElementById("yesBtn");

    if (yesBtn) {

        yesBtn.addEventListener("click", () => {

            yesBtn.textContent = "❤️";

            navigator.vibrate?.(200);

            setTimeout(() => {

                document.getElementById("ending").scrollIntoView({
                    behavior: "smooth"
                });

            }, 900);

        });

    }

});