using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ManasquanBank.Web.Models
{
    public class ContactUsModel
    {
        [Required]
        public string firstName { get; set; }

        [Required]
        public string lastName { get; set; }

        [Required]
        public string cntTelePhone { get; set; }

        [EmailAddress]
        public string cntEmail { get; set; }

        public string cntComments { get; set; }

        public string[] checkboxs { get; set; }

        public int AdminEmail { get; set; }

        public int ConfirmationEmail { get; set; }
    }
    //public class SelectListItem
    //{
    //    public bool checkbox1 { get; set; }
    //    public bool checkbox2 { get; set; }
    //    public bool checkbox3 { get; set; }
    //    public bool checkbox4 { get; set; }
    //    public bool checkbox5 { get; set; }
    //    public bool checkbox6 { get; set; }
    //}
}