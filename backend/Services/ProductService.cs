using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Validator;
using backend.Models;
using backend.DTOs;

namespace backend.Services;

public class ProductService : IProductService<Product>
{
    private readonly ProductValidator _productValidator;
    private readonly ILogger<ProductService> _logger;
    private readonly ApplicationDbContext _context;

    public ProductService(ILogger<ProductService> logger, ApplicationDbContext context, ProductValidator productValidator)
    {
        _productValidator = productValidator;
        _logger = logger;
        _context = context;
    }

    public Product GetByPartNumber(string partNumber)
    {
        var product = _context.Products
            .Where(p => p.PartNumber == partNumber)
            .FirstOrDefault();

        if (product == null)
            throw new KeyNotFoundException($"Product with part number {partNumber} not found");

        return product;
    }

    public async Task<ActionResult<Product>> Create(CreateProductDto product)
    {
        var validationResult = _productValidator.Validate(product);
        if (!validationResult.IsValid)
            throw new InvalidOperationException(validationResult.Errors[0].ErrorMessage);

        var existingProduct = _context.Products
            .Where(p => p.PartNumber == product.PartNumber)
            .FirstOrDefault();

        if (existingProduct != null)
            throw new InvalidOperationException($"Product with part number {product.PartNumber} already exists");

        Product productToCreate = new()
        {
            Name = product.Name,
            PartNumber = product.PartNumber,
            Color = product.Color,
            Size = product.Size
        };

        _context.Products.Add(productToCreate);
        await _context.SaveChangesAsync();

        return _context.Products
            .Where(p => p.PartNumber == product.PartNumber)
            .FirstOrDefault();
    }

    public async Task<ActionResult<Product>> Update(string PartNumber, CreateProductDto product)
    {
        var validationResult = _productValidator.Validate(product);
        _logger.LogInformation($"PartNumber: {PartNumber}");
        if (!validationResult.IsValid)
            throw new ArgumentException(validationResult.Errors[0].ErrorMessage);

        var existingProduct = _context.Products
            .Where(p => p.PartNumber == PartNumber)
            .FirstOrDefault();

        if (existingProduct == null)
            throw new KeyNotFoundException($"Product with part number {PartNumber} not found");

        existingProduct.Name = product.Name;
        existingProduct.PartNumber = product.PartNumber;
        existingProduct.Color = product.Color;
        existingProduct.Size = product.Size;

        await _context.SaveChangesAsync();

        return _context.Products
            .Where(p => p.PartNumber == product.PartNumber)
            .FirstOrDefault();
    }
}