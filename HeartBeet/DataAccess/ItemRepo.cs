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
    public class ItemRepo
    {
        string _connectionString;

        public ItemRepo(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("HeartBeet");
        }

        internal IEnumerable<Item> GetDonationItems(Guid id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"select *
                        from Item
                        where donationId = @id";

            var items = db.Query<Item>(sql, new { id });

            return items;
        }
    }
}
