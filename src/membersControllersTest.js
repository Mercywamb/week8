
const request = require("supertest");
const app = require("./app");


describe("POST /members", () => {
  it("should register a new member successfully", async () => {
    const res = await request(app)
      .post("/members")
      .send({
        email: "john.doe@thejitu.com",
        cohort: "17",
        firstName: "John",
        lastName: "Doe",
      });

    expect(res.status).toEqual(201);
    expect(res.body).toEqual({ message: "Member registered successfully" });
  });

  it("should return an error for invalid email format", async () => {
    const res = await request(app)
      .post("/members")
      .send({
        email: "john.doe@example.com",
        cohort: "17",
        firstName: "John",
        lastName: "Doe",
      });

    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ error: "Invalid email format" });
  });

  it("should return an error for invalid cohort number", async () => {
    const res = await request(app)
      .post("/members")
      .send({
        email: "john.doe@thejitu.com",
        cohort: "17A",
        firstName: "John",
        lastName: "Doe",
      });

    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ error: "Invalid cohort number" });
  });
});


describe("PUT /members/:email", () => {
  it("should update an existing member successfully", async () => {
    const res = await request(app)
      .put("/members/john.doe@thejitu.com")
      .send({
        cohort: "18",
        firstName: "mercy",
        lastName: "wambui",
      });

    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ message: "Member updated successfully" });
  });

  it("should return an error for a non-existing member", async () => {
    const res = await request(app)
      .put("/members/nonexisting@thejitu.com")
      .send({
        cohort: "18",
        firstName: "mercy",
        lastName: "wambui",
      });

    expect(res.status).toEqual(404);
    expect(res.body).toEqual({ error: "Member not found" });
  });
});


describe("GET /members/:email", () => {
  it("should fetch details of an existing member", async () => {
    const res = await request(app).get("/members/john.doe@thejitu.com");

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("email", "john.doe@thejitu.com");
    expect(res.body).toHaveProperty("cohort", "18");
  });

  it("should return an error for a non-existing member", async () => {
    const res = await request(app).get("/members/nonexisting@thejitu.com");

    expect(res.status).toEqual(404);
    expect(res.body).toEqual({ error: "Member not found" });
  });
});
describe("DELETE /members/:email", () => {
  it("should delete an existing member successfully", async () => {
    const res = await request(app).delete("/members/john.doe@thejitu.com");

    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ message: "Member deleted successfully" });
  });

  it("should return an error for a non-existing member", async () => {
    const res = await request(app).delete("/members/nonexisting@thejitu.com");

    expect(res.status).toEqual(404);
    expect(res.body).toEqual({ error: "Member not found" });
  });
});