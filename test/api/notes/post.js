const expect = require("chai").expect;
const request = require("supertest");
const config = require("config");
const mongoose = require("mongoose");
const app = require("../../../modules/request/request.routes.api");
const conn = require("../../../modules/request/request.model");

describe("POST /api/v1/request", () => {
  before(done => {
    mongoose
      .connect(config.get("db_url"), { useNewUrlParser: true })
      .then(() => done())
      .catch(err => done(err));
  });
  after(done => {
    mongoose
      .disconnect(config.get("db_url"), { useNewUrlParser: true })
      .then(() => done())
      .catch(err => done(err));
  });

  it("OK, creating a new request", done => {
    request("/api/v1" + app)
      .post("/request")
      .send({
        requested_time: "2019-05-04T16:15:00.000Z",
        status: "new",
        note: null,
        room_no: "101",
        request_type: "cleaning",
        source: "Alexa"
      })
      .then(res => {
        const body = res.body;
        expect(body).to.contain.property("_id");
        expect(body).to.contain.property("requested_time");
        expect(body).to.contain.property("room_no");
        expect(body).to.contain.property("source");
        done();
      });
  });
});
