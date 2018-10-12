namespace ManasquanBank.Web.Controllers
{
    using System.Collections.Generic;

    public class SocialStreamFacebookFeed
    {
        public string Link { get; set; }

        public List<SocialStreamFacebookEntry> Entries { get; set; }
    }
}