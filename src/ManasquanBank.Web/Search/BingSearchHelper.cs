// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.
// Microsoft Cognitive Services: http://www.microsoft.com/cognitive
// Microsoft Cognitive Services Github:
// https://github.com/Microsoft/Cognitive 
// Copyright (c) Microsoft Corporation
// All rights reserved. 
// MIT License:
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED ""AS IS"", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using ConnecticutRegionalWater.Web.Models;
using Newtonsoft.Json.Linq;

namespace ServiceHelpers
{
    public class BingSearchHelper
    {
        private static string imageSearchEndPoint = "https://api.cognitive.microsoft.com/bing/v5.0/images/search";
        private static string autoSuggestionEndPoint = "https://api.cognitive.microsoft.com/bing/v5.0/suggestions";
        private static string webSearchEndPoint = "https://api.cognitive.microsoft.com/bing/v5.0/search";
        private static string newsSearchEndPoint = "https://api.cognitive.microsoft.com/bing/v5.0/news/search";
        private string autoSuggestionApiKey;
        private string searchApiKey;

        private HttpClient AutoSuggestionClient { get; set; }

        private HttpClient SearchClient { get; set; }

        public string AutoSuggestionApiKey
        {
            get
            {
                return autoSuggestionApiKey;
            }

            set
            {
                var changed = autoSuggestionApiKey != value;
                autoSuggestionApiKey = value;
                if (changed)
                {
                    InitializeBingClients();
                }
            }
        }

        public string SearchApiKey
        {
            get
            {
                return searchApiKey;
            }

            set
            {
                var changed = searchApiKey != value;
                searchApiKey = value;
                if (changed)
                {
                    InitializeBingClients();
                }
            }
        }

        private void InitializeBingClients()
        {
            AutoSuggestionClient = new HttpClient();
            AutoSuggestionClient.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", AutoSuggestionApiKey);

            SearchClient = new HttpClient();
            SearchClient.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", SearchApiKey);
        }

        public async Task<IEnumerable<string>> GetImageSearchResults(string query, string imageContent = "Face", int count = 7, int offset = 0)
        {
            List<string> urls = new List<string>();

            var result = await SearchClient.GetAsync(string.Format("{0}?q={1}&safeSearch=Strict&imageType=Photo&color=ColorOnly&count={2}&offset={3}{4}", imageSearchEndPoint, WebUtility.UrlEncode(query), count, offset, string.IsNullOrEmpty(imageContent) ? string.Empty : "&imageContent=" + imageContent));
            result.EnsureSuccessStatusCode();
            var json = await result.Content.ReadAsStringAsync();
            dynamic data = JObject.Parse(json);
            if (data.value != null && data.value.Count > 0)
            {
                for (int i = 0; i < data.value.Count; i++)
                {
                    urls.Add(data.value[i].contentUrl.Value);
                }
            }

            return urls;
        }

        public Search GetSearchResults(string query, string market = "en-US", int count = 7, int offset = 0)
        {
            var search = new Search { SearchResults = new List<SearchResult>() };

            var result = SearchClient.GetAsync(string.Format("{0}?q={1}&mkt={2}&safeSearch=Strict&count={3}&offset={4}", webSearchEndPoint, WebUtility.UrlEncode(query), market, count, offset)).Result;
            result.EnsureSuccessStatusCode();
            var json = result.Content.ReadAsStringAsync().Result;
            dynamic data = JObject.Parse(json);
            if (data.webPages != null)
            {
                search.Count = data.webPages.totalEstimatedMatches;

                for (int i = 0; i < data.webPages.value.Count; i++)
                {
                    search.SearchResults.Add(new SearchResult
                    {
                        Title = data.webPages.value[i].name,
                        DisplayUrl = data.webPages.value[i].displayUrl,
                        Url = data.webPages.value[i].url,
                        Snippet = data.webPages.value[i].snippet
                    });
                }
            }

            return search;
        }

        public async Task<IEnumerable<string>> GetAutoSuggestResults(string query, string market = "en-US")
        {
            List<string> suggestions = new List<string>();

            var result = await AutoSuggestionClient.GetAsync(string.Format("{0}/?q={1}&mkt={2}", autoSuggestionEndPoint, WebUtility.UrlEncode(query), market));
            result.EnsureSuccessStatusCode();
            var json = await result.Content.ReadAsStringAsync();
            dynamic data = JObject.Parse(json);
            if (data.suggestionGroups != null && data.suggestionGroups.Count > 0 &&
                data.suggestionGroups[0].searchSuggestions != null)
            {
                for (int i = 0; i < data.suggestionGroups[0].searchSuggestions.Count; i++)
                {
                    suggestions.Add(data.suggestionGroups[0].searchSuggestions[i].displayText.Value);
                }
            }

            return suggestions;
        }
    }
}