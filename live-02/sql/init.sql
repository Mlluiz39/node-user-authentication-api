CREATE EXTENSION IF NOT EXIXTS "uuid_ossp"
CREATE EXTENSION IF NOT EXISTS "pgcrypto"


CREATE TABLE IF NOT EXISTS application_user(
  uuid uuid DEFAULT uuid_generate_v4(),
  userName VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  PRIMARY KEY (uuid)
)

/* Buscando todos os registros */
SELECT uuid, userName, email
  FROM application_user

/* Buscando apenas um registro pelo id */
SELECT uuid, userName, email
FROM application_user
WHERE uuid = $1

/* Inserindo um registro */
INSERT INTO application_user (
  userName, 
  email, 
  password
  ) 
  VALUES (
    'marcelo', 
    'mlluiz@gmail.com', 
    crypt('Julia2912@', 'my_salt')
  )

/* Atualizando um registro pelo ID */
UPDATE application_user 
SET 
  userName = $1, 
  email = $2, 
  password = crypt($3, 'my_salt') 
WHERE uuid = $4

/* Deletando um registro pelo ID */
DELETE FROM application_user
  WHERE uuid = $1