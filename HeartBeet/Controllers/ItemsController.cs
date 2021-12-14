using HeartBeet.DataAccess;
using HeartBeet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HeartBeet.Controllers
{
    [Route("api/items")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        ItemRepo _repo;

        public ItemsController(ItemRepo repo)
        {
            _repo = repo;
        }

        [HttpGet("{donationId}")]
        public IActionResult GetDonationItems(Guid donationId)
        {
           var items =  _repo.GetDonationItems(donationId);

            if (items == null)
            {
                NotFound("This donation does not have any items.");
            }

            return Ok(items);
        }

        [HttpPost]
        public IActionResult Add(Item newItem)
        {
            _repo.AddItem(newItem);

            return Created($"api/users/{newItem.Id}", newItem);
        }

        [HttpPut("{id}")]
        public IActionResult Update(Guid id, Item item)
        {
           var updateItem =  _repo.UpdateItem(id, item);

            return Ok(updateItem);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            _repo.DeleteItem(id);

            return Ok();
        }
    }
}
