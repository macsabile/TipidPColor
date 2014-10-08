// ==UserScript==
// @name       TipidPColor
// @namespace   1a004cac1b5d07d47bf96329db466117
// @version    1.1.4
// @date       10-08-2014
// @author      mac9erd
// @description  Change the color of navigation bar, alert box, and many more..
// @match      http://*.tipidpc.com/* 
// @match      http://*.tipidcp.com/* 
// @copyright  mac9erd 2014
// @grant      GM_addStyle
// @grant      GM_getValue
// @grant      GM_setValue
// @grant      GM_log
// @run-at     document-end
// @homepageURL https://monkeyguts.com/code.php?id=219
// @updateURL   https://monkeyguts.com/219.meta.js?c
// @downloadURL https://monkeyguts.com/219.user.js?c
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// @require     http://cdn.craig.is/js/mousetrap/mousetrap.min.js
// @icon        https://monkeyguts.com/icon/219.png
// ==/UserScript==
 
 
$(document).ready(function(){
 
    checkSavedSettings();
 
    var ver = 'v1.1.4';
    var page = String(location).split('/')[3].split('.php')[0];
    var siteLogoValue = GM_getValue('HideSiteLogo');
    var refreshPageValue = GM_getValue('RefreshItemsAndBookmarks');
    var forumPostValue = GM_getValue('forumPostFontSize');
    var siteThemesValue = GM_getValue('siteThemes');
    var buddiesValue = GM_getValue('offBuddies');
    var intervalNum = GM_getValue('countDown');
 
    optionsWindow(); 
    setSavedSettings();
    prevNext();
    getUnreadCount();
       
    function optionsWindow() {
                
        var customCSS = '<style>.modal-container{font-size: 15px!important;position:fixed;font-family:Arial,Helvetica,sans-serif;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,0.8);z-index:99999;opacity:0;-webkit-transition:opacity 400ms ease-in;-moz-transition:opacity 400ms ease-in;transition:opacity 400ms ease-in;pointer-events:none}.modal-container:target{opacity:1;pointer-events:auto}.modal-dialog{width:510px;position:relative;margin:10% auto;padding:1px;border-radius:5px;background:#fff}.modal-header{background:#8bc34a;color:#fff;padding:5px;border-top-left-radius:5px;border-top-right-radius:5px}.modal-header h1{font-size:12px;padding-left:5px}.modal-body{height:260px;padding:20px 10px 0;border-bottom:1px solid #eee}.modal-footer{text-align:right;padding:5px 5px 5px 0}.version{color:#9e9e9e;font-size:10px;text-decoration:none;position:absolute;left:15px;bottom:15px}.btn-save{background:#8bc34a;border:#8bc34a solid 1px;border-radius:3px;color:#fff!Important;display:inline-block;font-size:14px;padding:8px 15px;text-decoration:none!Important;text-align:center;min-width:60px;position:relative;transition:color .1s ease}.btn-save:hover{background:#7cb342;border:#7cb342 solid 1px;border-radius:3px;color:#fff}.btn-cancel{background:#e0e0e0;border:#e0e0e0 solid 1px;border-radius:3px;color:#424242!Important;display:inline-block;font-size:14px;padding:8px 15px;text-decoration:none!Important;text-align:center;min-width:60px;position:relative;transition:color .1s ease}.btn-cancel:hover{background:#bdbdbd;border:#bdbdbd solid 1px;border-radius:3px;color:#fff}.btn-close{color:#fff!Important;font-size:20px;text-decoration:none!Important;position:absolute;right:15px;top:10px}table,tr{border-style:none}table th.title{width:300px;text-align:left}p.note{color: red;padding: 0 0 20px 0;margin: 0 auto;font-size: 14px;text-align: center;}.scrollup{width: 21px;height: 21px;text-indent: -9999px;z-index: 9999;opacity: 0.5;position: fixed;bottom: 40px;right: 20px;display: none;background: url("http://i.imgur.com/GX0tvHR.png") no-repeat;}.scrollup:hover {opacity: 1;}</style>';
        
        var settingDialog = '<div id="tpcolorOptions" class="modal-container"> <div class="modal-dialog"> <div class="modal-header"> <h1>TipidPColor Options</h1> <a href="#close" class="btn-close" aria-hidden="true">×</a> </div> <div class="modal-body"> <p class="note">Changes are saved immediately and applied on next page load.</p> <table> <tr> <th class="title"></th> <th class=""></th> </tr> <tr> <td>Hide site logo</td> <td><label><input type="radio" name="siteLogo" class="rdHideSiteLogo" id="rdHideSiteLogoYes" value="yes">Yes</label> <label><input type="radio" name="siteLogo" class="rdHideSiteLogo" id="rdHideSiteLogoNo" value="no">No</label> </td> </tr> <tr> <td>Hide offline buddies</td> <td><label><input type="radio" name="myBuddies" class="rdHideOffline" id="rdHideOfflineYes" value="yes">Yes</label> <label><input type="radio" name="myBuddies" class="rdHideOffline" id="rdHideOfflineNo" value="no">No</label> </td> </tr> <tr> <td>Reload Items and Bookmark tab every</td> <td><label><input type="radio" name="itemRefresh" class="rdRefreshItem" id="rdRefreshItemNone" value="none">none</label> <label><input type="radio" name="itemRefresh" class="rdRefreshItem" id="rdRefreshItem15s" value="15">15s</label> <label><input type="radio" name="itemRefresh" class="rdRefreshItem" id="rdRefreshItem30s" value="30">30s</label></td> </tr> <tr> <td>Forum post font-size</td> <td><label><input type="radio" name="fontSize" class="rdForumPostSize" id="rdForumPostSizeDefault" value="deafault">default</label> <label><input type="radio" name="fontSize" class="rdForumPostSize" id="rdForumPostSize12px" value="12">12px</label> <label><input type="radio" name="fontSize" class="rdForumPostSize" id="rdForumPostSize15px" value="15">15px</label></td> </tr><tr><td><br></td><td> </td></tr> <tr> <td>Themes</td> <td><label><input type="radio" name="selectThemes" class="rdSiteThemes" id="rdSiteThemesDefault" value="default">Default</label><br> <label><input type="radio" name="selectThemes" class="rdSiteThemes" id="rdSiteThemesLight" value="light-green">Light-green</label><br> <label><input type="radio" name="selectThemes" class="rdSiteThemes" id="rdSiteThemesNight" value="night">Dark</label></td> </tr> </table> </div> <div class="modal-footer"> <a href="https://monkeyguts.com/code.php?id=219" title="Check for updates" target="_blank"><span class="version">'+ ver +'</span></a> <a href="" id="refresh" class="btn-save">Refresh</a> <a href="#close" class="btn-cancel">Cancel</a> </div> </div> </div><a href="#" class="scrollup" title="Scroll to Top">Scroll to Top</a>';
        
        var dialogTrigger = '<a href="#tpcolorOptions">TipidPColor Options</a>';
                
        $('head').append(customCSS);
        $('body').append(settingDialog);
        
        var topLink = $("#content_left a[href^='security.php']");
                        if (topLink.length > 0) {
                                $("<li />").append(dialogTrigger).insertAfter(topLink.parent());
                        }
                else $('#nav').append(dialogTrigger);
    }
    
    function checkSavedSettings() {
        if ( GM_getValue('HideSiteLogo',-5) == -5 ) GM_setValue('HideSiteLogo','1');
        if ( GM_getValue('offBuddies',-5) == -5 ) GM_setValue('offBuddies','0');
        if ( GM_getValue('RefreshItemsAndBookmarks',-5) == -5 ) GM_setValue('RefreshItemsAndBookmarks','0');
        if ( GM_getValue('forumPostFontSize',-5) == -5 ) GM_setValue('forumPostFontSize','1');
        if ( GM_getValue('siteThemes',-5) == -5 ) GM_setValue('siteThemes','1');
        if ( GM_getValue('countDown',-5) == -5 ) GM_setValue('countDown','0');
    }
    
    function setSavedSettings() {
        //hide site logo
        if ( siteLogoValue == '1' ) { 
            selectID('#rdHideSiteLogoYes'); 
            $("#logo").remove();
            $("#banner_top").remove();
        }
        else selectID('#rdHideSiteLogoNo');
        
        //hide offline buddies
        if ( buddiesValue == '1' ) { 
            selectID('#rdHideOfflineYes'); 
            $(".offline").remove();
        }
        else selectID('#rdHideOfflineNo');
        
        //reload items and bookmarks
        if ( refreshPageValue == '1' ) { 
            selectID('#rdRefreshItem15s'); 
        }
        else if ( refreshPageValue == '2' ) {
            selectID('#rdRefreshItem30s');
        }
        else selectID('#rdRefreshItemNone');
        
        //forum post font-size
        if ( forumPostValue == '1' ) { 
            selectID('#rdForumPostSize12px');
            GM_addStyle ("div.postcontent {font-size: 12px;}");
        }
        else if ( forumPostValue == '2' ) {
            selectID('#rdForumPostSize15px');
            GM_addStyle ("div.postcontent {font-size: 15px;}");
        }
        else 
        {
            selectID('#rdForumPostSizeDefault');
                GM_addStyle ("div.postcontent {font-size: 10px;}");
        }
        
        //themes
        if ( siteThemesValue == '1' ) { 
            selectID('#rdSiteThemesLight');
            chooseTheme('light-green');
        }
        else if ( siteThemesValue == '2' ) {
            selectID('#rdSiteThemesNight');
            chooseTheme('night');
        }
        else selectID('#rdSiteThemesDefault');
    }
    
    function selectID(id) {
        $(id).attr('checked', true);
        //GM_log(id);
    }
    
    function getUnreadCount() {
        var post = $('.alertbox ul li').text();
        var title = $('title').text();
        if(post) {
                $('title').html('('+parseInt(post)+') '+title+'');
        }
    }
    
    $('#refresh').click(function() {
            location.reload();
    });
    
    $('.rdHideSiteLogo').change(function(){
           var val = $("input[name=siteLogo]:checked").val();
           if (val == 'yes') GM_setValue('HideSiteLogo','1');
           else GM_setValue('HideSiteLogo','0');
    });
    
    $('.rdHideOffline').change(function(){
           var val = $("input[name=myBuddies]:checked").val();
           if (val == 'yes') GM_setValue('offBuddies','1');
           else GM_setValue('offBuddies','0');
    });
    
    $('.rdRefreshItem').change(function(){
           var val = $("input[name=itemRefresh]:checked").val();
        if (val == '15'){ GM_setValue('RefreshItemsAndBookmarks','1');GM_setValue('countDown','15');}
        else if (val == '30'){ GM_setValue('RefreshItemsAndBookmarks','2');GM_setValue('countDown','30');}
           else GM_setValue('RefreshItemsAndBookmarks','0');
    });
    
    $('.rdForumPostSize').change(function(){
           var val = $("input[name=fontSize]:checked").val();
           if (val == '12') GM_setValue('forumPostFontSize','1');
           else if (val == '15') GM_setValue('forumPostFontSize','2');
           else GM_setValue('forumPostFontSize','0');
    });
    
    $('.rdSiteThemes').change(function(){
           var val = $("input[name=selectThemes]:checked").val();
           if (val == 'light-green') GM_setValue('siteThemes','1');
           else if (val == 'night') GM_setValue('siteThemes','2');
           else GM_setValue('siteThemes','0');
    });
    
    if (page == "itemmanager") {
        
        var countDownTimer = '<script>var max_time = '+ intervalNum +';var cinterval;function countdown_timer(){max_time--;document.getElementById("countdown").innerHTML = max_time;if(max_time == 0){clearInterval(cinterval);}}cinterval = setInterval("countdown_timer()", 1000);</script>'
 
        if( refreshPageValue == '1' ) {
            $('head').append(countDownTimer);  
                        $("#banner_big").append('<span id="textNum">This page will reload in <span id="countdown">15</span> second/s.</span>');
            setTimeout(function(){
             window.location.reload(1);
            }, 15000);
        }
        else if( refreshPageValue == '2' ) {
            $('head').append(countDownTimer);  
                $("#banner_big").append('<span id="textNum">This page will reload in <span id="countdown">30</span> second/s.</span>');
            setTimeout(function(){
             window.location.reload(1);
            }, 30000);
        }
        else {
            //GM_log('do nothing');
        };
    }
    
    function chooseTheme(name) {
        if (name == "light-green")
        {
            GM_addStyle ( "body{margin: 0 auto;padding: 0;background: #666;width: 100%;}img{max-width:100%;}#container{margin: 0;}a:link{color: #259b24;}#nav a:hover, a:hover{color: #0d5302;text-decoration:none;}div.alertbox{background: #f36c60;color: #fff;}ul.forumtopics h4 a, ul.forumtopics h4 a:visited{color: green;}span.pageBorder{border: 1px solid rgb(167, 167, 167);padding: 2px;}h2.forumsection a, h2.forumsection a:visited{color: #428EFF;}#buddies li.online a.prlink{color: #9b59b6;font-weight: bold;font-size: 11px;}h1.topictitle{font-size: 14px;color: #428EFF;}div.window.itembrowser{background: #8bc34a;}#nav{background: #8bc34a;padding: 20px 0 20px 0;font-size: medium;border: 0px;}#banner_big, #layout #left, #layout #right{border: 0px;}.new td, .flagged td{background: #B9DFBA;color: #fff;border: 1px solid #27ae60;}.premium{background: #E7EEFF;color: #F72A2A;border: 1px solid #5A88FF;}a, a:visited{color: green;}table.itemlist a:link, .even a:visited, .odd a:visited{color: green;}" );
        }
        else if (name == "night")
        {
            GM_addStyle ("body{margin: 0 auto;padding: 0;background: #666;width: 100%;}img{max-width:100%;}#container{margin: 0;}#nav{background: #263238;padding: 20px 0 20px 0;font-size: medium;border: 0px;}#banner_big{background: #455a64}#layout {background: #455a64;}#banner_big, #layout #left, #layout #right{border: 0px;}div.alertbox{background: #009688;color: #fff;border: 0;}div.window,td.window, div.window.itembrowser{background: #455a64;color: #fff;border: 1px solid #cfd8dc;}h3.wintitle {color: #fff;}div.postcontent, ul.posts li {background: #455a64;color: #fff;}ul.posts li{border: 1px solid #cfd8dc;}blockquote {border: 0;background: #b0bec5;color: #000;font-style: italic;}div.postcontent {border-top 1px solid #cfd8dc!Important;border-left: 0;border-right:0;border-bottom:0;}h1.topictitle{color: #fff;}a, a:visited{color: #cfd8dc;text-decoration:none;}a:hover{color: #fff;text-decoration:none;}.new td a, .flagged td a {color: #fff;}.new td a:hover, .flagged td a:hover {color: #cfd8dc;}.new td, .flagged td {background: #4db6ac;border: 1px solid #009688;}.odd, .odd td {border: 1px solid #999;background: #78909c;}.odd a, .odd td a{color: #fff!Important;}.odd a:hover, .odd td a:hover{color: #cfd8dc!Important;}.even, .even td {background: #455a64;border: 1px solid #999;}.even a, .even td a{color: #fff!Important;}.even a:hover, .even td a:hover{color: #cfd8dc!Important;}#announcement{background:#b2dfdb;}#announcement a{color:#008000;}.premium {background: #cfd8dc;border: 1px solid #009688;}.premium a {color:#009688;}.premium a:hover {color:#607d8b;}.modal-header {background: #263238;}.btn-save {background: #263238;border: #607d8b solid 1px;}.btn-save:hover {background: #607d8b;border: 1px solid #607d8b;}td, td p, span {color: #fff;}.modal-container td {color: #000;}table.pager td a {color: #000;}table.pager td a:hover {color: #259b24;}");
        }
        else
        {
            //GM_log('do nothing');
        }       
    }
    
    function prevNext() {
      inPage = $('.pager tbody tr td');
      prev = inPage.find('input[value="Prev"]');
      next = inPage.find('input[value="Next"]');
      newTopic = inPage.find('input[value="Start a Topic"]');
      goForum = inPage.find('input[value="Go"]');
 
      prev.each(function()
      {
        if(!$(this).is(':disabled'))
        {
          var url = /^document\.location\.href\=\'(.*)\'/.exec($(this).attr('onclick'))[1];
          var link = $('<a/>').prop('href', url).text('Prev');
          $(this).replaceWith(link);
          Mousetrap.bind('left', function(){if (url) {window.location = url;}});
        }
        else $(this).remove();
      });
      next.each(function()
      {
        if(!$(this).is(':disabled'))
        {
          var url = /^document\.location\.href\=\'(.*)\'/.exec($(this).attr('onclick'))[1];
          var link = $('<a/>').prop('href', url).text('Next');
          $(this).replaceWith(link);
          Mousetrap.bind('right', function(){if (url) {window.location = url;}});
        }
        else $(this).remove();
      });
       
      newTopic.each(function()
      {
        var url = /^document\.location\.href\=\'(.*)\'/.exec($(this).attr('onclick'))[1];
        var link = $('<a/>').prop('href', url).text('Create New Topic');
        $(this).replaceWith(link);
      });
       
      goForum.each(function()
      {
        $(this).remove();
      });
        }
    
    $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
           }
      }); 
      
        $('.scrollup').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 600);
       return false;
    });
 
    Mousetrap.bind('esc', function(){window.location = "#close";});
    
    $( "#trigger" ).click(function() {
        $(".note").fadeTo("fast", 1);
         setTimeout(function(){
              $(".note").fadeTo("fast", 0);
            }, 20000);
        });
});
