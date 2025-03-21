namespace Domain;

public class Order
{
    public int Id { get; set; }
    public required string CustomerEmail { get; set; }
    public List<OrderItem> OrderItems { get; set; } = [];
    public decimal Total { get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.Now;
}
