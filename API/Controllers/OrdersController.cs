using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class OrdersController(IOrderService orderService) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Order>>> GetOrders(string userEmail)
    {
        var orders = await orderService.GetOrdersAsync(userEmail);

        if (orders == null) return NoContent();

        return Ok(orders);
    }

    [HttpPost]
    public async Task<ActionResult> CreateOrder(Order order)
    {
        var result = await orderService.CreateOrderAsync(order);

        if (!result) return BadRequest("Problem creating order");

        return Ok();
    }
}
