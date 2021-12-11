using HeartBeet.DataAccess;
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
    }
}
