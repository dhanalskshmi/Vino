using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ConnecticutRegionalWater.Web.Models
{
    public class Search
    {
        public int Count { get; set; }

        public string Query { get; set; }

        public int Page { get; set; }

        public List<SearchResult> SearchResults { get; set; }
    }
}