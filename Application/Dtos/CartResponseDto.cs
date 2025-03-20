namespace Application.Dtos;

public class CartResponseDto
{
    public int Id { get; set; }
    public List<CartItemDto> Items { get; set; } = [];
}
