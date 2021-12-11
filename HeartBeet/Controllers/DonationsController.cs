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
    [Route("api/donations")]
    [ApiController]
    public class DonationsController : ControllerBase
    {
        DonationRepo _repo;

        public DonationsController(DonationRepo repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var donations = _repo.GetAllDonations();

            return Ok(donations);
        }

        [HttpPost]
        public IActionResult AddDonation(CreateDonationCommand command)
        {
            var _donation = command.Donation;
            var _food = command.Food;

            _repo.AddDonation(_donation, _food);

            return Created($"api/donations/{_donation.Id}", _donation);
        }

    }
}
