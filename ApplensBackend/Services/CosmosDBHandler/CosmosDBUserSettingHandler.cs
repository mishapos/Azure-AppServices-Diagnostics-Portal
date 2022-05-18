using AppLensV3.Models;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AppLensV3.Services
{
    public class CosmosDBUserSettingHandler : CosmosDBHandlerBase<UserSetting>, ICosmosDBUserSettingHandler
    {
        const string collectionId = "UserInfo";
        private readonly ILogger _logger;
        public CosmosDBUserSettingHandler(IConfiguration configration, ILogger<CosmosDBUserSettingHandler> logger) : base(configration)
        {
            CollectionId = collectionId;
            Inital(configration).Wait();
            _logger = logger;

        }

        public Task<UserSetting> UpdateUserSetting(UserSetting userSetting)
        {
            return UpdateItemAsync(userSetting, UserSettingConstant.PartitionKey);
        }

        public async Task<UserSetting> PatchLandingInfo(string id, List<RecentResource> resources, string defaultServiceType)
        {
            try
            {
                var patchOperations = new[]
                {
                    PatchOperation.Add("/resources",resources),
                    PatchOperation.Add("/defaultServiceType",defaultServiceType)
                };
                _logger.LogInformation("Patch Landing Info");
                return await Container.PatchItemAsync<UserSetting>(id, new PartitionKey(UserSettingConstant.PartitionKey), patchOperations);
            }catch(CosmosException e)
            {
                _logger.LogError("Patch Landing Info." + e.Message.ToString());
                throw;
            }
            
        }

        public async Task<UserSetting> RemoveFavoriteDetector(string id, string detectorId)
        {
            var patchOperations = new[]
             {
                PatchOperation.Remove($"/favoriteDetectors/{detectorId}")
             };
            return await Container.PatchItemAsync<UserSetting>(id, new PartitionKey(UserSettingConstant.PartitionKey), patchOperations);
        }

        public async Task<UserSetting> AddFavoriteDetector(string id, string detectorId, FavoriteDetectorProp detectorProp)
        {
            try
            {
                var patchOperations = new[]
                {
                PatchOperation.Add($"/favoriteDetectors/{detectorId}", detectorProp)
                };

                return await Container.PatchItemAsync<UserSetting>(id, new PartitionKey(UserSettingConstant.PartitionKey), patchOperations);
            }
            catch (CosmosException e)
            {
                if (e.Message.Contains("Operation can only create a child object of an existing node"))
                {
                    var patchOperations = new[]
                    {
                        PatchOperation.Add("/favoriteDetectors",new Dictionary<string,FavoriteDetectorProp>()),
                        PatchOperation.Add($"/favoriteDetectors/{detectorId}", detectorProp)
                    };

                    return await Container.PatchItemAsync<UserSetting>(id, new PartitionKey(UserSettingConstant.PartitionKey), patchOperations);
                }
                else
                {
                    throw;
                }
            }
        }

        public Task<UserSetting> PathUserSettingProperty(string id, string property, object value)
        {
            return PathItemAsync(id, UserSettingConstant.PartitionKey, property, value);
        }

        public async Task<UserSetting> PatchUserPanelSetting(string id, string theme, string viewMode, string expandAnalysisCheckCard)
        {
            var patchOperations = new[]
            {
                PatchOperation.Add("/theme",theme),
                PatchOperation.Add("/viewMode",viewMode),
                PatchOperation.Add("/expandAnalysisCheckCard",expandAnalysisCheckCard)
            };
            return await Container.PatchItemAsync<UserSetting>(id, new PartitionKey(UserSettingConstant.PartitionKey), patchOperations);
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
