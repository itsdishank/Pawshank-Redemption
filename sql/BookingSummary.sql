CREATE OR REPLACE VIEW BookingSummary AS
SELECT 
  b.booking_id,
  p.name AS pet_name,
  o.first_name AS owner_name,
  b.start_date,
  b.end_date,
  b.status,
  b.total_cost
FROM Booking b
JOIN Pet p ON b.pet_id = p.pet_id
JOIN Owner o ON p.owner_id = o.owner_id;
