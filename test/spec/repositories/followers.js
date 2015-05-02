'use strict';

describe('Followers repository', function () {
    var Followers, Instagram;

    beforeEach(module('followforfollow'));

    beforeEach(inject(function ($injector) {
        Followers = $injector.get('Followers');
        Instagram = $injector.get('Instagram');
        Instagram.getFromApi = function (token, url, callback) {
            callback(
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
                    ]
                }
            );
        };
    }));


    it('should not having followers users', function () {
        expect(Followers.followers.length).toEqual(0);
    });

    it('should not having following users', function () {
        expect(Followers.following.length).toEqual(0);
    });

    it('should retrieve followers', function () {
        Followers.getFollowers();

        expect(Followers.followers.length).toEqual(2);
        expect(Followers.followers[0].id).toEqual("1234");
        expect(Followers.followers[1].id).toEqual("1235");

        localStorage.removeItem('followers');
    });

    it('should save followers in storage', function () {
        Followers.getFollowers();

        var followersInStorage = JSON.parse(localStorage.getItem('followers'));
        expect(followersInStorage.length).toEqual(2);
        expect(followersInStorage[0].id).toEqual("1234");
        expect(followersInStorage[1].id).toEqual("1235");

        localStorage.removeItem('followers');
    });

    it('should retrieve following', function () {
        Followers.getFollowing();

        expect(Followers.following.length).toEqual(2);
        expect(Followers.following[0].id).toEqual("1234");
        expect(Followers.following[1].id).toEqual("1235");

        localStorage.removeItem('following');
    });

    it('should save following in storage', function () {
        Followers.getFollowing();

        var followingInStorage = JSON.parse(localStorage.getItem('following'));
        expect(followingInStorage.length).toEqual(2);
        expect(followingInStorage[0].id).toEqual("1234");
        expect(followingInStorage[1].id).toEqual("1235");

        localStorage.removeItem('following');
    });
});