using Application.Dtos;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CartController(ICartService cartService) : BaseApiController
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<CartResponseDto>> GetCart(int id)
        {
            var cart = await cartService.GetCartAsync(id);

            if (cart == null) return NotFound();

            return cart;
        }

        [HttpPost]
        public async Task<ActionResult<int?>> AddItemToCart(CartRequestDto cartDto)
        {
            var result = await cartService.AddItemToCartAsync(cartDto);

            if (result == null) return BadRequest("Problem updating cart");

            return Ok(result);
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveCartItem(int cartId, int productId, int quantity)
        {
            var result = await cartService.RemoveCartItemAsync(cartId, productId, quantity);

            if (!result) return BadRequest("Problem updating cart");

            return Ok();
        }
    }
}
