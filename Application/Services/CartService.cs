using Application.Dtos;
using Application.Interfaces;
using Domain;

namespace Application.Services;

public class CartService(ICartRepository cartRepository) : ICartService
{
    public async Task<CartResponseDto?> GetCartAsync(int id)
    {
        var cart = await cartRepository.GetCart(id);

        if (cart != null)
        {
            return new CartResponseDto
            {
                Id = cart.Id,
                Items = [.. cart.Items.Select(x => new CartItemDto
                {
                    ProductId = x.Product.ProductId,
                    Title = x.Product.Title,
                    Price = x.Product.Price,
                    Image = x.Product.Image,
                    Quantity = x.Quantity
                })]
            };
        }

        return null;
    }

    public async Task<int?> AddItemToCartAsync(CartRequestDto cartDto)
    {
        var cart = await cartRepository.GetCart(cartDto.CartId);

        cart ??= await CreateCart();

        var item = cart.Items.FirstOrDefault(x => x.Product.ProductId == cartDto.Product.ProductId);

        if (item == null)
        {
            cart.Items.Add(new CartItem
            {
                Product = cartDto.Product,
                Quantity = cartDto.Quantity
            });
        }
        else item.Quantity += cartDto.Quantity;

        var result = await cartRepository.UpdateCartAsync(cart);

        if (result) return cart.Id;

        return null;
    }

    public async Task<bool> RemoveCartItemAsync(int cartId, int productId, int quantity)
    {
        var cart = await cartRepository.GetCart(cartId);

        var item = cart!.Items.FirstOrDefault(x => x.Product.ProductId == productId);

        if (item == null) return false;

        item.Quantity -= quantity;

        if (item.Quantity <= 0) cart.Items.Remove(item);

        return await cartRepository.UpdateCartAsync(cart);
    }

    private async Task<Cart> CreateCart()
    {
        var cart = new Cart();

        await cartRepository.AddCart(cart);

        return cart;
    }

}
