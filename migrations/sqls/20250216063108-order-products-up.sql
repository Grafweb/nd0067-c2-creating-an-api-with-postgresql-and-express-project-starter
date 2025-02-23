CREATE TABLE order_products(
    id_product int,
    id_order int,
    quantity int,
    PRIMARY KEY(id_product,id_order),
    CONSTRAINT fk_products FOREIGN KEY(id_product) REFERENCES books(id),
    CONSTRAINT fk_orders FOREIGN KEY(id_order) REFERENCES orders(id)
)