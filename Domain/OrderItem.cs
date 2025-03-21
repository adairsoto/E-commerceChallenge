using System.ComponentModel.DataAnnotations.Schema;

namespace Domain;

[Table("OrderItems")]
public class OrderItem
{
    public int Id { get; set; }
    public required string ProductTitle { get; set; }
    public int Quantity { get; set; }
}