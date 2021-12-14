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

        [HttpPost]
        public IActionResult Add(Location newLocation)
        {
            _repo.AddLocation(newLocation);

            return Created($"api/users/{newLocation.Id}", newLocation);
        }

        [HttpPut("{id}")]
        public IActionResult Update(Guid id, Location location)
        {
            var updateLocation = _repo.UpdateLocation(id, location);

            return Ok(updateLocation);
        }
    }
}
