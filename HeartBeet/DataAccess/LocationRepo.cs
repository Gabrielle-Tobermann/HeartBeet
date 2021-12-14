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

        internal void AddLocation(Location newLocation)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"INSERT INTO [dbo].[Location]
                       ([userId]
                       ,[street]
                       ,[city]
                       ,[state]
                       ,[zip])
                        Output inserted.Id
                         VALUES
                               (@userId
                               ,@street
                               ,@city
                               ,@state
                               ,@zip)";

            var locationId = db.ExecuteScalar<Guid>(sql, newLocation);
            newLocation.Id = locationId;

        }

        internal Location UpdateLocation(Guid id, Location location)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"UPDATE [dbo].[Location]
                       SET [userId] = @userId
                          ,[street] = @street
                          ,[city] = @city
                          ,[state] = @state
                          ,[zip] = @zip
                          ,[softDelete] = @softDelete
                        output inserted.*
                     WHERE id = @id";

            id = location.Id;
            var updateLocation = db.QuerySingleOrDefault<Location>(sql, location);

            return updateLocation;
        }
    }
}
