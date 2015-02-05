'use strict';

fffApplication.controller('fffHomeController', ['$scope', '$location', 'fffStorage', 'fffShared',
    function ($scope, $location, fffStorage, fffShared) {
        $('#loginIgApi').attr({
            title: "Login to Instagram",
            href: APISettings.apiUri
        });

        if (fffStorage.getToken().length !== 0) {
            $location.path("/main");
        }else if(fffShared.signedOut){
            $('#loginIgApi').after(
                $('<a>')
                    .attr('href', 'http://instagram.com/accounts/logout')
                    .append(
                    $('<button>')
                        .html('Change Instagram Account')
                        .addClass('visible-xs visible-sm btn btn-large btn-default')
                        .css({
                            width : '100%',
                            height : '50px'
                        })
                        .click(function(){
                            alert('Previous to return the application');
                        })
                )
            );
        }
    }]);