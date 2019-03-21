$(function(){
    /* affix the navbar after scroll below header */
    $(function () {
        // Init function
        function skrollrInit() {
            var s = skrollr.init({
                forceHeight: false
            });
        }

        // If window width is large enough, initialize skrollr
        if ($(window).width() > 767 && ( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ) {
            skrollrInit();
        }

        // On resize, check window width, if too small
        // and skrollr instance exists, destroy;
        // Otherwise, if window is large enough
        // and skrollr instance does not exist, initialize skrollr.
        $(window).on('resize', function () {
            var _skrollr = skrollr.get(); // get() returns the skrollr instance or undefined
            var windowWidth = $(window).width();

            if ( windowWidth <= 767 && _skrollr !== undefined && ( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ) {
                _skrollr.destroy();
            }
            else if ( windowWidth > 767 && _skrollr === undefined && ( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )) {
                skrollrInit();
            }
        });
    });


    /* highlight the top nav as scrolling occurs */
    $('body').scrollspy({ target: '#nav' });

    /* smooth scrolling for nav sections */
    $('a.page-scroll, a.navbar-brand').click(function(){
        var link = $(this).attr('href');
        var posi = $(link).offset().top;
        $('body,html').animate({scrollTop:posi},1200);
        event.preventDefault();
    });



    // Closes the Responsive Menu on Menu Item Click

    $(document).on('click','.navbar-collapse.in',function(e) {

        if( $(e.target).is('a.page-scroll') && ( $(e.target).attr('class') != 'dropdown-toggle' )  ) {
            $('.navbar-collapse.in').collapse('hide');
        }

    });

    $('a.navbar-brand').click(function() {
        $('.navbar-collapse.in').collapse('hide');
    });
    $("a.page-scroll, a.navbar-brand").mouseup(function(){
        $(this).blur();
    });

    var circles = [".circle25",".circle50",".circle75",".circle100"];
    function draw(e){
        $(this).circleProgress({value: (($(this).attr('class').split(' ')[1].match(/\d+$/)) / 100) });
    }
    for(var i in circles){
        var circle = $(circles[i]);
        circle.circleProgress({
            startAngle: -Math.PI / 2,
            value: 0,
            size: 180,
            fill: {color: "#19B5FE"}
        });
        circle.appear({force_process: true});
        $(circle).one('appear', draw);
    }

    $(document).on('show.bs.modal', '.modal', function () {
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        setTimeout(function() {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    });

});
