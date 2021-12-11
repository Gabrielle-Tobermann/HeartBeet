using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HeartBeet.DataAccess
{
    public class LocationRepo
    {
        string _connectionString;

        public LocationRepo(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("HeartBeet");
        }
    }
}
