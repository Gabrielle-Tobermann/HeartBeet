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
    public class UserRepo
    {
        string _connectionString;

        public UserRepo(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("HeartBeet");
        }

        internal User GetUserByUserId(Guid id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"select *
                        from User
                        where id = @id";

            var user = db.QueryFirstOrDefault<User>(sql, new { id });

            return user;
        }
    }
}
