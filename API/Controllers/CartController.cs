using Application.Dtos;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController(ICartService cartService) : ControllerBase
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<CartResponseDto>> GetCart(int id)
        {
            var cart = await cartService.GetCartAsync(id);

            if (cart == null) return NotFound();

            return cart;
        }

        [HttpPost]
        public async Task<ActionResult> AddItemToCart(CartRequestDto cartDto)
        {
            var result = await cartService.AddItemToCartAsync(cartDto);

            if (!result) return BadRequest("Problem updating cart");

            return Ok();
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveCartItem(CartRequestDto cartDto)
        {
            var result = await cartService.RemoveCartItemAsync(cartDto);

            if (!result) return BadRequest("Problem updating cart");

            return Ok();
        }
    }
}
