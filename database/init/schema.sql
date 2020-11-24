USE cafe;

CREATE TABLE Customers(CustomerID VARCHAR(50) NOT NULL UNIQUE PRIMARY KEY, 
FirstName VARCHAR(50) NOT NULL, 
LastName VARCHAR(50) NOT NULL, 
Phone VARCHAR(30) NOT NULL, 
Email VARCHAR(100) UNIQUE NOT NULL, 
Address VARCHAR(255));

CREATE TABLE Employees(EmployeeID VARCHAR(50) NOT NULL UNIQUE PRIMARY KEY, 
FirstName VARCHAR(50) NOT NULL, 
LastName VARCHAR(50) NOT NULL, 
Phone VARCHAR(30) NOT NULL, 
Email VARCHAR(100) NOT NULL, 
CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP());

CREATE TABLE Menu(ItemName VARCHAR(255) NOT NULL PRIMARY KEY UNIQUE, 
Category VARCHAR(255) NOT NULL, 
Price DECIMAL(10, 2) NOT NULL,
Description VARCHAR(300),
Picture VARCHAR(255));

CREATE TABLE Orders(OrderID VARCHAR(50) NOT NULL UNIQUE PRIMARY KEY, 
CustomerID VARCHAR(50) NOT NULL, 
ItemName VARCHAR(255) NOT NULL, 
Quantity INT NOT NULL,
OrderStatus tinyint NOT NULL, 
OrderCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP(), 
OrderCompleted TIMESTAMP NULL, 
INDEX `idx_order`(OrderID),
CONSTRAINT fk_order_item
FOREIGN KEY (ItemName)
REFERENCES Menu(ItemName) ON UPDATE CASCADE ON DELETE RESTRICT,
CONSTRAINT fk_customer_id
FOREIGN KEY (CustomerID)
REFERENCES Customers(CustomerID) ON UPDATE CASCADE ON DELETE RESTRICT
);
