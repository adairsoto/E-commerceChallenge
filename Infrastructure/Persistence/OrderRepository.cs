using Application.Interfaces;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public class OrderRepository(AppDbContext context) : IOrderRepository
{
    public async Task<List<Order>> GetOrdersList(string userEmail)
    {
        return await context.Orders
            .Where(x => x.CustomerEmail == userEmail)
            .Include(x => x.OrderItems)
            .ToListAsync();
    }
    public async Task<bool> AddOrder(Order order)
    {
        await context.Orders.AddAsync(order);

        return await context.SaveChangesAsync() > 0;
    }
}
