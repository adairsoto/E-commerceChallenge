namespace Domain;

public class Product
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public required string Title { get; set; }
    public decimal Price { get; set; }
    public required string Description { get; set; }
    public required string Image { get; set; }
}
