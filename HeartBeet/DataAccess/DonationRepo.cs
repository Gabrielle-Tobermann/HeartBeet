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

        internal IEnumerable<Donation> GetAllDonations()
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"select * from Donation
                        order by datePosted DESC";

            var itemsSql = @"select * from item
                             where donationId = @donationId";

            var donations = db.Query<Donation>(sql);

            foreach (var donation in donations)
            {
                var items = db.Query<Item>(itemsSql, new { donationId = donation.Id });
                donation.Items = items;
            }
            
            return donations ;
        }

        internal void AddDonation(Donation newDonation)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"INSERT INTO [dbo].[Donation]
                       ([id]
                       ,[isDelivery]
                       ,[donorId]
                       ,[locationId]
                       ,[deliveryLocationId]
                       ,[datePosted]
                       ,[claimed]
                       ,[received])
                        Output inserted.Id
                     VALUES
                           (@id
                           ,@isDelivery
                           ,@donorId
                           ,@locationId
                           ,@deliveryLocationId
                           ,@datePosted
                           ,@claimed
                           ,@received)";

            newDonation.DatePosted = DateTime.Now;
            var donation = db.Query(sql, newDonation);
        }

        internal Donation UpdateDonation(Guid id, Donation donation)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"UPDATE [dbo].[Donation]
                       SET [isDelivery] = @isDelivery
                          ,[donorId] = @donorId
                          ,[recipientId] = @recipientId
                          ,[claimed] = @claimed
                          ,[received] = @received
                          ,[locationId] = @locationId
                          ,[deliveryLocationId] = @deliveryLocationId
                          ,[datePosted] = @datePosted
                            output inserted.*
                         WHERE id = @id";

            id = donation.Id;
            var updateDonation = db.QuerySingleOrDefault<Donation>(sql, donation);

            return updateDonation;
        }

        internal void DeleteDonation(Guid id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"DELETE FROM [dbo].[Donation]
                        WHERE id = @id";

            var delete = db.QuerySingleOrDefault<Donation>(sql, new { id });
        }

        internal Donation GetDonationById(Guid id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"select * 
                        from Donation
                        where id = @id";

            var Donation = db.QuerySingleOrDefault<Donation>(sql, new { id });

            return Donation;
        }
    }
}
