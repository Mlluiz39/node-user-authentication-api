CREATE EXTENSION IF NOT EXIXTS "uuid_ossp"
CREATE EXTENSION IF NOT EXISTS "pgcrypto"


CREATE TABLE IF NOT EXISTS application_user(
  uuid uuid DEFAULT uuid_generate_v4(),
  userName VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  PRIMARY KEY (uuid)
)

INSERT INTO application_user (userName, email, password) VALUES ('marcelo', 'mlluiz@gmail.com', crypt('Julia2912@', 'my_salt'))