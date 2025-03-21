using System;
using Domain;

namespace Application.Interfaces;

public interface IOrderService
{
    Task<List<Order>> GetOrdersAsync(string userEmail);
    Task<bool> CreateOrderAsync(Order order);
}
