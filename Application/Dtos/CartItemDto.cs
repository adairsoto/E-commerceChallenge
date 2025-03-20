namespace Application.Dtos;

public class CartItemDto
{
    public int ProductId { get; set; }
    public required string Title { get; set; }
    public decimal Price { get; set; }
    public required string Image { get; set; }
    public int Quantity { get; set; }
}