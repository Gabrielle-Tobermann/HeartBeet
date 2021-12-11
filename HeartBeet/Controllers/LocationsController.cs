using HeartBeet.DataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HeartBeet.Controllers
{
    [Route("api/locations")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        LocationRepo _repo;

        public LocationsController(LocationRepo repo)
        {
            _repo = repo;
        }

        [HttpGet("{id}")]
        public IActionResult GetLocation(Guid id)
        {
            var location = _repo.GetLocation(id);

            if (location == null)
            {
                NotFound("Location not found.");
            }

            return Ok(location);
        }
    }
}
