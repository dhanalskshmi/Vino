using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ManasquanBank.Web.Models
{
    public class ReOrderCheckModel
    {
        [Required]
        public string firstName { get; set; }

        [Required]
        public string lastName { get; set; }

        [Required]
        public string accNo { get; set; }

        [Required]
        public string cntTelePhone { get; set; }

        [EmailAddress]
        public string cntEmail { get; set; }

        [Required]
        public string addressOne { get; set; }

        
        public string addressTwo { get; set; }

        [Required]
        public string city { get; set; }

        [Required]
        public string state { get; set; }

        [Required]
        public string zip { get; set; }

       
        public string country { get; set; }
        
        public int AdminEmail { get; set; }

        public int ConfirmationEmail { get; set; }

    }
}