const should = require('chai').should();
const assert = require('assert');
let request = require('supertest');


request = request('http://localhost:8080');

describe("Server Integration Test", function(){
    describe("Timestamp Parameter", function(){
        it("should provide unix and natural json fields as null with invalid timestamp param", function(){
            return request.get('/aaaa')
                .set('Accept', 'application/json')
                .expect(200)
                .then(response => {
                    should.equal(response.body.unix, null);
                    should.equal(response.body.natural, null);
                })
        });

        it("should provide unix and natural json fields with timestamp param as a unix timestamp", function(){
            return request.get('/1450137600')
                .set('Accept', 'application/json')
                .expect(200)
                .then(response => {
                    should.equal(response.body.unix, 1450137);
                    should.equal(response.body.natural, 'December 14th, 2015');
                })
        });


        it("should provide unix and natural json fields with timestamp param as a natural date", function(){
            return request.get('/December%2015,%202015')
                .set('Accept', 'application/json')
                .expect(200)
                .then(response => {
                    should.equal(response.body.unix, 1450155600);
                    should.equal(response.body.natural, 'December 15th, 2015');
                })
        });


        it("should provide unix and natural json fields with timestamp param with format MM/DD/YYYY", function(){
            return request.get('/12%2f15%2f2016')
                .set('Accept', 'application/json')
                .expect(200)
                .then(response => {
                    should.equal(response.body.unix, 1481778000);
                    should.equal(response.body.natural, 'December 15th, 2016');
                })
        });


        it("should provide unix and natural json fields with timestamp param with format MM-DD-YYYY", function(){
            return request.get('/12-25-2016')
                .set('Accept', 'application/json')
                .expect(200)
                .then(response => {
                    should.equal(response.body.unix, 1482642000);
                    should.equal(response.body.natural, 'December 25th, 2016');
                })
        });
    });
});