using FluentEmail.Core;
using FluentEmail.Smtp;
using HeartBeet.DataAccess;
using HeartBeet.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace HeartBeet.Controllers
{
    [Route("api/donations")]
    [ApiController]
    [AllowAnonymous]
    public class DonationsController : ControllerBase
    {
        DonationRepo _repo;
        UserRepo _userRepo;
        readonly IConfiguration _config;

        public DonationsController(IConfiguration config,
            DonationRepo repo,
            UserRepo userRepo)
        {
            _repo = repo;
            _userRepo = userRepo;
            _config = config;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var donations = _repo.GetAllDonations();

            return Ok(donations);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var donation = _repo.GetDonationById(id);
            return Ok(donation);
        }

        [HttpPost]
        public IActionResult AddDonation(Donation donation)
        {
            _repo.AddDonation(donation);

            return Created($"api/donations/{donation.Id}", donation);
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
        public async Task ClaimDonation(Guid id)
        {
            var donation = _repo.GetDonationById(id);
            var donor = _userRepo.GetUserById(donation.DonorId);

            if (donation == null)
            {
                NotFound("User not found.");
            }

            donation.Claimed = !donation.Claimed;

            var sender = new SmtpSender(() => new SmtpClient()
            {
                Host = "smtp.gmail.com",
                Port = 587,
                Credentials = new System.Net.NetworkCredential("heartbeet.donations@gmail.com", _config["gmailPassword"]),
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
            });

            Email.DefaultSender = sender;

            var email = await Email
                .From(emailAddress: "gabrielle.tobermann@gmail.com")
                .To(emailAddress: $"{donor.Email}")
                .Subject(subject: "Donation Claimed")
                .Body(body: "Good News! Someone has claimed your donation.")
                .SendAsync();

            _repo.UpdateDonation(id, donation);
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
