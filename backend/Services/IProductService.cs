using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.DTOs;

namespace backend.Services;

public interface IProductService<T>
{
    Product GetByPartNumber(string partNumber);
    Task<ActionResult<Product>> Create(CreateProductDto product);
    Task<ActionResult<Product>> Update(string partNumber, CreateProductDto product);
}