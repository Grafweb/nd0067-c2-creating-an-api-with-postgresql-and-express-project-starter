CREATE TABLE books_test(
    id SERIAL PRIMARY KEY,
    title varchar(255),
    author varchar(255),
    type varchar(255),
    published_year varchar(255),
    pages int,
    price NUMERIC(10,2)
)