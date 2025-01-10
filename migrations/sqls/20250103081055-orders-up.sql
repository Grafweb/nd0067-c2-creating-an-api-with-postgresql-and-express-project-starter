CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    id_product int,
    quantity int,
    user_id int,
    status varchar(255)
)