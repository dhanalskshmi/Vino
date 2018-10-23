using System.Collections.Generic;
using System.Net.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Text.RegularExpressions;
using Skybrud.Social.Facebook;
using Skybrud.Social.Facebook.OAuth;
using Skybrud.Social.Facebook.Options.Pages;
using Skybrud.Social.Facebook.Options.Posts;
using Skybrud.Social.Twitter;
using Skybrud.Social.Twitter.OAuth;
using Skybrud.Social.Twitter.Responses;
using Skybrud.Social.Instagram;
using Skybrud.Social.Instagram.Objects;
using Skybrud.Social.Instagram.Responses;
using Skybrud.Social.Instagram.OAuth;
using System;
using Google.Apis.YouTube.v3;
using Google.Apis.Services;
using ManasquanBank.Web.Helpers;

namespace ManasquanBank.Web.Controllers
{
    using System;

    using Skybrud.Social;
    using Skybrud.Social.Facebook.Responses.Posts;

    public class SocialFeedController : Umbraco.Web.WebApi.UmbracoApiController
    {
        public dynamic GetInstagramTimeline()
        {

           InstagramService service = InstagramService.CreateFromAccessToken("1313031959.87552ec.4189d55d32af42baa34f329cb2c1e108");

           return service.Users.GetRecentMedia();
               
        }
        public dynamic GetTwitterTimeline()
        {
            const string CacheKey = "TwitterTimeline";

            TwitterOAuthClient client = new TwitterOAuthClient
            {
                ConsumerKey = "Dz6hIYXCUjmu1c64kX4Ni28oQ",
                ConsumerSecret = "1DOoYvighjAGph6iSXhv0lljiKT8uYP5cjI6A8VuehNWgorj36",
                
            };

            // Initialize a new service instance from the OAuth client
            TwitterService service = TwitterService.CreateFromOAuthClient(client);
             // make call to api, caching results for 1 hour
            var response = ApplicationContext.ApplicationCache.RuntimeCache.GetCacheItem(CacheKey, () => service.Statuses.GetUserTimeline("ManasquanBank"), new TimeSpan(1, 0, 0)) as TwitterTimelineResponse;

            var responseContent = string.Empty;
            if (response != null)
            {
                responseContent = response.Body.ToJson();
            }

            // When using the ToJson() as the response directly the quotes were escaped in the string and it caused a js error. Using HttpResponseMessage was the solution.
            return responseContent;

        }

        public string ReplaceFlatUrlWithHTMLUrl(string tweetText, string urlText, string newtab)
        {
            bool newWindow = true;
            if (newtab == "true")
            {
                newWindow = true;
            }
            else
            {
               newWindow = true;
            }
            return tweetText.Replace(urlText, String.Format("<a href=\"{0}\" {1}>{0}</a>", urlText, newWindow ? "target=\"_blank\"" : ""));
        }

        public string ReplaceHashTagsAndUsernamesWithUrls(string tweetText)
        {
            string newText = ReplaceHashtagsWithUrls(tweetText);
            newText = ReplaceTwitterUsernamesWithUrls(newText);
            return newText;
        }

        public string ReplaceTwitterUsernamesWithUrls(string tweetText)
        {
            return Regex.Replace(tweetText, @"@(\w+)", delegate (Match match)
            {
                string domainUrl ="https://twitter.com";
                string userName = match.ToString().Trim();
                return String.Format("<a href=\"{0}/{1}\" target=\"_blank\">{2}</a>", domainUrl.TrimEnd('/'), userName.Substring(1), userName);
            });
        }

        public  dynamic ReplaceMediaUrlWithImgTag(string tweetText, dynamic mediaEntity, bool newWindow = true)
        {
            return mediaEntity;
            //return tweetText.Replace(mediaEntity.url, String.Format("<a href=\"{0}\" {1}><img src=\"{0}\" /></a>", mediaEntity.media_url, newWindow ? "target=\"_blank\"" : ""));
        }
        public dynamic GetRelativeTimeBetweenDates(DateTime startDate, DateTime endDate)
        {
            const int MAXIMUM_DAYS_IN_MONTH = 31;
            const int ONE_MINUTE = 60;
            const int TWO_MINUTES = 120;
            const int ONE_HOUR = 3600;
            const int TWO_HOURS = 7200;
            const int ONE_DAY = 86400;
            const int ONE_WEEK = 7;

            TimeSpan interval = endDate.Subtract(startDate);
            int differenceInDays = (int)interval.TotalDays;
            int differenceInSeconds = (int)interval.TotalSeconds;

            string relativeTime = "";

            if (differenceInDays >= 0 && differenceInDays < MAXIMUM_DAYS_IN_MONTH)
            {
                if (differenceInDays == 0)
                {
                    if (differenceInSeconds < ONE_MINUTE)
                    {
                        relativeTime = "just now";
                    }
                    else if (differenceInSeconds < TWO_MINUTES)
                    {
                        relativeTime = "1 minute ago";
                    }
                    else if (differenceInSeconds < ONE_HOUR)
                    {
                        relativeTime = string.Format("{0} minutes ago", Math.Floor((double)differenceInSeconds / ONE_MINUTE));
                    }
                    else if (differenceInSeconds < TWO_HOURS)
                    {
                        relativeTime = "1 hour ago";
                    }
                    else if (differenceInSeconds < ONE_DAY)
                    {
                        relativeTime = string.Format("{0} hours ago", Math.Floor((double)differenceInSeconds / ONE_HOUR));
                    }
                }
                else if (differenceInDays == 1)
                {
                    DateTime yesterday = endDate.AddDays(-1);
                    if (startDate.Date == yesterday.Date)
                    {
                        relativeTime = "1 day ago";
                    }
                    else
                    {
                        relativeTime = "2 days ago";
                    }
                }
                else if (differenceInDays < ONE_WEEK)
                {
                    relativeTime = string.Format("{0} days ago", differenceInDays);
                }
                else if (differenceInDays < MAXIMUM_DAYS_IN_MONTH)
                {
                    double numberOfWeeks = Math.Ceiling((double)differenceInDays / ONE_WEEK);
                    relativeTime = string.Format("{0} week{1} ago", numberOfWeeks, numberOfWeeks > 1 ? "s" : "");
                }
                else
                {
                    DateTime oneMonthAgo = endDate.AddMonths(-1);
                    if (startDate.Year == oneMonthAgo.Year && startDate.Month == oneMonthAgo.Month)
                    {
                        relativeTime = "last month";
                    }
                    else
                    {
                        relativeTime = startDate.ToString("dd MMM yyyy");
                    }
                }
            }
            return relativeTime;
        }

        public string ReplaceHashtagsWithUrls(string tweetText)
        {
            return Regex.Replace(tweetText, @"#(\w+)", delegate (Match match)
            {
                string hashTag = match.ToString().Trim().Substring(1);
                return String.Format("<a href=\"https://twitter.com/hashtag/{0}?src=hash\" target=\"_blank\">#{0}</a>", hashTag);
            });
        }
        public dynamic GetFacebookFeed_next()
        {
            const string CacheKey = "FacebookPosts";
            long appId = 515374455584877;
            string appSecret = "ec3d1aae876762fd3ec6f50b78017ba0";

            // Initialize the OAuth client (no calls are made at this point)
            FacebookOAuthClient client = new FacebookOAuthClient(appId, appSecret);

            // Get an app token for the application (makes a call to the Facebook API)
            string accessToken = client.GetAppAccessToken();

            // Initialize the service from the access token
            FacebookService service = FacebookService.CreateFromAccessToken(accessToken);

            // set the API version to match version used by the Social Stream php example
            service.Client.Version = "v2.3";

            // Declare the options for the call to the API
            var postsOptions = new FacebookGetPostsOptions("ManasquanBank")
            {
                Fields = "id,message,full_picture,link,name,description,type,icon,created_time,from,object_id,likes,comments",
                Limit = 5
            };

            // retrieve the posts and cache for 1 hour
            var posts = ApplicationContext.ApplicationCache.RuntimeCache.GetCacheItem(CacheKey, () => service.Posts.GetPosts(postsOptions), new TimeSpan(1, 0, 0)) as FacebookPostsResponse;

            var responseContent = string.Empty;
            if (posts != null)
            {
                responseContent = posts.Body.ToJson();
            }

            // When using the ToJson() as the response directly the quotes were escaped in the string and it caused a js error. Using HttpResponseMessage was the solution.
            return responseContent;

        }

        public dynamic GetYoutubeFeed()
        {
            var memCacher = new MemoryCacher();
            var result = memCacher.GetValue("youtubefeed");
            if (result == null)
            {

                YouTubeService yt = new YouTubeService(new BaseClientService.Initializer() { ApiKey = "AIzaSyDYBmEQoIuHY9CsVsaaQIB5cjeoYxYJMPk" });
                var searchListRequest = yt.Search.List("snippet");
                searchListRequest.ChannelId = "UCAV-mBab3tJ_SitM-lXtgAg";
                searchListRequest.MaxResults = 7;
                var searchListResult = searchListRequest.Execute();
                memCacher.Add("youtubefeed", searchListResult.Items, DateTimeOffset.UtcNow.AddHours(1));
                result = searchListResult.Items;
            }
            return result;
        }
    }
}