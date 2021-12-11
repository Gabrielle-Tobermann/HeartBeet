using Dapper;
using HeartBeet.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
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

        public IEnumerable<Donation> GetAllDonations()
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"select * from Donation";

            var donations = db.Query<Donation>(sql);

            return donations;
        }
    }
}
