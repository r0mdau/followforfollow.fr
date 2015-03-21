'use strict';

describe('Instagram service', function () {
    var Instagram, $httpBackend, user;

    beforeEach(module('followforfollow'));

    beforeEach(inject(function ($injector) {
        Instagram = $injector.get('Instagram');
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.whenJSONP("https://api.instagram.com/v1/users/self?access_token=romaindauby&callback=JSON_CALLBACK&client_id=419658066049438eb0bbd3cd7d726b9a")
            .respond({ data : {
                id: "1234",
                username: "r0mdau",
                profile_picture: "http://www.romaindauby.fr/picture.jpg",
                bio: "cool account"
            }});
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should return user properties', function () {
        Instagram.getUser('romaindauby', function(response){
            user = response;
        });
        $httpBackend.flush();

        expect(user.id).toEqual("1234");
        expect(user.username).toEqual("r0mdau");
        expect(user.profile_picture).toEqual("http://www.romaindauby.fr/picture.jpg");
        expect(user.bio).toEqual("cool account");
    });
});