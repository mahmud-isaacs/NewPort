(function($) {

    "use strict";

    /* ----------------------------------------------------------- */
    /*  FUNCTION TO STOP LOCAL AND YOUTUBE VIDEOS IN SLIDESHOW
    /* ----------------------------------------------------------- */

    function stop_videos() {
        var video = document.getElementById("video");
        if (video.paused !== true && video.ended !== true) {
            video.pause();
        }
        $('.youtube-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
    }

    $(document).ready(function() {

        /* ----------------------------------------------------------- */
        /*  STOP VIDEOS
        /* ----------------------------------------------------------- */

        $('.slideshow nav span').on('click', function () {
            stop_videos();
        });

        /* ----------------------------------------------------------- */
        /*  FIX REVEALATOR ISSUE AFTER PAGE LOADED
        /* ----------------------------------------------------------- */

        $(".revealator-delay1").addClass('no-transform');

        /* ----------------------------------------------------------- */
        /*  PORTFOLIO GALLERY
        /* ----------------------------------------------------------- */

        if ($('.grid').length) {
            new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
        }

        /* ----------------------------------------------------------- */
        /*  HIDE HEADER WHEN PORTFOLIO SLIDESHOW OPENED
        /* ----------------------------------------------------------- */

        $(".grid figure").on('click', function() {
            $("#navbar-collapse-toggle").addClass('hide-header');
        });

        /* ----------------------------------------------------------- */
        /*  SHOW HEADER WHEN PORTFOLIO SLIDESHOW CLOSED
        /* ----------------------------------------------------------- */

        $(".nav-close, .nav-prev, .nav-next").on('click', function() {
            // Ensure navbar is shown when any of these buttons are clicked
            $("#navbar-collapse-toggle").removeClass('hide-header');
        });

        /* ----------------------------------------------------------- */
        /*  ALSO SHOW HEADER ON PAGE LOAD (just in case)
        /* ----------------------------------------------------------- */

        $(window).on('load', function() {
            $("#navbar-collapse-toggle").removeClass('hide-header');
        });

        // If you have other methods to navigate or exit, you may need to add similar logic:
        $(document).on('click', '.slideshow', function() {
            // If the user clicks anywhere outside the portfolio, ensure the navbar reappears
            $("#navbar-collapse-toggle").removeClass('hide-header');
        });

        /* ----------------------------------------------------------- */
        /*  PORTFOLIO DIRECTION AWARE HOVER EFFECT
        /* ----------------------------------------------------------- */

        var item = $(".grid li figure");
        var elementsLength = item.length;
        for (var i = 0; i < elementsLength; i++) {
            $(item[i]).hoverdir();
        }

        /* ----------------------------------------------------------- */
        /*  AJAX CONTACT FORM
        /* ----------------------------------------------------------- */

        $(".contactform").on("submit", function(e) {
            e.preventDefault(); // Prevent default form submission

            $(".output_message").text("Sending...");

            var form = $(this);
            var actionUrl = form.attr("action"); // The Formspree endpoint

            $.ajax({
                url: actionUrl,
                method: "POST",
                data: form.serialize(),
                dataType: "json",  // Expect JSON response
                success: function(response) {
                    if (response.ok) {
                        $(".form-inputs").css("display", "none");
                        $(".box p").css("display", "none");
                        $(".contactform").find(".output_message").addClass("success");
                        $(".output_message").text("Message Sent!");

                        // Clear form fields after submission
                        form.find('input[type="text"], input[type="email"], textarea').val('').removeClass('error');
                    } else {
                        $(".output_message").addClass("error");
                        $(".output_message").text("Error Sending!");
                    }
                },
                error: function(xhr, status, error) {
                    console.error("Error: " + error); // Log any error in case of failure
                    $(".output_message").addClass("error");
                    $(".output_message").text("Error Sending!");
                }
            });
        });

    });

    $(document).keyup(function(e) {

        /* ----------------------------------------------------------- */
        /*  KEYBOARD NAVIGATION IN PORTFOLIO SLIDESHOW
        /* ----------------------------------------------------------- */
        if (e.keyCode === 27) { // Escape key
            stop_videos();
            $('.close-content').click();
            $("#navbar-collapse-toggle").removeClass('hide-header');
        }
        if ((e.keyCode === 37) || (e.keyCode === 39)) { // Left and right arrow keys
            stop_videos();
        }
    });


})(jQuery);