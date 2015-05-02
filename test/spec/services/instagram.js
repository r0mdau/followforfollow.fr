'use strict';

describe('Instagram service', function () {
    var Instagram, $httpBackend, user, followers, following;

    beforeEach(module('followforfollow'));

    beforeEach(inject(function ($injector) {
        Instagram = $injector.get('Instagram');
        $httpBackend = $injector.get('$httpBackend');

        $httpBackend.whenJSONP("https://api.instagram.com/v1/users/1234/followed-by?access_token=romaindauby&callback=JSON_CALLBACK&client_id=419658066049438eb0bbd3cd7d726b9a")
            .respond(
            {
                data: [
                    {
                        id: "1234",
                        username: "r0mdau",
                        profile_picture: "http://www.romaindauby.fr/picture.jpg",
                        bio: "cool account"
                    },
                    {
                        id: "1235",
                        username: "tipfixed",
                        profile_picture: "http://www.romaindauby.fr/tipfixed.jpg",
                        bio: "nice bikes"
                    }
                ],
                pagination: {
                    next_url: "https://api.instagram.com/v1/users/1234/followed-by/2"
                }
            }
        );
        $httpBackend.whenJSONP("https://api.instagram.com/v1/users/1234/follows?access_token=romaindauby&callback=JSON_CALLBACK&client_id=419658066049438eb0bbd3cd7d726b9a")
            .respond(
            {
                data: [
                    {
                        id: "456",
                        username: "r0mdau",
                        profile_picture: "http://www.romaindauby.fr/picture.jpg",
                        bio: "cool account"
                    },
                    {
                        id: "789",
                        username: "tipfixed",
                        profile_picture: "http://www.romaindauby.fr/tipfixed.jpg",
                        bio: "nice bikes"
                    }
                ],
                pagination: {
                    next_url: "https://api.instagram.com/v1/users/1234/follows/2"
                }
            }
        );
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should return user properties in data object', function () {
        $httpBackend.whenJSONP("https://api.instagram.com/v1/users/self?access_token=romaindauby&callback=JSON_CALLBACK&client_id=419658066049438eb0bbd3cd7d726b9a")
            .respond({
                data: {
                    id: "1234",
                    username: "r0mdau",
                    profile_picture: "http://www.romaindauby.fr/picture.jpg",
                    bio: "cool account"
                }
            }
        );
        Instagram.getUser('romaindauby', function (response) {
            user = response;
        });
        $httpBackend.flush();

        expect(user.id).toEqual("1234");
        expect(user.username).toEqual("r0mdau");
        expect(user.profile_picture).toEqual("http://www.romaindauby.fr/picture.jpg");
        expect(user.bio).toEqual("cool account");
    });

    it('should return array of followers', function () {
        Instagram.getFromApi("romaindauby", "https://api.instagram.com/v1/users/1234/followed-by", function (response) {
            followers = response;
        });
        $httpBackend.flush();

        expect(followers.data.length).toEqual(2);
    });

    it('should return a pagniation s next url when crawling followers', function () {
        Instagram.getFromApi("romaindauby", "https://api.instagram.com/v1/users/1234/followed-by", function (response) {
            followers = response;
        });
        $httpBackend.flush();

        expect(followers.pagination.next_url).toEqual("https://api.instagram.com/v1/users/1234/followed-by/2");
    });

    it('should return array of followings', function () {
        Instagram.getFromApi("romaindauby", "https://api.instagram.com/v1/users/1234/follows", function (response) {
            following = response;
        });
        $httpBackend.flush();

        expect(following.data.length).toEqual(2);
    });

    it('should return a pagniation s next url when crawling followings', function () {
        Instagram.getFromApi("romaindauby", "https://api.instagram.com/v1/users/1234/follows", function (response) {
            following = response;
        });
        $httpBackend.flush();

        expect(following.pagination.next_url).toEqual("https://api.instagram.com/v1/users/1234/follows/2");
    });
});