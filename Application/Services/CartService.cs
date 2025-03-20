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
                    ProductId = x.ProductId,
                    Title = x.Product.Title,
                    Price = x.Product.Price,
                    Image = x.Product.Image,
                    Quantity = x.Quantity
                })]
            };
        }

        return null;
    }

    public async Task<bool> AddItemToCartAsync(CartRequestDto cartDto)
    {
        var cart = await cartRepository.GetCart(cartDto.CartId);

        cart ??= await CreateCart();

        var item = cart.Items.FirstOrDefault(x => x.ProductId == cartDto.Product.Id);

        if (item == null)
        {
            cart.Items.Add(new CartItem
            {
                Product = cartDto.Product,
                Quantity = cartDto.Quantity
            });
        }
        else item.Quantity += cartDto.Quantity;

        return await cartRepository.UpdateCartAsync(cart);
    }

    public async Task<bool> RemoveCartItemAsync(CartRequestDto cartDto)
    {
        var cart = await cartRepository.GetCart(cartDto.CartId);

        var item = cart!.Items.FirstOrDefault(x => x.ProductId == cartDto.Product.Id);

        if (item == null) return false;

        item.Quantity -= cartDto.Quantity;

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
