'use strict';

describe('Storage service', function () {
    var Storage;

    beforeEach(module('followforfollow'));

    beforeEach(inject(function ($injector) {
        Storage = $injector.get('Storage');
    }));

    it('should not having a user', function () {
        expect(Storage.hasUser()).toBeFalsy();
    });

    it('should having a user', function () {
        localStorage.setItem('user', JSON.stringify({username : 'romaindauby'}));
        expect(Storage.hasUser()).toBeTruthy();
    });

    it('should save a token', function () {
        Storage.setToken('romaindauby');
        expect(JSON.parse(localStorage.getItem('token'))).toEqual('romaindauby');
    });

    it('should retrieve a token', function () {
        localStorage.setItem('token', JSON.stringify('romaindauby'));
        expect(Storage.getToken()).toEqual('romaindauby');
    });

    it('should save a user', function () {
        Storage.setUser({username : 'romaindauby'});
        expect(JSON.parse(localStorage.getItem('user'))).toEqual({username : 'romaindauby'});
    });

    it('should retrieve a user', function () {
        localStorage.setItem('user', JSON.stringify({username : 'romaindauby'}));
        expect(Storage.getUser()).toEqual({username : 'romaindauby'});
    });

    it('should remove localStorage', function () {
        localStorage.setItem('token', JSON.stringify('romaindauby'));
        localStorage.setItem('user', JSON.stringify({username : 'romaindauby'}));
        Storage.removeAll();

        expect(Storage.getUser()).toEqual([]);
        expect(Storage.getToken()).toEqual([]);
    });
});