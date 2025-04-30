-- List all owners with their pets
SELECT 
    o.first_name AS OwnerFirstName, 
    o.last_name AS OwnerLastName,
    p.name AS PetName,
    p.species AS PetSpecies
FROM Owner o
JOIN Pet p ON o.owner_id = p.owner_id
ORDER BY o.first_name;
