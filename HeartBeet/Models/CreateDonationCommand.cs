using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HeartBeet.Models
{
    public class CreateDonationCommand
    {
        public Donation Donation { get; set; }
        public List<DonationFood> Food { get; set; }
    }
}
