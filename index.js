import express from 'express';
import { hotels as hotelsList } from './hotels.js';
import cors from 'cors';
const app = express();

app.use(express.json());

app.use(cors());
const PORT = 3000;
//Endpoint 1: Get the hotels sorted by pricing

app.get('/hotels/sort/pricing', (req, res) => {
  const { pricing } = req.query;

  let sortedHotels = [...hotelsList];

  if (pricing === 'low-to-high') {
    sortedHotels.sort((a, b) => a.price - b.price);
  } else if (pricing === 'high-to-low') {
    sortedHotels.sort((a, b) => b.price - a.price);
  } else {
    return res.status(400).json({
      error: 'Invalid pricing value. Use "low-to-high" or "high-to-low".',
    });
  }
  return res.json({ hotels: sortedHotels });
});

//Endpoint 2: Get the hotels sorted based on their Ratings
app.get('/hotels/sort/rating', (req, res) => {
  const { rating } = req.query;
  let sortedHotels = [...hotelsList];
  if (rating === 'low-to-high') {
    sortedHotels.sort((a, b) => a.rating - b.rating);
  } else if (rating === 'high-to-low') {
    sortedHotels = hotelsList.sort((a, b) => b.rating - a.rating);
  } else {
    return res
      .status(400)
      .json({ error: 'Invalid rating value. Use low-to-high or high-to-low' });
  }
  return res.status(200).json({ hotels: sortedHotels });
});

//Endpoint 3: Get the Hotels sorted based on their Reviews

app.get('/hotels/sort/reviews', (req, res) => {
  const { reviews } = req.query;
  let sortedHotels = [...hotelsList];
  if (reviews == 'least-to-most') {
    sortedHotels = sortedHotels.sort((a, b) => a.reviews - b.reviews);
  } else if (reviews === 'most-to-least') {
    sortedHotels = sortedHotels.sort((a, b) => b.reviews - a.reviews);
  } else {
    return res.status(400).json({
      error: 'Invalid reviews value. Use least-to-most or most-to-least',
    });
  }
  return res.status(200).json({ hotels: sortedHotels });
});

//Endpoint 4: Filter the hotels based on the Hotel Amenity

app.get('/hotels/filter/amenity', (req, res) => {
  let { amenity } = req.query;
  if (!amenity) {
    return res
      .status(400)
      .json({ error: 'Amenity query parameter is required' });
  }

  amenity = amenity.toLowerCase();

  const filteredHotels = hotelsList.filter(
    (hotel) => hotel.amenity.toLowerCase() === amenity
  );

  if (filteredHotels.length === 0) {
    return res
      .status(404)
      .json({ message: 'No hotels found with the given amenity' });
  }
  return res.status(200).json({ hotels: filteredHotels });
});

//Endpoint 5: Filter the hotels based on the selected Country

app.get('/hotels/filter/country', (req, res) => {
  let { country } = req.query;
  let hotels = [...hotelsList];
  if (!country) {
    return res
      .status(400)
      .json({ error: 'query parameter country is required' });
  }
  country = country.toLowerCase();
  const filteredHotels = hotels.filter(
    (hotel) => hotel.country.toLowerCase() === country
  );
  if (filteredHotels.length === 0) {
    return res.status(200).json({ message: `No Hotels Found in ${country}` });
  }
  return res.status(200).json({ hotels: filteredHotels });
});

// Endpoint 6: Filter the hotels based on the selected Category
app.get('/hotels/filter/category', (req, res) => {
  let { category } = req.query;
  if (!category) {
    return res.json({
      error: `category variable is required in the query parameter`,
    });
  }
  category = category.toLowerCase();
  let hotels = [...hotelsList];
  const filteredHotels = hotels.filter(
    (hotel) => hotel.category.toLowerCase() === category
  );
  if (filteredHotels.length === 0) {
    return res
      .status(400)
      .json({ message: `No Hotels in category ${category}` });
  }
  return res.status(200).json({ hotels: filteredHotels });
});

//Endpoint 7: Send all hotels

app.get('/hotels', (req, res) => {
  const hotels = [...hotelsList];
  return res.status(200).json({ hotels: hotels });
});
app.listen(() => {
  console.log(`server is running on port ${PORT}`);
});
