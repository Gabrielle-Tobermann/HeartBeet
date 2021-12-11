using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HeartBeet.Models
{
    public class Donation
    {
        public Guid Id { get; set; }
        public bool IsDelivery { get; set; }
        public Guid DonorId { get; set; }
        public Guid RecipientId { get; set; }
        public bool Claimed { get; set; }
        public bool Received { get; set; }
        public Guid LocationId { get; set; }
        public Guid DeliveryLocationId { get; set; }
    }
}
