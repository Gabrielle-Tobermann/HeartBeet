using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HeartBeet.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Uid { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string UserType { get; set; }
        public bool SoftDelete { get; set; }
    }
}
