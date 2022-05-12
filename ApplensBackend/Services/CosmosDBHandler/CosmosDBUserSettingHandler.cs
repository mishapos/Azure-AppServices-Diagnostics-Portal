using AppLensV3.Models;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AppLensV3.Services
{
    public class CosmosDBUserSettingHandler : CosmosDBHandlerBase<UserSetting>, ICosmosDBUserSettingHandler
    {
        const string collectionId = "UserInfo";
        public CosmosDBUserSettingHandler(IConfiguration configration) : base(configration)
        {
            CollectionId = collectionId;
            Inital(configration).Wait();
        }

        public Task<UserSetting> UpdateUserSetting(UserSetting userSetting)
        {
            return UpdateItemAsync(userSetting, UserSettingConstant.PartitionKey);
        }

        public async Task<UserSetting> AddRecentResources(string id, List<RecentResource> recentResources)
        {
            var patchOperations = new[]
            {
                PatchOperation.Add("/resources",recentResources)
            };
            return await Container.PatchItemAsync<UserSetting>(id, new PartitionKey(UserSettingConstant.PartitionKey), patchOperations);
        }

        public async Task<UserSetting> RemoveFavoriteDetector(string id, string detectorId)
        {
            try
            {
                var patchOperations = new[]
            {
                PatchOperation.Remove($"/favoriteDetectors/{detectorId}")
            };
                return await Container.PatchItemAsync<UserSetting>(id, new PartitionKey(UserSettingConstant.PartitionKey), patchOperations);
            }
            catch (CosmosException e)
            {
                Console.WriteLine(e.ToString());
                return await GetUserSetting(id);
            }

            //var patchOperations = new[]
            //{
            //    PatchOperation.Remove($"/favoriteDetectors/${detectorId}")
            //};
            //return await Container.PatchItemAsync<UserSetting>(id, new PartitionKey(UserSettingConstant.PartitionKey), patchOperations);

        }

        public async Task<UserSetting> AddFavoriteDetector(string id, string detectorId, FavoriteDetectorProp detectorProp)
        {
            var patchOperations = new[]
            {
                PatchOperation.Add($"/favoriteDetectors/{detectorId}", detectorProp)
            };
            //If number of faviorite detectors over a given threshold, then patch faild and throw exception to UI
            var pathcItemRequiredOption = new PatchItemRequestOptions()
            {
                FilterPredicate = "FROM X WHERE "
            };
            return await Container.PatchItemAsync<UserSetting>(id, new PartitionKey(UserSettingConstant.PartitionKey), patchOperations);
        }

        public Task<UserSetting> PathUserSettingProperty(string id,string property,object value)
        {
            return PathItemAsync(id, UserSettingConstant.PartitionKey, property, value);
        }



        public async Task<UserSetting> GetUserSetting(string id)
        {
            UserSetting userSetting = null;
            userSetting = await GetItemAsync(id, UserSettingConstant.PartitionKey);
            if (userSetting == null)
            {
                var newUserSetting = new UserSetting(id);
                userSetting = await CreateItemAsync(newUserSetting);
            }
            return userSetting;
        }

    }
}
