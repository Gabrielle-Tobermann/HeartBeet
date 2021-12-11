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
    public class LocationRepo
    {
        string _connectionString;

        public LocationRepo(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("HeartBeet");
        }

        internal Location GetLocation(Guid id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"select *
                        from Location
                        where id = @id";

            var location = db.QueryFirstOrDefault<Location>(sql, new { id });

            return location;
        }

        internal IEnumerable<Location> GetUserLocation(Guid id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"select *
                        from Location
                        where userId = @id";

            var locations = db.Query<Location>(sql, new { id });

            return locations;
        }
    }
}
