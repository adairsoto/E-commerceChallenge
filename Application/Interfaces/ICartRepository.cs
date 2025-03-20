using Domain;

namespace Application.Interfaces;

public interface ICartRepository
{
    Task<Cart?> GetCart(int id);
    Task AddCart(Cart cart);
    Task<bool> UpdateCartAsync(Cart cart);
}
