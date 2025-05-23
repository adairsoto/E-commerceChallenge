using System.ComponentModel.DataAnnotations.Schema;

namespace Domain;

[Table("CartItems")]
public class CartItem
{
    public int Id { get; set; }
    public int Quantity { get; set; }
    public int ProductId { get; set; }
    public required Product Product { get; set; }
    public int CartId { get; set; }
    public Cart Cart { get; set; } = null!;
}
