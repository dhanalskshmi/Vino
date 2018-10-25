using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ConnecticutRegionalWater.Web.Models
{
    public class SearchResult
    {
        public string Title { get; set; }

        public string Snippet { get; set; }

        public string DisplayUrl { get; set; }

        public string Url { get; set; }
    }
}