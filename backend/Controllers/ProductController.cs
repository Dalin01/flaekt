using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.DTOs;
using backend.Data;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ProductController> _logger;
        private readonly IProductService<Product> _productService;

        public ProductController(ILogger<ProductController> logger, ApplicationDbContext context, IProductService<Product> productService)
        {
            _logger = logger;
            _context = context;
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            try
            {
                var products = await _context.Products.ToListAsync();

                return Ok(products);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting products");

                return StatusCode(500);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(CreateProductDto product)
        {
            try
            {
                var createdProduct = await _productService.Create(product);

                return Ok(createdProduct);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating product");

                return StatusCode(500);
            }
        }

        [HttpGet("{PartNumber}")]
        public IActionResult GetProduct(string PartNumber)
        {
            try
            {
                var product = _productService.GetByPartNumber(PartNumber);

                return Ok(product);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting product");
                return StatusCode(500);
            }
        }

        [HttpPut("{PartNumber}")]
        public async Task<IActionResult> PutProduct(string PartNumber, CreateProductDto product)
        {
            try
            {
                var updatedProduct = await _productService.Update(PartNumber, product);

                return Ok(updatedProduct);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating product");
                return StatusCode(500);
            }
        }
    }
}
