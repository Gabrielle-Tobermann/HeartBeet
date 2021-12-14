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
                        from [User]
                        where id = @id";

            var user = db.QueryFirstOrDefault<User>(sql, new { id });

            return user;
        }

        internal void AddUser(User newUser)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"INSERT INTO [dbo].[User]
                       ([name]
                       ,[email]
                       ,[userType])
                        Output inserted.Id
                        VALUES
                            (@name
                            ,@email
                            ,@userType)";

            var userId = db.ExecuteScalar<Guid>(sql, newUser);
            newUser.Id = userId;
        }

        internal User UpdateUser(Guid id, User user)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"UPDATE [dbo].[User]
                       SET [uid] = @uid
                          ,[name] = @name
                          ,[email] = @email
                          ,[userType] = @userType
                        output inserted.*
                     WHERE id = @id";

            id = user.Id;
            var updateUser = db.QuerySingleOrDefault<User>(sql, user);

            return updateUser;
        }
    }
}
