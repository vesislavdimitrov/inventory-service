import ProductService from "../rest/ProductService.js";
import ProductPersistence from "../persistence/ProductPersistence.js";
import IllegalArgumentError from "../rest/IllegalArgumentError.js";

jest.mock("../persistence/ProductPersistence.js");

describe("A ProductService", () => {
    let productService;
    let productMock;
    let productData;

    beforeEach(() => {
        productMock = {
            id: "929763ad-a344-4dbb-8f82-b4ea1048b320",
            serialNumber: "123",
            name: "Test Product",
            isActive: true,
            mahName: "Test Mah",
            quantity: 10,
            expiryDate: Date.now() / 1000 + 3600,
        };
        productData = {
            serialNumber: "123",
            name: "Test Product",
            isActive: true,
            mahName: "Test Mah",
            quantity: 10,
            expiryDate: Date.now() / 1000 + 3600,
        };
        productService = new ProductService();
    });

    describe("When creating a Product entry", () => {
        it("should successfully create a product if the correct values are passed", async () => {
            productService.createProduct(productData);
            ProductPersistence.prototype.create.mockResolvedValueOnce(productMock);
            const createdProduct = await productService.createProduct(productData);
            expect(ProductPersistence.prototype.create).toHaveBeenCalledWith(expect.objectContaining(productData));
            expect(createdProduct).toEqual(productMock);
        });

        it("should throw IllegalArgumentError when creating a product with an empty serial number", async () => {
            productData.serialNumber = "";
            ProductPersistence.prototype.create.mockRejectedValueOnce(new IllegalArgumentError());
            await expect(async () => {
                await productService.createProduct(productData);
            }).rejects.toThrow(IllegalArgumentError);
        });

        it("should throw IllegalArgumentError when creating a product with an empty MAH", async () => {
            productData.mahName = "";
            ProductPersistence.prototype.create.mockRejectedValueOnce(new IllegalArgumentError());
            await expect(async () => {
                await productService.createProduct(productData);
            }).rejects.toThrow(IllegalArgumentError);
        });

        it("should throw IllegalArgumentError when creating a product with an empty name", async () => {
            productData.name = "";
            ProductPersistence.prototype.create.mockRejectedValueOnce(new IllegalArgumentError());
            await expect(async () => {
                await productService.createProduct(productData);
            }).rejects.toThrow(IllegalArgumentError);
        });

        it("should throw IllegalArgumentError when creating a product with an invalid expiry date", async () => {
            productData.expiryDate = new Date(2020, 0, 1, 12, 0, 0, 0) / 1000;
            ProductPersistence.prototype.create.mockRejectedValueOnce(new IllegalArgumentError());
            await expect(async () => {
                await productService.createProduct(productData);
            }).rejects.toThrow(IllegalArgumentError);
        });

        it("should throw IllegalArgumentError when creating a product with invalid quantity", async () => {
            productData.quantity = -2;
            ProductPersistence.prototype.create.mockRejectedValueOnce(new IllegalArgumentError());
            await expect(async () => {
                await productService.createProduct(productData);
            }).rejects.toThrow(IllegalArgumentError);
        });
    });

    describe("When updating a Product entry", () => {
        let updatedProductMock;

        beforeEach(() => {
            updatedProductMock = {
                id: "929763ad-a344-4dbb-8f82-b4ea1048b320",
                serialNumber: "456",
                name: "Updated Product",
                isActive: true,
                mahName: "Updated Mah",
                quantity: 20,
                expiryDate: Date.now() / 1000 + 7200,
            };
        });

        it("should successfully update a product with valid data when corrext values are passed", async () => {
            ProductPersistence.prototype.update.mockResolvedValueOnce(updatedProductMock);
            const updatedProduct = await productService.updateProduct(updatedProductMock.id, updatedProductMock);
            expect(ProductPersistence.prototype.update).toHaveBeenCalledWith(
                updatedProductMock.id,
                expect.objectContaining(updatedProductMock)
            );
            expect(updatedProduct).toEqual(updatedProductMock);
        });

        it("should throw IllegalArgumentError when updating a product with with an empty value for serial number", async () => {
            updatedProductMock.serialNumber = "";
            ProductPersistence.prototype.update.mockResolvedValueOnce(new IllegalArgumentError());
            await expect(async () => {
                await productService.updateProduct(updatedProductMock.id, updatedProductMock);
            }).rejects.toThrow(IllegalArgumentError);
        });

        it("should throw IllegalArgumentError when updating a product with with an empty value for a MAH", async () => {
            updatedProductMock.mahName = "";
            ProductPersistence.prototype.update.mockResolvedValueOnce(new IllegalArgumentError());
            await expect(async () => {
                await productService.updateProduct(updatedProductMock.id, updatedProductMock);
            }).rejects.toThrow(IllegalArgumentError);
        });

        it("should throw IllegalArgumentError when updating a product with with an empty value for a name", async () => {
            updatedProductMock.name = "";
            ProductPersistence.prototype.update.mockResolvedValueOnce(new IllegalArgumentError());
            await expect(async () => {
                await productService.updateProduct(updatedProductMock.id, updatedProductMock);
            }).rejects.toThrow(IllegalArgumentError);
        });

        it("should throw IllegalArgumentError when updating a product with with an empty value for a name", async () => {
            updatedProductMock.name = "";
            ProductPersistence.prototype.update.mockResolvedValueOnce(new IllegalArgumentError());
            await expect(async () => {
                await productService.updateProduct(updatedProductMock.id, updatedProductMock);
            }).rejects.toThrow(IllegalArgumentError);
        });

        it("should throw IllegalArgumentError when updating a product with with an invalid expiry date", async () => {
            updatedProductMock.expiryDate = new Date(2020, 0, 1, 12, 0, 0, 0) / 1000;
            ProductPersistence.prototype.update.mockResolvedValueOnce(new IllegalArgumentError());
            await expect(async () => {
                await productService.updateProduct(updatedProductMock.id, updatedProductMock);
            }).rejects.toThrow(IllegalArgumentError);
        });

        it("should throw IllegalArgumentError when updating a product with with an invalid quantity", async () => {
            updatedProductMock.quantity = -10;
            ProductPersistence.prototype.update.mockResolvedValueOnce(new IllegalArgumentError());
            await expect(async () => {
                await productService.updateProduct(updatedProductMock.id, updatedProductMock);
            }).rejects.toThrow(IllegalArgumentError);
        });
    });

    it("should return all products when getAllProducts is called", async () => {
        const allProductsMock = [productMock, productMock];
        ProductPersistence.prototype.getAll.mockResolvedValueOnce(allProductsMock);
        const allProducts = await productService.getAllProducts();
        expect(ProductPersistence.prototype.getAll).toHaveBeenCalled();
        expect(allProducts).toEqual(allProductsMock);
    });

    it("when given a product ID should return a product that matches this ID", async () => {
        ProductPersistence.prototype.getById.mockResolvedValueOnce(productMock);
        const product = await productService.getProductById(productMock.id);
        expect(ProductPersistence.prototype.getById).toHaveBeenCalledWith(productMock.id);
        expect(product).toEqual(productMock);
    });

    it("when given a product ID should delete a product that matches this ID", async () => {
        await productService.deleteProduct(productMock.id);
        expect(ProductPersistence.prototype.delete).toHaveBeenCalledWith(productMock.id);
    });
});
