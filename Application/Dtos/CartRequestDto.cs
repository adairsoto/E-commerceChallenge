using Domain;

namespace Application.Dtos;

public class CartRequestDto
{
    public required Product Product { get; set; }
    public int Quantity { get; set; }
    public int CartId { get; set; }
}
