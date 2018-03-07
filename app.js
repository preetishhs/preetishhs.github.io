(function ($) {
    var $MessageList = $('#js-messages');
    var $MessageDone = $('#done-msg');

    function message(p_sMessage) {
        $MessageList.append($('<li>' + p_sMessage + '</li>'));
    }
    function messageDone(p_sMessage) {
        $MessageDone.append($('<li>' + p_sMessage + '</li>'));
    }

    window.Linkedin = {
        init: function () {
            message('The Linkedin JS has loaded.');
            message('You can now login.');

            $('.IN-widget').bind('click', function () {
                message('You just clicked the Login Button');
                window.parent.postMessage("LoginClicked", '*');
            });
        },

        onAuthCallback: function () {
            window.parent.postMessage("LoggedIn", '*');
            message('You just logged in.');
            message('Will retrieve your info.');
            messageDone('Authentication successful...');
        },

        onLogoutCallback: function () {
            message('You just logged out.');
        },

        userData: function (p_oUserInfo) {
            var localUserInfo = p_oUserInfo;
          
            //This is the best way of getting profile params
            IN.API.Profile("me").fields(["pictureUrls","pictureUrl","publicProfileUrl", "firstName", "lastName", "id", "headline"]).result(function (result) {
                console.log(result);
                if (!result.values[0].pictureUrls._total) {
                    message(result.values[0].firstName + ' ' + result.values[0].lastName + ' -- ' + result.values[0].headline + ' (' + result.values[0].id + ')');
                    window.parent.postMessage("NotFound", '*');
                    IN.User.logout();
                } else {
                    message('' + ' <img src="' + result.values[0].pictureUrls.values[0] + '" \/>' + result.values[0].firstName + ' ' + result.values[0].lastName + ' -- ' + result.values[0].headline + ' (' + result.values[0].id + ')');
                    window.parent.postMessage(result.values[0].pictureUrls.values[0], '*');
                    IN.User.logout();
                }
            });
        }
    };
} (jQuery));
