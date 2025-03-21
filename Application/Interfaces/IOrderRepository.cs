using Domain;

namespace Application.Interfaces;

public interface IOrderRepository
{
    Task<List<Order>> GetOrdersList(string userEmail);
    Task<bool> AddOrder(Order order);
}
