using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HeartBeet.DataAccess
{
    public class ItemRepo
    {
        string _connectionString;

        public ItemRepo(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("HeartBeet");
        }
    }
}
