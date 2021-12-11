using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HeartBeet.Models
{
    public class Item
    {
        public Guid Id { get; set; }
        public Guid DonationId { get; set; }
        public string Food { get; set; }
        public string Quantity { get; set; }
        public DateTime DatePrepared { get; set; }
        public DateTime BestBy { get; set; }

    }
}
