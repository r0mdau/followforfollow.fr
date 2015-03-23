'use strict';

describe('User repository', function () {
    var User, Instagram;

    beforeEach(module('followforfollow'));

    beforeEach(inject(function ($injector) {
        User = $injector.get('User');
        Instagram = $injector.get('Instagram');
        Instagram.getUser = function (token, callback) {
            callback({
                id: "1234",
                username: "r0mdau",
                profile_picture: "http://www.romaindauby.fr/picture.jpg",
                bio: "cool account"
            });
        };
    }));

    it('should not having a user account properties', function () {
        expect(User.id).toBeUndefined();
        expect(User.username).toBeUndefined();
        expect(User.profile_picture).toBeUndefined();
        expect(User.bio).toBeUndefined();
    });

    it('should having a user account properties', function () {
        var user = User.getProfile();

        expect(user.id).toEqual("1234");
        expect(user.username).toEqual("r0mdau");
        expect(user.profile_picture).toEqual("http://www.romaindauby.fr/picture.jpg");
        expect(user.bio).toEqual("cool account");

        localStorage.removeItem('user');
    });

    it('should save a user account properties in storage', function () {
        var tmp = User.getProfile();
        var user = JSON.parse(localStorage.getItem('user'));

        expect(user.id).toEqual("1234");
        expect(user.username).toEqual("r0mdau");
        expect(user.profile_picture).toEqual("http://www.romaindauby.fr/picture.jpg");
        expect(user.bio).toEqual("cool account");

        localStorage.removeItem('user');
    });

    it('should set and save a user account properties in storage', function () {
        User.setProfile({
            id: "1234",
            username: "r0mdau",
            profile_picture: "http://www.romaindauby.fr/picture.jpg",
            bio: "cool account"
        });
        var user = JSON.parse(localStorage.getItem('user'));

        expect(User.id).toEqual("1234");
        expect(User.username).toEqual("r0mdau");
        expect(User.profile_picture).toEqual("http://www.romaindauby.fr/picture.jpg");
        expect(User.bio).toEqual("cool account");
        expect(user.id).toEqual("1234");
        expect(user.username).toEqual("r0mdau");
        expect(user.profile_picture).toEqual("http://www.romaindauby.fr/picture.jpg");
        expect(user.bio).toEqual("cool account");

        localStorage.removeItem('user');
    });

    it('should delete a user account properties in storage', function () {
        var user = User.getProfile();
        User.deleteSession();

        expect(localStorage.getItem('user')).toBeNull();
    });

    it('should retrieve the user account properties from storage if they are in', function () {
        var user = User.getProfile();
        Instagram.getUser = function (token, callback) {
            callback({
                fail : "fail"
            });
        };
        user = User.getProfile();

        expect(user.id).toEqual("1234");
        expect(user.username).toEqual("r0mdau");
        expect(user.profile_picture).toEqual("http://www.romaindauby.fr/picture.jpg");
        expect(user.bio).toEqual("cool account");

        localStorage.removeItem('user');
    });
});