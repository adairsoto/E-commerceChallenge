using Application.Dtos;
using Domain;

namespace Application.Interfaces;

public interface ICartService
{
    Task<CartResponseDto?> GetCartAsync(int id);
    Task<bool> AddItemToCartAsync(CartRequestDto cartDto);
    Task<bool> RemoveCartItemAsync(CartRequestDto cartDto);
}
