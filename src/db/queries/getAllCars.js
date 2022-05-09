export default `
SELECT
  c.id,
  c.manufacturer_id,
  m.name AS manufacturer_name,
  c.model,
  c.horsepower,
  c.created_at,
  STRING_AGG(ci.image_url, ',') AS images
FROM cars c
INNER JOIN manufacturers m on c.manufacturer_id = m.id
LEFT JOIN car_images ci ON ci.car_id = c.id
GROUP BY c.id, c.manufacturer_id, m.name, c.model, c.horsepower, c.created_at
`;