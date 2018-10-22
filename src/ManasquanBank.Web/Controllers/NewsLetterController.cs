using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Umbraco.Core.Logging;
using Umbraco.Web.Mvc;
using ManasquanBank.Web.Models;
using ManasquanBank.Web.Helpers;
namespace ManasquanBank.Web.Controllers
{
    public class NewsLetterController : SurfaceController
    {
        // GET: NewsLetter
        [ValidateInput(false)]
        [HttpPost]
        public ActionResult SubmitForm(NewsLetterModel detail)
        {
            DataHelper validate = new DataHelper();
            var response = Request["g-recaptcha-response"];
            if (validate.GoogleCaptchaValidate(response))
            {
                try
            {
                if (detail.NewsAdminEmail > 0 || detail.NewsConfirmationEmail >= 0)
                {
                    string AOI = "";
                        if (detail.newsLetterCheckboxs != null)
                        {
                            int length = detail.newsLetterCheckboxs.Length;
                            if (length > 0)
                            {
                                for (int i = 0; i < length; i++)
                                {
                                    if (i == 0)
                                    {
                                        AOI += detail.newsLetterCheckboxs[i];
                                    }
                                    else
                                    {
                                        AOI += ", " + detail.newsLetterCheckboxs[i];
                                    }
                                }
                            }
                        }

                    List<PerplexMail.EmailTag> listoftags = new List<PerplexMail.EmailTag>();
                    listoftags.Add(new PerplexMail.EmailTag("[#FirstName#]", detail.newsLetterFirstName));
                    listoftags.Add(new PerplexMail.EmailTag("[#LastName#]", detail.newsLetterLastName));
                    listoftags.Add(new PerplexMail.EmailTag("[#Email#]", detail.newsLetteremail));

                    listoftags.Add(new PerplexMail.EmailTag("[#AreaofInterest#]", AOI));

                    //listoftags.Add(new PerplexMail.EmailTag("[#AreaofInterest#]", (string.IsNullOrEmpty(contact.AreaofInterest) ? string.Empty : contact.AreaofInterest)));
                    //listoftags.Add(new PerplexMail.EmailTag("[#Description#]", (string.IsNullOrEmpty(contact.Description) ? string.Empty : contact.Description)));

                    if (detail.NewsAdminEmail > 0)
                    {
                        PerplexMail.Email.SendUmbracoEmail(detail.NewsAdminEmail, listoftags);
                    }

                    if (detail.NewsConfirmationEmail >= 0)
                    {
                        listoftags.Add(new PerplexMail.EmailTag("[#To#]", detail.newsLetteremail));
                        PerplexMail.Email.SendUmbracoEmail(detail.NewsConfirmationEmail, listoftags);
                    }
                }

                ModelState.Clear();
                ViewBag.JoinSuccessMessage = "Thank you for contacting Manasquan Bank. Your message was sent successfully.";
            }
            catch (Exception ex)
            {
                LogHelper.Error(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType, ex.Message, ex.InnerException);
                ViewBag.JoinErrorMessage = "There is some problem, please try again later";
            }
            }
            else
            {
                ViewBag.JoinErrorMessage = "We're sorry, an recaptcha error has occured, please reload the page and try again";
            }

            return CurrentUmbracoPage();
        }
    }
}