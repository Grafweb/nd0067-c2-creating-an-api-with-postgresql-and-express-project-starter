CREATE TABLE books(
    id SERIAL PRIMARY KEY,
    title varchar(255),
    author varchar(255),
    type varchar(255),
    published_year varchar(255),
    pages int,
    price float
)