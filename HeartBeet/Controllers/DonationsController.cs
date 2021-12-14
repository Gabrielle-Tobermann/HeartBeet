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

        [HttpPut("{id}")]
        public IActionResult Update(Guid id, Donation donation)
        {
            var updateItem = _repo.UpdateDonation(id, donation);

            return Ok(updateItem);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            _repo.DeleteDonation(id);

            return Ok();
        }

        [HttpPut("claim/{id}")]
        public IActionResult ClaimDonation(Guid id)
        {
            var donation = _repo.GetDonationById(id);

            if (donation == null)
            {
                NotFound("User not found.");
            }

            donation.Claimed = !donation.Claimed;

            return Ok(_repo.UpdateDonation(id, donation));
        }

        [HttpPut("receive/{id}")]
        public IActionResult ReceiveDonation(Guid id)
        {
            var donation = _repo.GetDonationById(id);

            if (donation == null)
            {
                NotFound("User not found.");
            }

            donation.Received = !donation.Received;

            return Ok(_repo.UpdateDonation(id, donation));
        }

    }
}
