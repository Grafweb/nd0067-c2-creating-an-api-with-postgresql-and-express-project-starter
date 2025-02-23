CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    id_product varchar(255),
    quantity varchar(255),
    user_id int,
    status varchar(255),
    CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES users(id)
)