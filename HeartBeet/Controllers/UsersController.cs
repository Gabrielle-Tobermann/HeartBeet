using HeartBeet.DataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HeartBeet.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        UserRepo _repo;

        public UsersController(UserRepo repo)
        {
            _repo = repo;
        }

        [HttpGet("{id}")]
        public IActionResult GetUser(Guid id)
        {
            var user = _repo.GetUserByUserId(id);

            if (user == null)
            {
                NotFound("User not found.");
            }

            return Ok(user);
        }
    }
}
