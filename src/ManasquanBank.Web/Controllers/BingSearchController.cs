using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Umbraco.Web.Mvc;


namespace ManasquanBank.Web.Controllers
{
    using System.Threading.Tasks;
    using ServiceHelpers;
    public class BingSearchController : SurfaceController
    {
        // GET: BingSearchSurface
        public ActionResult Index()
        {
            var query = Request.QueryString["q"];
            var offset = 0;

            if (Request.QueryString.AllKeys.Contains("page"))
            {
                int.TryParse(Request.QueryString["page"], out offset);
            }

            var bingSearcher = new BingSearchHelper { SearchApiKey = ConfigurationManager.AppSettings["SearchApiKey"] };

            var search = bingSearcher.GetSearchResults(query + " site:"+ConfigurationManager.AppSettings["SearchResultsUrl"], offset: offset);

            search.Query = query;
            search.Page = offset;

            return PartialView("SearchResults", search);
        }
    }
}