===========================================
COFFEE SHOP E-COMMERCE DATABASE SCHEMA
===========================================

TABLE: User
-----------
PK: user_id (Integer, Auto-increment)
   name (String, 100)
   email (String, 255, Unique, Indexed)
   password_hash (String, 255)
   address (Text, Nullable)
   phone (String, 20, Nullable)
   is_staff (Boolean, Default: False)
   is_active (Boolean, Default: True)
   created_at (DateTime, Auto)
   updated_at (DateTime, Auto)

Relationships:
  User (1) ──→ (N) Order
  User (1) ──→ (1) Cart

-------------------------------------------

TABLE: Category
---------------
PK: category_id (Integer, Auto-increment)
   name (String, 100, Unique)
   description (Text, Nullable)
   slug (String, 100, Unique, Indexed)
   is_active (Boolean, Default: True)
   created_at (DateTime, Auto)

Relationships:
  Category (1) ──→ (N) Product

-------------------------------------------

TABLE: Product
--------------
PK: product_id (Integer, Auto-increment)
FK: category_id → Category(category_id)
   name (String, 200)
   description (Text)
   price (Decimal, 10,2)
   stock_quantity (Integer, Default: 0)
   image_url (String, 500, Nullable)
   roast_level (String, 50, Nullable)
   origin (String, 100, Nullable)
   weight_grams (Integer, Nullable)
   is_active (Boolean, Default: True)
   created_at (DateTime, Auto)
   updated_at (DateTime, Auto)

Indexes:
  - category_id (for filtering)
  - is_active (for queries)

Relationships:
  Product (N) ──→ (1) Category
  Product (1) ──→ (N) CartItem
  Product (1) ──→ (N) OrderItem

-------------------------------------------

TABLE: Cart
-----------
PK: cart_id (Integer, Auto-increment)
FK: user_id → User(user_id) [One-to-One]
   created_at (DateTime, Auto)
   updated_at (DateTime, Auto)

Relationships:
  Cart (1) ──→ (1) User
  Cart (1) ──→ (N) CartItem

-------------------------------------------

TABLE: CartItem
---------------
PK: cartitem_id (Integer, Auto-increment)
FK: cart_id → Cart(cart_id)
FK: product_id → Product(product_id)
   quantity (Integer, Min: 1)
   added_at (DateTime, Auto)

Constraints:
  - Unique(cart_id, product_id) [Can't add same product twice]

Relationships:
  CartItem (N) ──→ (1) Cart
  CartItem (N) ──→ (1) Product

-------------------------------------------

TABLE: Order
------------
PK: order_id (Integer, Auto-increment)
FK: user_id → User(user_id)
   total_price (Decimal, 10,2)
   status (Enum: 'pending', 'paid', 'processing', 
                 'shipped', 'delivered', 'cancelled')
   shipping_address (Text)
   payment_intent_id (String, 255, Nullable) [For Stripe]
   created_at (DateTime, Auto)
   updated_at (DateTime, Auto)

Indexes:
  - user_id (for user order history)
  - status (for admin filtering)
  - created_at (for sorting)

Relationships:
  Order (N) ──→ (1) User
  Order (1) ──→ (N) OrderItem

-------------------------------------------

TABLE: OrderItem
----------------
PK: orderitem_id (Integer, Auto-increment)
FK: order_id → Order(order_id)
FK: product_id → Product(product_id)
   quantity (Integer, Min: 1)
   price_at_purchase (Decimal, 10,2) [Price snapshot]
   subtotal (Decimal, 10,2) [quantity * price_at_purchase]

Relationships:
  OrderItem (N) ──→ (1) Order
  OrderItem (N) ──→ (1) Product

-------------------------------------------

RELATIONSHIP SUMMARY:
===================

User ──┬──< Order          (One user, many orders)
     │
     └──── Cart             (One user, one cart)

Category ──┬──< Product     (One category, many products)

Product ──┬──< CartItem     (One product, many cart items)
        │
        └──< OrderItem      (One product, many order items)

Cart ──┬──< CartItem        (One cart, many items)

Order ──┬──< OrderItem      (One order, many items)


MANY-TO-MANY RELATIONSHIPS:
==========================

Product (M:N) Order
  Implemented via: OrderItem (join table)
  "Many products can be in many orders"

Product (M:N) Cart
  Implemented via: CartItem (join table)
  "Many products can be in many carts"