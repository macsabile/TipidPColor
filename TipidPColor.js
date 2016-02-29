// ==UserScript==
// @name       TipidPColor
// @namespace   1a004cac1b5d07d47bf96329db466117
// @version    1.3.2
// @date       02-29-2016
// @author      mac9erd
// @description  Change the color of navigation bar, alert box, and many more
// @match      https://*.tipidpc.com/* 
// @match      http://*.tipidcp.com/* 
// @copyright  mac9erd 2014
// @grant      GM_addStyle
// @grant      GM_getValue
// @grant      GM_setValue
// @grant      GM_log
// @license    GPLv3
// @run-at     document-end
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// @require     https://greasyfork.org/scripts/11549-mousetrapv1-5-3/code/mousetrapv153.js
// @require     https://greasyfork.org/scripts/11987-latestversion/code/latestVersion.js
// ==/UserScript==

$(document).ready(function () {

    checkSavedSettings();
 
    var ver = '1.3.2';
    var build = '022916-1';
    var page = String(location).split('/')[3].split('.php')[0];
    var siteLogoValue = GM_getValue('HideSiteLogo');
    var forumPostValue = GM_getValue('forumPostFontSize');
    var siteThemesValue = GM_getValue('siteThemes');
    var buddiesValue = GM_getValue('offBuddies');
    //var announcementValue = GM_getValue('HideAnnouncement');
    var notifValue = GM_getValue('PopNotif');
    var tpcOpt = 0;

    optionsWindow();
    setSavedSettings();
    prevNext();

    function optionsWindow() {

        var globalCSS = '<style>body{margin:0 auto;padding:0;background:#303030;width:100%}#container{margin: 0 auto;max-width: 1380px;padding: 0 15px;background:#303030;}p.caption{margin: 10px;padding: 0;}#nav{padding: 15px 0 15px 10px;}#textNum{text-align: center;padding: 0;margin: 0;}div#notifications {z-index: 11;}input[type="button"] {border: none;cursor: pointer;padding: 5px 20px;font-weight: bold;}input[type="submit"] {border: none;cursor: pointer;padding: 5px 25px;font-weight: bold;}</style>';
        
        var customCSS = '<style>.modal-container{font-size:15px!important;position:fixed;font-family:Arial,Helvetica,sans-serif;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.8);z-index:10;opacity:0;-webkit-transition:opacity 400ms ease-in;-moz-transition:opacity 400ms ease-in;transition:opacity 400ms ease-in;pointer-events:none}.modal-container:target{opacity:1;pointer-events:auto}.modal-dialog{width:510px;position:relative;margin:10% auto;padding:1px;border-radius:5px;background:#fff}.modal-header{background:#8bc34a;color:#fff;padding:5px;border-top-left-radius:5px;border-top-right-radius:5px}.modal-header h1{font-size:12px;padding-left:5px}.modal-body{height:260px;padding:20px 10px 0;border-bottom:1px solid #eee}.modal-footer{text-align:right;padding:5px 5px 5px 0}.modal-footer a#refresh,.modal-header a{color:#fff!Important}.version{color:#9e9e9e;font-size:10px;text-decoration:none;position:absolute;left:15px;bottom:15px}.btn-cancel,.btn-save{text-decoration:none!Important;display:inline-block;font-size:14px;padding:8px 15px;text-align:center;min-width:60px;position:relative;transition:color .1s ease}.btn-save{background:#8bc34a;border:1px solid #8bc34a;border-radius:3px;color:#fff!Important}.btn-save:hover{background:#7cb342;border:1px solid #7cb342;border-radius:3px;color:#fff}.btn-cancel{background:#e0e0e0;border:1px solid #e0e0e0;border-radius:3px;color:#424242!Important}.btn-cancel:hover{background:#bdbdbd;border:1px solid #bdbdbd;border-radius:3px;color:#fff}.btn-close{color:#fff!Important;font-size:20px;text-decoration:none!Important;position:absolute;right:15px;top:10px}table,tr{border-style:none}table th.title{width:300px;text-align:left}p.note{color:red;padding:0 0 20px;margin:0 auto;font-size:14px;text-align:center}.scrollup{width:21px;height:21px;text-indent:-9999px;z-index:9999;opacity:.5;position:fixed;bottom:40px;right:20px;display:none;background:url(https://raw.githubusercontent.com/macsabile/TipidPColor/master/scrollUp.png) no-repeat}.scrollup:hover{opacity:1}</style>';

        var settingDialog = '<div id="tpcolorOptions" class="modal-container"> <div class="modal-dialog"> <div class="modal-header"> <h1>TipidPColor Options</h1> <a href="#close" class="btn-close" aria-hidden="true">×</a> </div><div class="modal-body"> <p class="note">Changes are saved immediately and applied on next page load.</p><table> <tr> <th class="title"></th> <th class=""></th> </tr><tr> <td>Hide site logo</td><td> <label> <input type="radio" name="siteLogo" class="rdHideSiteLogo" id="rdHideSiteLogoYes" value="yes">Yes</label> <label> <input type="radio" name="siteLogo" class="rdHideSiteLogo" id="rdHideSiteLogoNo" value="no">No</label> </td></tr><tr> <td>Hide offline buddies</td><td> <label> <input type="radio" name="myBuddies" class="rdHideOffline" id="rdHideOfflineYes" value="yes">Yes</label> <label> <input type="radio" name="myBuddies" class="rdHideOffline" id="rdHideOfflineNo" value="no">No</label> </td></tr><!---<tr> <td>Hide banner and announcements</td><td> <label> <input type="radio" name="mAnnouncement" class="rdHideAnnouncement" id="rdHideAnnouncementYes" value="yes">Yes</label> <label> <input type="radio" name="mAnnouncement" class="rdHideAnnouncement" id="rdHideAnnouncementNo" value="no">No</label> </td></tr>---><tr><td>Disable Pop-up Notification</td><td><label><input type="radio" name="mNotif" class="rdPopNotif" id="rdPopNotifYes" value="yes">Yes</label><label><input type="radio" name="mNotif" class="rdPopNotif" id="rdPopNotifNo" value="no">No</label></td></tr><tr> <td>Forum post font-size</td><td> <label> <input type="radio" name="fontSize" class="rdForumPostSize" id="rdForumPostSizeDefault" value="deafault">default</label> <label> <input type="radio" name="fontSize" class="rdForumPostSize" id="rdForumPostSize15px" value="15">15px</label> <label> <input type="radio" name="fontSize" class="rdForumPostSize" id="rdForumPostSize17px" value="17">17px</label> </td></tr><tr> <td> <br></td><td> </td></tr><tr> <td>Themes</td><td> <label> <input type="radio" name="selectThemes" class="rdSiteThemes" id="rdSiteThemesDefault" value="default">Default</label> <br><label> <input type="radio" name="selectThemes" class="rdSiteThemes" id="rdSiteThemesLight" value="light-green">Light-green</label> <br><label> <input type="radio" name="selectThemes" class="rdSiteThemes" id="rdSiteThemesNight" value="night">Dark</label> </td></tr></table> </div><div class="modal-footer"> <a href="https://greasyfork.org/en/scripts/11550-tipidpcolor" title="Check for updates" target="_blank"><span class="version">' + ver + ' build '+ build +'</span></a> <a href="" id="refresh" class="btn-save">Refresh</a> </div></div></div><a href="#" class="scrollup" title="Scroll to Top">Scroll to Top</a>';

        var dialogTrigger = '<a class="cta" href="#tpcolorOptions">TipidPColor Options</a>';
        

        $('head').append(globalCSS);
        $('head').append(customCSS);
        $('body').append(settingDialog);

        var topLink = $("#left a[href^='newitem.php']");
        if (topLink.length > 0) {            
            $("<div />").append(dialogTrigger).insertAfter(topLink.parent());
        } else $("<div />").append(dialogTrigger).insertAfter("#left a[href^='signup.php']");
    }

    function checkSavedSettings() {
        if (GM_getValue('HideSiteLogo', -5) == -5) GM_setValue('HideSiteLogo', '0');
       if (GM_getValue('offBuddies', -5) == -5) GM_setValue('offBuddies', '0');
        if (GM_getValue('forumPostFontSize', -5) == -5) GM_setValue('forumPostFontSize', '0');
        if (GM_getValue('siteThemes', -5) == -5) GM_setValue('siteThemes', '1');
        //if (GM_getValue('HideAnnouncement', -5) == -5) GM_setValue('HideAnnouncement', '0');
        if (GM_getValue('PopNotif', -5) == -5) GM_setValue('PopNotif', '0');
    }

    function setSavedSettings() {
        //hide site logo
        if (siteLogoValue == '1') {
            selectID('#rdHideSiteLogoYes');
            $("#logo").remove();
            $("#banner_top").remove();
            GM_addStyle("#layout{margin:20px 0 0;}");
            $("<div />").append('<a class="cta" href="/">Home</a>').insertBefore("#left a[href^='forums.php']");
        } else selectID('#rdHideSiteLogoNo');

        //hide offline buddies
        if (buddiesValue == '1') {
            selectID('#rdHideOfflineYes');
            $(".offline").remove();
        } else selectID('#rdHideOfflineNo');

        //hide announcement
        /*if (announcementValue == '1') {
            selectID('#rdHideAnnouncementYes');
            $("#announcement").remove();
            $("#google_ads_div_TipidPC_leaderboard_ad_wrapper").remove();
            $("#banner_big").remove();
        } else selectID('#rdHideAnnouncementNo');*/
        
        //disable pop-up notifications
        if (notifValue == '1') {
            selectID('#rdPopNotifYes');
            GM_addStyle("div#notifications{display:none !Important;}");
        } else selectID('#rdPopNotifNo');

        //forum post font-size
        if (forumPostValue == '1') {
            selectID('#rdForumPostSize15px');
            GM_addStyle("div.postcontent {font-size: 15px;}");
        } else if (forumPostValue == '2') {
            selectID('#rdForumPostSize17px');
            GM_addStyle("div.postcontent {font-size: 17px;}");
        } else {
            selectID('#rdForumPostSizeDefault');
        }

        //themes
        if (siteThemesValue == '1') {
            selectID('#rdSiteThemesLight');
            chooseTheme('light-green');
        } else if (siteThemesValue == '2') {
            selectID('#rdSiteThemesNight');
            chooseTheme('night');
        } else selectID('#rdSiteThemesDefault');
    }

    function selectID(id) {
        $(id).attr('checked', true);
        //GM_log(id);
    }

    $('#refresh').click(function () {
        location.reload();
    });

    $('.rdHideSiteLogo').change(function () {
        var val = $("input[name=siteLogo]:checked").val();
        if (val == 'yes') GM_setValue('HideSiteLogo', '1');
        else GM_setValue('HideSiteLogo', '0');
    });

    $('.rdHideOffline').change(function () {
        var val = $("input[name=myBuddies]:checked").val();
        if (val == 'yes') GM_setValue('offBuddies', '1');
        else GM_setValue('offBuddies', '0');
    });

    /*$('.rdHideAnnouncement').change(function () {
        var val = $("input[name=mAnnouncement]:checked").val();
        if (val == 'yes') GM_setValue('HideAnnouncement', '1');
        else GM_setValue('HideAnnouncement', '0');
    });*/
    
    $('.rdPopNotif').change(function () {
        var val = $("input[name=mNotif]:checked").val();
        if (val == 'yes') GM_setValue('PopNotif', '1');
        else GM_setValue('PopNotif', '0');
    });

    $('.rdForumPostSize').change(function () {
        var val = $("input[name=fontSize]:checked").val();
        if (val == '15') GM_setValue('forumPostFontSize', '1');
        else if (val == '17') GM_setValue('forumPostFontSize', '2');
        else GM_setValue('forumPostFontSize', '0');
    });

    $('.rdSiteThemes').change(function () {
        var val = $("input[name=selectThemes]:checked").val();
        if (val == 'light-green') GM_setValue('siteThemes', '1');
        else if (val == 'night') GM_setValue('siteThemes', '2');
        else GM_setValue('siteThemes', '0');
    });

    function chooseTheme(name) {
        if (name == "light-green") {
            GM_addStyle("a.cta:link, a.cta:visited, a.cta:hover, a.cta:active{background: #8BC34A;}h3.wintitle{color:#fff;background: #8BC34A;}#bookmarks-manager li.flagged {background: rgba(139, 195, 74, 0.23);color: rgba(255, 102, 0, 0.75);border: 1px solid #8bc34a;}img{max-width:100%}a:link{color:#259b24}#nav a:hover,a:hover{color:#0d5302;text-decoration:none}div#notifications{background:#f36c60;border:1px solid #f36c60;color:#fff}ul.forumtopics h4 a,ul.forumtopics h4 a:visited{color:green}span.pageBorder{border:1px solid #a7a7a7;padding:2px}#banner_big,#layout #left,#layout #right,#nav{border:0}h2.forumsection a,h2.forumsection a:visited{color:#428EFF}#buddies li.online a.prlink{color:#9b59b6;font-weight:700;font-size:11px}h1.topictitle{font-size:14px;color:#428EFF}#nav{font-size:medium}.flagged td,.new td{background:#B9DFBA;color:#fff;border:1px solid #27ae60}.premium{background:#E7EEFF;color:#F72A2A;border:1px solid #5A88FF}a,a:visited{color:#0d5302}.even a:visited,.odd a:visited,table.itemlist a:link{color:green}");
        } else if (name == "night") {
            GM_addStyle("a.cta:link, a.cta:visited, a.cta:hover, a.cta:active{background: #009688;}#frontlist strong {color: #F8ECCE;}.side-module label{color: #fff;}a,a:hover,a:visited{text-decoration:none}#bookmarks-manager li.flagged {background: #4db6ac;color: #f60;border: 1px solid #4db6ac;}li.normal {background: #455A64 !IMPORTANT;}ul.forumtopics h4 a, ul.forumtopics h4 a:visited, h2.forumsection a, h2.forumsection a:visited{color: #4db6ac;}img{max-width:100%}blockquote a{color:#D82945}div.normalbox{color:#000}p.itemmeta{background:#224044;border:none}#banner_big,#layout #left,#layout #right,#nav{border:0}ul.catlist td.catprice{color:#F4F4F4}h1.itemname,h2.itemprice{color:#fff}#nav{background:#263238;font-size:medium}#banner_big,#layout{background:#455a64}div#notifications{background:#4db6ac;border:1px solid #4db6ac;color:#fff}div.window,div.window.itembrowser,td.window{background:#455a64;color:#fff;border:1px solid #999;}a.cta.forum{background: #009688;}h3.wintitle{color:#fff;background: #009688;}div.postcontent,ul.posts li{background:#455a64;color:#fff}ul.posts li{border:1px solid #999;}blockquote{border:0;background:#b0bec5;color:#000;font-style:italic}div.postcontent{border-left:0;border-right:0;border-bottom:0}h1.topictitle{color:#fff}a,a:visited{color:#cfd8dc}.flagged td a,.new td a,a:hover{color:#fff}.flagged td a:hover,.new td a:hover{color:#cfd8dc}.flagged td,.new td{background:#4db6ac;border:1px solid #009688}.odd,.odd td{border:1px solid #999;background:#78909c}.odd a,.odd td a{color:#fff!Important}.odd a:hover,.odd td a:hover{color:#cfd8dc!Important}.even,.even td{background:#455a64;border:1px solid #999}.even a,.even td a{color:#fff!Important}.even a:hover,.even td a:hover{color:#cfd8dc!Important}#announcement{background:#b2dfdb}#announcement a{color:green}.premium{background:#cfd8dc;border:1px solid #009688}.btn-save,.btn-save:hover{border:1px solid #607d8b}.btn-save,.modal-header{background:#263238}.premium a{color:#009688}.premium a:hover{color:#607d8b}.btn-save:hover{background:#607d8b}span,td,td p{color:#fff}.modal-container td,table.pager td a{color:#000}table.pager td a:hover{color:#259b24}");
        } else {
            //GM_log('do nothing');
        }
    }

    function prevNext() {
        inPage = $('.pager tbody tr td');
        prev = inPage.find('input[value="Prev"]');
        next = inPage.find('input[value="Next"]');
        newTopic = inPage.find('input[value="Start a Topic"]');
        goForum = inPage.find('input[value="Go"]');

        prev.each(function () {
            if (!$(this).is(':disabled')) {
                var url = /^document\.location\.href\=\'(.*)\'/.exec($(this).attr('onclick'))[1];
                var link = $('<a/>').prop('href', url).text('Prev');
                $(this).replaceWith(link);
                Mousetrap.bind('left', function () {
                    if (url) {
                        window.location = url;
                    }
                });
            } else $(this).remove();
        });
        next.each(function () {
            if (!$(this).is(':disabled')) {
                var url = /^document\.location\.href\=\'(.*)\'/.exec($(this).attr('onclick'))[1];
                var link = $('<a/>').prop('href', url).text('Next');
                $(this).replaceWith(link);
                Mousetrap.bind('right', function () {
                    if (url) {
                        window.location = url;
                    }
                });
            } else $(this).remove();
        });

        newTopic.each(function () {
            var url = /^document\.location\.href\=\'(.*)\'/.exec($(this).attr('onclick'))[1];
            var link = $('<a/>').prop('href', url).text('Create New Topic');
            $(this).replaceWith(link);
        });

        goForum.each(function () {
            $(this).remove();
        });
    }

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    Mousetrap.bind('esc', function () {
        window.location = "#close";
	tpcOpt = 0;
    });
    Mousetrap.bind('f8', function () {
        if (tpcOpt == 0) {
            window.location = "#tpcolorOptions";
            tpcOpt = 1;
        }
        else {
            window.location = "#close";
            tpcOpt = 0;
        }
        //GM_log(tpcOpt);
    });
    Mousetrap.bind('f9', function () {
        window.location = "itemmanager.php";
    });
});
