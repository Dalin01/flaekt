using FluentValidation;
using backend.DTOs;

namespace backend.Validator;

public class ProductValidator : AbstractValidator<CreateProductDto>
{
    public ProductValidator()
    {
        RuleFor(x => x.PartNumber)
            .NotEmpty()
            .WithMessage("PartNumber is required.")
            .Matches(@"^[a-zA-Z0-9]{6,10}$").WithMessage("PartNumber must be between 6 to 10 alphanumeric characters.");
        RuleFor(x => x.Name).NotEmpty().WithMessage("Name is required.");
        RuleFor(x => x.Color).NotEmpty().WithMessage("Color is required.");
    }
}