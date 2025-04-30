-- DATABASE CREATION
CREATE DATABASE IF NOT EXISTS pet_kennel_management;
USE pet_kennel_management;

-- OWNER TABLE
CREATE TABLE Owner (
    owner_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PET TABLE
CREATE TABLE Pet (
    pet_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    species VARCHAR(30) NOT NULL,
    breed VARCHAR(50),
    birth_date DATE,
    owner_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES Owner(owner_id) ON DELETE CASCADE
);

-- SERVICE TABLE
CREATE TABLE Service (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BOOKING TABLE
CREATE TABLE Booking (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    pet_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('Scheduled', 'Checked-In', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
    total_cost DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pet_id) REFERENCES Pet(pet_id) ON DELETE CASCADE
);

-- BOOKING SERVICE TABLE (MANY-TO-MANY)
CREATE TABLE BookingService (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    service_id INT NOT NULL,
    quantity INT DEFAULT 1,
    cost DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES Booking(booking_id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES Service(service_id) ON DELETE CASCADE
);

-- INVOICE TABLE
CREATE TABLE Invoice (
    invoice_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL UNIQUE,
    amount DECIMAL(10,2) NOT NULL,
    invoice_date DATE DEFAULT (CURRENT_DATE),
    paid_status ENUM('Unpaid', 'Paid') DEFAULT 'Unpaid',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES Booking(booking_id) ON DELETE CASCADE
);

-- STAFF TABLE
CREATE TABLE Staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role ENUM('Admin', 'Staff', 'Veterinarian') NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PET MEDICAL RECORD TABLE
CREATE TABLE PetMedicalRecord (
    record_id INT AUTO_INCREMENT PRIMARY KEY,
    pet_id INT NOT NULL,
    description TEXT,
    record_date DATE,
    vet_name VARCHAR(100),
    FOREIGN KEY (pet_id) REFERENCES Pet(pet_id) ON DELETE CASCADE
);

-- ---------------------------------------
-- INDEXES (Advanced Optimizations)
-- ---------------------------------------

-- Fast search of Pets by Owner
CREATE INDEX idx_pet_owner ON Pet(owner_id);

-- Fast Booking lookup by Pet
CREATE INDEX idx_booking_pet ON Booking(pet_id);

-- Fast Booking date range queries
CREATE INDEX idx_booking_dates ON Booking(start_date, end_date);

-- Booking-Service many-to-many optimization
CREATE INDEX idx_booking_service ON BookingService(booking_id, service_id);

-- Invoice fast access by Booking
CREATE INDEX idx_invoice_booking ON Invoice(booking_id);

-- Fast Medical Records lookup by Pet
CREATE INDEX idx_medical_pet ON PetMedicalRecord(pet_id);

-- Fast Staff search by Role
CREATE INDEX idx_staff_role ON Staff(role);

-- ---------------------------------------
-- TRIGGER: Auto-create Invoice after Booking
-- ---------------------------------------
DELIMITER $$
CREATE TRIGGER trg_create_invoice
AFTER INSERT ON Booking
FOR EACH ROW
BEGIN
  DECLARE booking_total DECIMAL(10,2);

  SELECT SUM(cost) INTO booking_total
  FROM BookingService
  WHERE booking_id = NEW.booking_id;

  INSERT INTO Invoice (booking_id, amount, paid_status)
  VALUES (NEW.booking_id, IFNULL(booking_total, 0.00), 'Unpaid');
END$$
DELIMITER ;

-- ---------------------------------------
-- VIEW: Daily Occupancy Report
-- ---------------------------------------
CREATE VIEW DailyOccupancy AS
SELECT 
    CURDATE() AS report_date,
    COUNT(DISTINCT b.booking_id) AS active_bookings
FROM Booking b
WHERE b.start_date <= CURDATE() AND b.end_date >= CURDATE()
AND b.status IN ('Scheduled', 'Checked-In');

-- ---------------------------------------
-- STORED PROCEDURE: Monthly Revenue Report
-- ---------------------------------------
DELIMITER $$
CREATE PROCEDURE GetMonthlyRevenue(IN input_year INT)
BEGIN
    SELECT 
        MONTH(invoice_date) AS month,
        SUM(amount) AS total_revenue
    FROM Invoice
    WHERE YEAR(invoice_date) = input_year
    GROUP BY MONTH(invoice_date)
    ORDER BY month;
END$$
DELIMITER ;
