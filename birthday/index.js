$(document).ready(function () {
    var button = $("#img");
    var main = $("#main");
    var containers = $(".container");
    var head = $(".head");
    var para = $("#para");
    var imagesVisible = false; // Toggle state tracker

    // Hide containers and button initially
    containers.hide();
    button.hide();

    // 🎉 Fire confetti while "HAPPY BIRTHDAY" is visible
    let duration = 3000;
    let animationEnd = Date.now() + duration;
    let confettiInterval = setInterval(function () {
        if (Date.now() > animationEnd) {
            clearInterval(confettiInterval);
        }

        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
        });

        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
        });
    }, 200);

    // ⏳ After animation: remove heading and show button
    setTimeout(function () {
        head.remove();
        button.css("display", "inline-block").animate({ opacity: 1 }, 1000);
    }, 4000);

    // ✅ Toggle images and paragraph on button click
    button.click(function () {
        if (!imagesVisible) {
            containers.slideDown(300);
            para.fadeOut(300);
        } else {
            containers.slideUp(300);
            para.fadeIn(300);
        }
        imagesVisible = !imagesVisible;
    });

    // 🖼 Click-to-enlarge image viewer logic
    const modal = $("#imageModal");
    const modalImg = $("#enlargedImage");
    const closeBtn = $(".close");

    $(".popup-img").click(function () {
        modal.css("display", "flex");
        modalImg.attr("src", $(this).attr("src"));
    });

    closeBtn.click(function () {
        modal.css("display", "none");
    });

    modal.click(function (e) {
        if (e.target.id === "imageModal") {
            modal.css("display", "none");
        }
    });
});
