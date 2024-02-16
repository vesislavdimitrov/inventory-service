use inventorydb;

CREATE TABLE IF NOT EXISTS `product` (
    id VARCHAR(36) NOT NULL,
    serialNumber VARCHAR(14) NOT NULL,
    name VARCHAR(255) NOT NULL,
    isActive BIT NOT NULL,
    timestampCreated BIGINT NOT NULL,
    mahName VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    expiryDate BIGINT,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS `order` (
    id VARCHAR(36) NOT NULL,
    productId VARCHAR(36) NOT NULL,
    isAutomated BIT NOT NULL,
    timestampCreated BIGINT NULL,
    warehouseName VARCHAR(255) NOT NULL,
    wareHouseLocation VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (productId) REFERENCES product(id)
);