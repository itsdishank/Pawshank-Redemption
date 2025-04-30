DELIMITER //

CREATE PROCEDURE GetPetMedicalHistory(IN petId INT)
BEGIN
  SELECT 
    record_id,
    pet_id,
    description,
    record_date,
    vet_name
  FROM PetMedicalRecord
  WHERE pet_id = petId
  ORDER BY record_date DESC;
END;
//

DELIMITER ;
