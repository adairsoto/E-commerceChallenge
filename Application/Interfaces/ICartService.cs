using Application.Dtos;

namespace Application.Interfaces;

public interface ICartService
{
    Task<CartResponseDto?> GetCartAsync(int id);
    Task<int?> AddItemToCartAsync(CartRequestDto cartDto);
    Task<bool> RemoveCartItemAsync(int cartId, int productId, int quantity);
}
