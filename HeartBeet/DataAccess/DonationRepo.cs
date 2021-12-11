using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HeartBeet.DataAccess
{
    public class DonationRepo
    {
        string _connectionString;

        public DonationRepo(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("HeartBeet");
        }
    }
}
