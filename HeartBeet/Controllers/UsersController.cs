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

        [HttpPost]
        public IActionResult Add(User newUser)
        {
            _repo.AddUser(newUser);

            return Created($"api/users/{newUser.Id}", newUser);
        }

        [HttpPut("{id}")]
        public IActionResult Update(Guid id, User user)
        {
            var updateUser = _repo.UpdateUser(id, user);

            return Ok(updateUser);
        }
    }
}
