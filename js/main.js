$(document).ready(function () {

    $(".container-rect").addClass("animated bounceInUp");

    $(".reddit-links").mouseover(function () {
        $('.reddit-cat').css("border-right", "2px solid #7fdfe3");
    });
    $(".reddit-links").mouseout(function () {
        $('.reddit-cat').css("border-right", "1px solid #7fdfe3");
    });
    $(".news-links").mouseover(function () {
        $('.news-cat').css("border-right", "2px solid #e37fad");
    });
    $(".news-links").mouseout(function () {
        $('.news-cat').css("border-right", "1px solid #e37fad");
    });


    $("#search-bar").keypress(function (event) {
        var searchQuery = $("#search-bar").val();
        if (event.which == 13) {
            window.location.href = 'http://www.google.es/search?q=' + searchQuery;
        }
    }); // END Keypress Function		

    $(".settings").hide();
    $(".fa-cogs").click(function () {
        $(".settings").slideToggle();
    });
    $(".x").click(function () {
        $(".settings").slideToggle();
    });

    if (localStorage.getItem("locCity") == null) {
        localStorage.setItem("locCity", "Zaragoza")
    }

    if (localStorage.getItem("locCountry") == null) {
        localStorage.setItem("locCountry", "ES")
    }
    if (localStorage.getItem("unit") == null) {
        localStorage.setItem("unit", "&deg;C")
        $("#cel").attr('checked', 'checked');
    } else if (localStorage.getItem("unit") == "&deg;C") {
        $("#cel").attr('checked', 'checked');
    } else if (localStorage.getItem("unit") == "&deg;F") {
        $("#far").attr('checked', 'checked');
    }

    var baseURL = "http://api.openweathermap.org/data/2.5/weather?q=";
    var city = localStorage.getItem('locCity');
    var country = localStorage.getItem('locCountry')
    var key = "&APPID=15dac795069e9f6ef5b3c4c435136247";
    var apiurl = baseURL + city + "," + country + key;
    var unit = localStorage.getItem('unit');

    $(".entercity").attr("value", city);
    $(".entercountry").attr("value", country);

    function getWeather() {
        var baseURL = "http://api.openweathermap.org/data/2.5/weather?q=";
        var city = localStorage.getItem('locCity');
        var country = localStorage.getItem('locCountry')
        var key = "&APPID=15dac795069e9f6ef5b3c4c435136247";
        var apiurl = baseURL + city + "," + country + key;
        var unit = localStorage.getItem('unit');

        $.getJSON(apiurl, function (result) {
            console.log(result);
            var temp = result.main.temp;
            if (localStorage.getItem("unit") == "&deg;C") {
                temp = temp - 273.15;
                temp = Math.round(temp);
            } else if (localStorage.getItem("unit") == "&deg;F") {
                temp = temp - 273.15;
                temp = temp * 1.8;
                temp = temp + 32;
                temp = Math.round(temp);
            }

            $("#weather").empty().append(result.name + ": " + temp + " " + unit + ", " + result.weather[0].description);
        });
    }
    getWeather();

    $("#save").click(function () {
        if ($('.entercity').length > 0 && $('.entercity').val() != '') {
            localStorage.setItem("locCity", $(".entercity").val());
        }
        if ($('.entercountry').length > 0 && $('.entercountry').val() != '') {
            localStorage.setItem("locCountry", $(".entercountry").val());
        }
        if ($('input[id=far]').is(":checked")) {
            localStorage.setItem("unit", "&deg;F");
        }
        if ($('input[id=cel]').is(":checked")) {
            localStorage.setItem("unit", "&deg;C");
        }
        getWeather();
        $(".settings").slideToggle();
    });

    //Date Functionality
    var date = new Date();
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var weekday = weekdays[date.getDay()];
    var month = date.getMonth();
    var monthday = date.getDate();
    var year = date.getYear();

    $('#weekday').html(weekday);

    switch (monthday) {
        case 1:
        case 21:
        case 31:
            var affix = "st";
            $('#month-date').html(months[month] + " " + monthday + "<sup>" + affix + "</sup> " + ", " + (year + 1900));
            break;
        case 2:
        case 22:
            var affix = "nd";
            $('#month-date').html(months[month] + " " + monthday + "<sup>" + affix + "</sup> " + ", " + (year + 1900));
            break;
        case 3:
        case 23:
            var affix = "rd";
            $('#month-date').html(months[month] + " " + monthday + "<sup>" + affix + "</sup> " + ", " + (year + 1900));
            break;
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 24:
        case 25:
        case 26:
        case 27:
        case 28:
        case 29:
        case 30:
            var affix = "th";
            $('#month-date').html(months[month] + " " + monthday + "<sup>" + affix + "</sup> " + ", " + (year + 1900));
    }

    // Current Bitcoin Price Function	
    function btcprice() {
        var currency = "USD";
        var apiurl = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=' + currency;

        $.ajax({
            type: "GET",
            url: apiurl,
            async: false,
            dataType: 'json',
            success: function (data) {
                var price = data[currency];
                $("#btc-price-q").text("$" + price);
            },
            error: function (errorMessage) {
                alert("ajax call failed");
            }
        }); // END ajax call	
    }
    btcprice();

    // Current Bitcoin Price Function	
    function ethprice() {
        var currency = "USD";
        var apiurl = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=' + currency;

        $.ajax({
            type: "GET",
            url: apiurl,
            async: false,
            dataType: 'json',
            success: function (data) {
                var price = data[currency];
                $("#eth-price-q").text("$" + price);
            },
            error: function (errorMessage) {
                alert("ajax call failed");
            }
        }); // END ajax call	
    }
    ethprice();

    // Current Bitcoin Price Function	
    function xrpprice() {
        var currency = "USD";
        var apiurl = 'https://min-api.cryptocompare.com/data/price?fsym=XRP&tsyms=' + currency;

        $.ajax({
            type: "GET",
            url: apiurl,
            async: false,
            dataType: 'json',
            success: function (data) {
                var price = data[currency];
                $("#xrp-price-q").text("$" + price);
            },
            error: function (errorMessage) {
                alert("ajax call failed");
            }
        }); // END ajax call	
    }
    xrpprice();

    // Current Bitcoin Price Function	
    function bchprice() {
        var currency = "USD";
        var apiurl = 'https://min-api.cryptocompare.com/data/price?fsym=BCH&tsyms=' + currency;

        $.ajax({
            type: "GET",
            url: apiurl,
            async: false,
            dataType: 'json',
            success: function (data) {
                var price = data[currency];
                $("#bch-price-q").text("$" + price);
            },
            error: function (errorMessage) {
                alert("ajax call failed");
            }
        }); // END ajax call	
    }
    bchprice();

    var subreddit = "popular";
    var apiurl = 'https://www.reddit.com/r/' + subreddit + '/.json?';
    var postnum = 1;

    function updatepost() {
        $.ajax({
            type: "GET",
            url: apiurl,
            async: false,
            dataType: 'json',
            success: function (data) {
                var title = data["data"]["children"][postnum]["data"]["title"];
                var score = data["data"]["children"][postnum]["data"]["score"];
                $("#news-title").empty().prepend(title);
                $("#score-3").empty().append('<i class="fa fa-heart"> </i>' + ' ' + score);
                $("#news-title-link").attr("href", "https://reddit.com" + data["data"]["children"][postnum]["data"]["permalink"]);
            },
            error: function (errorMessage) {
                alert("Reddit ajax call failed");
            }
        }); // END ajax call
    } // End Update Post function
    updatepost();

    $("#next-post-news").click(function () {
        postnum = postnum + 2;
        updatepost();
    });

    // Refresh prices
    function refreshPrices() {
        btcprice();
        ethprice();
        xrpprice();
        bchprice();
        updatepost();
    }

    setTimeout(refreshPrices, 60000);

    $('#search-bar').val('');
    $('#search-bar').focus();

});	