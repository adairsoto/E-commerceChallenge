namespace Domain;

public class Order
{
    public int Id { get; set; }
    public required string CustomerEmail { get; set; }
    public List<Product> Products { get; set; } = [];
}
