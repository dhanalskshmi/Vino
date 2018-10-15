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

namespace ManasquanBank.Web.Controllers
{
    using System;

    using Skybrud.Social;
    using Skybrud.Social.Facebook.Responses.Posts;

    public class SocialFeedController : Umbraco.Web.WebApi.UmbracoApiController
    {
        public dynamic GetInstagramTimeline()
        {

            // Initialize and configure the OAuth client
            InstagramOAuthClient client = new InstagramOAuthClient
            {
                ClientId = "69f652275bc240df890a4a5214e1c2a9",
                ClientSecret = "03518cfaa2274e37bb2a36b857b6c748",
                RedirectUri = "http://manasquan.activitystaging.com"
            };

            string state = Guid.NewGuid().ToString();
            string url = client.GetAuthorizationUrl(state);
            InstagramService service = InstagramService.CreateFromOAuthClient(new InstagramOAuthClient
            {
                AccessToken = "1313031959.87552ec.4189d55d32af42baa34f329cb2c1e108",
            });
            
            InstagramUserResponse self = service.Users.GetSelf();
            InstagramRecentMediaResponse recent = service.Users.GetRecentMedia(self.Body.Data.Id);
            return recent;

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

        public string ReplaceHashtagsWithUrls(string tweetText)
        {
            return Regex.Replace(tweetText, @"#(\w+)", delegate (Match match)
            {
                string hashTag = match.ToString().Trim().Substring(1);
                return String.Format("<a href=\"https://twitter.com/hashtag/{0}?src=hash\" target=\"_blank\">#{0}</a>", hashTag);
            });
        }

        public HttpResponseMessage GetFacebookFeed()
        {
            const string CacheKey = "FacebookPosts";
            long appId = 1573737752916643;
            string appSecret = "ea6f8e2972b969454803f632e723a2f5";

            // Initialize the OAuth client (no calls are made at this point)
            FacebookOAuthClient client = new FacebookOAuthClient(appId, appSecret);

            // Get an app token for the application (makes a call to the Facebook API)
            string accessToken = client.GetAppAccessToken();

            // Initialize the service from the access token
            FacebookService service = FacebookService.CreateFromAccessToken(accessToken);

            // set the API version to match version used by the Social Stream php example
            service.Client.Version = "v2.3";

            // Declare the options for the call to the API
            var postsOptions = new FacebookGetPostsOptions("providentbank")
            {
                Fields = "id,message,picture,link,name,description,type,icon,created_time,from,object_id,likes,comments"
            };

            // retrieve the posts and cache for 1 hour
            var posts = ApplicationContext.ApplicationCache.RuntimeCache.GetCacheItem(CacheKey, () => service.Posts.GetPosts(postsOptions), new TimeSpan(1, 0, 0)) as FacebookPostsResponse;

            var pageOptions = new FacebookGetPageOptions("providentbank") { Fields = "id,link,name" };
            var page = service.Pages.GetPage(pageOptions);

            var socialStreamFacebook = new SocialStreamFacebook();
            socialStreamFacebook.ResponseData = new SocialStreamFaceBookData();
            socialStreamFacebook.ResponseData.Feed = new SocialStreamFacebookFeed();
            socialStreamFacebook.ResponseData.Feed.Link = string.Empty;
            socialStreamFacebook.ResponseData.Feed.Entries = new List<SocialStreamFacebookEntry>();

           foreach (var post in posts.Body.Data)
           {
               if (post.Type == "status" && !string.IsNullOrEmpty(post.Story))
               {
                   continue;
               }

               var message = string.Empty;
               if (!string.IsNullOrEmpty(post.Message))
               {
                   message = post.Message.Replace("\n", "<br>");
               } 
               else if (!string.IsNullOrEmpty(post.Story))
               {
                   message = post.Story;
               }

               if (!string.IsNullOrEmpty(post.Description))
               {
                   message = string.Format("{0} {1}", post.Message, post.Description);
               }

               var image = post.Picture;
               var objectId = post.ObjectId;

               if (image != null)
               {
                   if (string.IsNullOrEmpty(objectId) && post.Type != "video")
                   {
                       var picId = image.Split('_');

                       if (!string.IsNullOrEmpty(picId[1]))
                       {
                           objectId = picId[1];
                       }
                   }
               }

               if (!string.IsNullOrEmpty(objectId))
               {
                  int n;

                  // check objectId is numeric
                  if (!image.Contains("safe_image.php") && int.TryParse(objectId, out n)) 
                  {
                      image = string.Format("https://graph.facebook.com/{0}/picture?type=normal", objectId);
                  }
               }

               var entry = new SocialStreamFacebookEntry
                               {
                                   PageName = page.Body.Name,
                                   PageLink = page.Body.Link,
                                   Link = post.Link,
                                   Content = message,
                                   Thumb = image,
                                   PublishedDate = post.CreatedTime.ToString("F")
                               };

               socialStreamFacebook.ResponseData.Feed.Entries.Add(entry);
           }

           var json = JsonConvert.SerializeObject(socialStreamFacebook, Formatting.None, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });

            return new HttpResponseMessage()
            {
                Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json")
            };
        }
    }
}