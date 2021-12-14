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

        internal void AddItem(Item newItem)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"INSERT INTO [dbo].[Item]
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

            var itemId = db.ExecuteScalar<Guid>(sql, newItem);
            newItem.Id = itemId;

        }

        internal Item UpdateItem(Guid id, Item item)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"UPDATE [dbo].[Item]
                       SET [donationId] = @donationId
                          ,[food] = @food
                          ,[quantity] = @quantity
                          ,[datePrepared] = @datePrepared
                          ,[bestBy] = @bestBy
                     WHERE id = @id";

            id = item.Id;
            var updateItem = db.QuerySingleOrDefault<Item>(sql, item);

            return updateItem;
        }
    }
}
