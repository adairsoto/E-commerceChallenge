namespace Domain;

public class Cart
{
    public int Id { get; set; } 
    public required string CartToken { get; set; } 
    public List<CartItem> Items { get; set; } = [];
}
