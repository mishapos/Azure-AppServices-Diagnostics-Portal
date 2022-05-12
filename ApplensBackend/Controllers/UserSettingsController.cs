using AppLensV3.Models;
using AppLensV3.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppLensV3.Controllers
{
    [Route("api/usersetting")]
    [Produces("application/json")]
    [Authorize(Policy = "ApplensAccess")]
    public class UserSettingsController : Controller
    {
        private ICosmosDBUserSettingHandler _cosmosDBHandler;
        public UserSettingsController(ICosmosDBUserSettingHandler cosmosDBUserSettingHandler)
        {
            _cosmosDBHandler = cosmosDBUserSettingHandler;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserInfo(string userId)
        {
            if (string.IsNullOrWhiteSpace(userId))
            {
                return BadRequest("userId cannot be empty");
            }
            UserSetting user = await _cosmosDBHandler.GetUserSetting(userId);
            if (user == null) return NotFound("");
            return Ok(user);
        }

        [HttpPost("{userId}/favoriteDetectors/{detectorId}")]
        public async Task<IActionResult> PatchFavoriteDetector(string userId, string detectorId,[FromBody] JToken body)
        {
            if(string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(detectorId))
            {
                return BadRequest("userId and detectorId cannot be empty");
            }
            var prop = body.ToObject<FavoriteDetectorProp>();
            var userSetting = await _cosmosDBHandler.AddFavoriteDetector(userId, detectorId, prop);
            return Ok(userSetting);
        }

        [HttpPost("{userId}/theme")]
        public async Task<IActionResult> PathTheme(string userId,[FromBody] JToken body)
        {
            if(string.IsNullOrWhiteSpace(userId))
            {
                return BadRequest("userId cannot be empty");
            }
            var value = body.ToObject<string>();
            var userSetting = await _cosmosDBHandler.PathUserSettingProperty(userId, "theme", value);
            return Ok(userSetting);
        }

        [HttpPost("{userId}/resources")]
        public async Task<IActionResult> PathResources(string userId, [FromBody] JToken body)
        {
            if (string.IsNullOrWhiteSpace(userId))
            {
                return BadRequest("userId cannot be empty");
            }
            var value = body.ToObject<List<RecentResource>>();
            var userSetting = await _cosmosDBHandler.PathUserSettingProperty(userId, "resources", value);
            return Ok(userSetting);
        }

        [HttpPost("{userId}/viewMode")]
        public async Task<IActionResult> PathViewMode(string userId, [FromBody] JToken body)
        {
            if (string.IsNullOrWhiteSpace(userId))
            {
                return BadRequest("userId cannot be empty");
            }
            var value = body.ToObject<string>();
            var userSetting = await _cosmosDBHandler.PathUserSettingProperty(userId, "viewMode", value);
            return Ok(userSetting);
        }

        [HttpPost("{userId}/expandAnalysisCheckCard")]
        public async Task<IActionResult> PathchExpandAnalysisCheckCard(string userId, [FromBody] JToken body)
        {
            if (string.IsNullOrWhiteSpace(userId))
            {
                return BadRequest("userId cannot be empty");
            }
            var value = body.ToObject<string>();
            var userSetting = await _cosmosDBHandler.PathUserSettingProperty(userId, "expandAnalysisCheckCard", value);
            return Ok(userSetting);
        }

        [HttpPost("{userId}/defaultServiceType")]
        public async Task<IActionResult> PathchDefaultServiceType(string userId, [FromBody] JToken body)
        {
            if (string.IsNullOrWhiteSpace(userId))
            {
                return BadRequest("userId cannot be empty");
            }
            var value = body.ToObject<string>();
            var userSetting = await _cosmosDBHandler.PathUserSettingProperty(userId, "defaultServiceType", value);
            return Ok(userSetting);
        }


        [HttpPost]
        public async Task<IActionResult> CreateOrUpdateResources([FromBody] JToken body)
        {
            var userSetting = body.ToObject<UserSetting>();
            var updatedUserSetting = await _cosmosDBHandler.UpdateUserSetting(userSetting);
            return Ok(updatedUserSetting);
        }


        [HttpDelete("{userId}/favoriteDetectors/{detectorId}")]
        public async Task<IActionResult> RemoveFavoriteDetector(string userId, string detectorId)
        {
            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(detectorId))
            {
                return BadRequest("userId and detectorId cannot be empty");
            }
            var userSetting = await _cosmosDBHandler.RemoveFavoriteDetector(userId, detectorId);
            return Ok(userSetting);
        }
    }
}
