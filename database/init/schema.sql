USE cafe;

CREATE TABLE Customers(CustomerID VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY, 
FirstName VARCHAR(50) NOT NULL, 
LastName VARCHAR(50) NOT NULL, 
Email VARCHAR(100) UNIQUE NOT NULL, 
Phone VARCHAR(30), 
Address VARCHAR(255), 
CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP());

CREATE TABLE Employees(EmployeeID VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY, 
CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP());

CREATE TABLE Accounts(
ID VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,   
Username VARCHAR(255) NOT NULL UNIQUE, 
Password VARCHAR(255) NOT NULL UNIQUE, 
EmployeeID VARCHAR(255), 
CustomerID VARCHAR(255),
CONSTRAINT fk_employee_id_account
FOREIGN KEY (EmployeeID)
REFERENCES Employees(EmployeeID) ON UPDATE CASCADE ON DELETE RESTRICT,
CONSTRAINT fk_customer_id_account
FOREIGN KEY (CustomerID)
REFERENCES Customers(CustomerID) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE Menu(ItemName VARCHAR(255) NOT NULL PRIMARY KEY UNIQUE, 
Price DECIMAL(10, 2) NOT NULL,
Category VARCHAR(255) NOT NULL,
Description VARCHAR(300),
Picture VARCHAR(255));

CREATE TABLE Orders(OrderID VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY, 
CustomerID VARCHAR(255) NOT NULL, 
ItemName VARCHAR(255) NOT NULL, 
Quantity INT NOT NULL,
OrderStatus tinyint NOT NULL, 
OrderCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP(), 
OrderCompleted TIMESTAMP NULL, 
INDEX `idx_order`(OrderID),
CONSTRAINT fk_order_item_orders
FOREIGN KEY (ItemName)
REFERENCES Menu(ItemName) ON UPDATE CASCADE ON DELETE RESTRICT,
CONSTRAINT fk_customer_id_orders
FOREIGN KEY (CustomerID)
REFERENCES Customers(CustomerID) ON UPDATE CASCADE ON DELETE RESTRICT
);

-- populating tables
INSERT INTO Menu (ItemName, Category, Price, Description, Picture) 
VALUES 
("Capuccino", "Drinks", 4.50, "Freshly brewed.", ""),
("Earl Grey Tea", "Drinks", 3.25, "Early morning zen.", ""),
("Vietnamese Ice Coffee", "Drinks", 5.00, "Caffeine to wake you up!", ""),
("Grilled Chicken Panini", "Food", 8.50, "Freshly toasted with banana peppers, spinach, and mushrooms", ""),
("Breakfast Wrap", "Food", 5.00, "Scrambled eggs, hash browns, with a choice of sausage or bacon", ""),
("Creamy Mushroom Soup", "Food", 4.50, "This is real soup for the soul.", "");