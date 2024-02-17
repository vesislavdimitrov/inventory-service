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
        jest.spyOn(ProductPersistence.prototype, "create");
    });

    describe("When creating a Product entry", () => {
        it("should successfully create a product if the correct values are passesd", async () => {
            productService.createProduct(productData);
            ProductPersistence.prototype.create.mockResolvedValueOnce(
                productMock
            );
            expect(ProductPersistence.prototype.create).toHaveBeenCalledWith(
                expect.objectContaining(productData)
            );
        });

        it("should throw IllegalArgumentError when creating a product with an empty serial number", async () => {
            productData.serialNumber = "";
            ProductPersistence.prototype.create.mockRejectedValueOnce(
                new IllegalArgumentError()
            );
            await expect(async () => {
                await productService.createProduct(productData);
            }).rejects.toThrow(IllegalArgumentError);
        });

        it("should throw IllegalArgumentError when creating a product with an empty MAH", async () => {
            productData.mahName = "";
            ProductPersistence.prototype.create.mockRejectedValueOnce(
                new IllegalArgumentError()
            );
            await expect(async () => {
                await productService.createProduct(productData);
            }).rejects.toThrow(IllegalArgumentError);
        });

        it("should throw IllegalArgumentError when creating a product with an empty name", async () => {
            productData.name = "";
            ProductPersistence.prototype.create.mockRejectedValueOnce(
                new IllegalArgumentError()
            );
            await expect(async () => {
                await productService.createProduct(productData);
            }).rejects.toThrow(IllegalArgumentError);
        });

        it("should throw IllegalArgumentError when creating a product with an invalid expiry date", async () => {
            productData.expiryDate = new Date(2020, 0, 1, 12, 0, 0, 0) / 1000;
            ProductPersistence.prototype.create.mockRejectedValueOnce(
                new IllegalArgumentError()
            );
            await expect(async () => {
                await productService.createProduct(productData);
            }).rejects.toThrow(IllegalArgumentError);
        });

        it("should throw IllegalArgumentError when creating a product with invalid quantity", async () => {
            productData.quantity = -2;
            ProductPersistence.prototype.create.mockRejectedValueOnce(
                new IllegalArgumentError()
            );
            await expect(async () => {
                await productService.createProduct(productData);
            }).rejects.toThrow(IllegalArgumentError);
        });
    });

    /**
     * TODO
     * test the rest of the methods
     */
});
