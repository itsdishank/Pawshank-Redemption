DELIMITER //

CREATE TRIGGER after_booking_insert
AFTER INSERT ON Booking
FOR EACH ROW
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM Invoice WHERE booking_id = NEW.booking_id
  ) THEN
    INSERT INTO Invoice (booking_id, amount, invoice_date)
    VALUES (NEW.booking_id, NEW.total_cost, NOW());
  END IF;
END;
//

DELIMITER ;
