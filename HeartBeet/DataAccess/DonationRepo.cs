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

            var sql = @"select * from Donation";

            var donations = db.Query<Donation>(sql);

            return donations;
        }

        internal void AddDonation(Donation newDonation, List<DonationFood> items)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"INSERT INTO [dbo].[Donation]
                       ([isDelivery]
                       ,[donorId]
                       ,[locationId]
                       ,[deliveryLocationId])
                        Output inserted.Id
                     VALUES
                           (@isDelivery
                           ,@donorId
                           ,@locationId
                           ,@deliveryLocationId)";

            var donationId = db.ExecuteScalar<Guid>(sql, newDonation);
            newDonation.Id = donationId;

            var itemsSql = @"INSERT INTO [dbo].[Item]
                               ([donationId]
                               ,[food]
                               ,[quantity]
                               ,[datePrepared]
                               ,[bestBy])
                                Output inserted.Id
                             VALUES
                                   (@donationId
                                   ,@food
                                   ,@quantity
                                   ,@datePrepared
                                   ,@bestBy)";

            foreach (var item in items)
            {
                var itemParams = new
                {
                    Id = new Guid(),
                    DonationId = newDonation.Id,
                    food = item.Food,
                    Quantity = item.Quantity,
                    DatePrepared = item.DatePrepared,
                    BestBy = item.BestBy
                };

                var itemId = db.ExecuteScalar<Guid>(itemsSql, itemParams);
                item.Id = itemId;
            }


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
                          ,[softDelete] = @softDelete
                            output inserted.*
                         WHERE id = @id";

            id = donation.Id;
            var updateDonation = db.QuerySingleOrDefault<Donation>(sql, donation);

            return updateDonation;
        }
    }
}
