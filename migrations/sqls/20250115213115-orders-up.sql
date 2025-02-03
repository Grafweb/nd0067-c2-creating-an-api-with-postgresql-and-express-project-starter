CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    id_product int,
    quantity int,
    user_id int,
    status varchar(255),
    CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_products FOREIGN KEY(id_product) REFERENCES books(id)
)