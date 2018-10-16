using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ManasquanBank.Web.Models
{
    public class NewsLetterModel
    {
        [Required]
        public string newsLetterFirstName { get; set; }

        [Required]
        public string newsLetterLastName { get; set; }

        [Required]
        public string newsLetteremail { get; set; }

        public string[] newsLetterCheckboxs { get; set; }

        public int NewsAdminEmail { get; set; }

        public int NewsConfirmationEmail { get; set; }

    }
}