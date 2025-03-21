using Application.Interfaces;
using Domain;

namespace Application.Services;

public class OrderService(IOrderRepository orderRepository) : IOrderService
{
    public async Task<List<Order>> GetOrdersAsync(string userEmail)
    {
        return await orderRepository.GetOrdersList(userEmail);
    }
    public async Task<bool> CreateOrderAsync(Order order)
    {
        return await orderRepository.AddOrder(order);
    }
}
