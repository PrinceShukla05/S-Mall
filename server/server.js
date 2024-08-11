require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());

// Get all Malls
app.get("/api/v1/malls", async (req, res) => {
  try {
    //const results = await db.query("select * from malls");
    const mallRatingsData = await db.query(
      "select * from malls left join (select mall_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by mall_id) reviews on malls.id = reviews.mall_id;"
    );

    res.status(200).json({
      status: "success",
      results: mallRatingsData.rows.length,
      data: {
        malls: mallRatingsData.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a Mall
app.get("/api/v1/malls/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const mall = await db.query(
      "select * from malls left join (select mall_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by mall_id) reviews on malls.id = reviews.mall_id where id = $1",
      [req.params.id]
    );
    // select * from malls wehre id = req.params.id

    const reviews = await db.query(
      "select * from reviews where mall_id = $1",
      [req.params.id]
    );
    console.log(reviews);

    res.status(200).json({
      status: "succes",
      data: {
        mall: mall.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Create a Mall

app.post("/api/v1/malls", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO malls (name, location, price_range) values ($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    console.log(results);
    res.status(201).json({
      status: "succes",
      data: {
        mall: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Update Malls

app.put("/api/v1/malls/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE malls SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );

    res.status(200).json({
      status: "succes",
      data: {
        mall: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});

// Delete Mall

app.delete("/api/v1/malls/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM malls where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "sucess",
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v1/malls/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (mall_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    console.log(newReview);
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});