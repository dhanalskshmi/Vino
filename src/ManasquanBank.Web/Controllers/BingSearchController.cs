using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ConnecticutRegionalWater.Web.Models;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using Umbraco.Web.Mvc;

namespace ConnecticutRegionalWater.Web.Controllers
{
    using System.Threading.Tasks;
    using ServiceHelpers;

    public class BingSearchController : SurfaceController
    {
        // GET: BingSearchSurface
        public ActionResult Index(string searchApiKey, string searchResultsUrl)
        {
            var query = Request.QueryString["q"];
            var offset = 0;

            if (Request.QueryString.AllKeys.Contains("page"))
            {
                int.TryParse(Request.QueryString["page"], out offset);
            }

            var bingSearcher = new BingSearchHelper { SearchApiKey = searchApiKey };

            var search = bingSearcher.GetSearchResults(query + " site:" + searchResultsUrl, offset: offset);

            search.Query = query;
            search.Page = offset;

            return PartialView("SearchResults", search);
        }
    }
}