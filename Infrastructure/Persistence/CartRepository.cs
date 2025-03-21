using Application.Interfaces;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public class CartRepository(AppDbContext context) : ICartRepository
{
    public async Task<Cart?> GetCart(int id)
    {
        return await context.Carts
            .Include(x => x.Items)
            .ThenInclude(x => x.Product)
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task AddCart(Cart cart)
    {
        await context.Carts.AddAsync(cart);

        await context.SaveChangesAsync();
    }

    public async Task<bool> UpdateCartAsync(Cart cart)
    {
        return await context.SaveChangesAsync() > 0;
    }
}
