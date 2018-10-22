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
    public class ContactUsController : SurfaceController
    {
        [ValidateInput(false)]
        [HttpPost]
        public ActionResult SubmitForm(ContactUsModel contact)
        {
            DataHelper validate = new DataHelper();
            var response = Request["g-recaptcha-response"];
            if (validate.GoogleCaptchaValidate(response))
            {
                try
            {
                if (contact.AdminEmail > 0 || contact.ConfirmationEmail >= 0)
                {
                    string AOI = "";
                    if (contact.checkboxs != null)
                    {
                        int length = contact.checkboxs.Length;
                        if (length > 0)
                        {
                            for (int i = 0; i < length; i++)
                            {
                                if (i == 0)
                                {
                                    AOI += contact.checkboxs[i];
                                }
                                else
                                {
                                    AOI += ", " + contact.checkboxs[i];
                                }
                            }
                        }
                    }

                    List<PerplexMail.EmailTag> listoftags = new List<PerplexMail.EmailTag>();
                    listoftags.Add(new PerplexMail.EmailTag("[#FirstName#]", contact.firstName));
                    listoftags.Add(new PerplexMail.EmailTag("[#LastName#]", contact.lastName));
                    listoftags.Add(new PerplexMail.EmailTag("[#Phone#]", contact.cntTelePhone));
                    listoftags.Add(new PerplexMail.EmailTag("[#Email#]", contact.cntEmail));
                    listoftags.Add(new PerplexMail.EmailTag("[#Comments#]", contact.cntComments));
                    listoftags.Add(new PerplexMail.EmailTag("[#AreaofInterest#]", AOI));

                    //listoftags.Add(new PerplexMail.EmailTag("[#AreaofInterest#]", (string.IsNullOrEmpty(contact.AreaofInterest) ? string.Empty : contact.AreaofInterest)));
                    //listoftags.Add(new PerplexMail.EmailTag("[#Description#]", (string.IsNullOrEmpty(contact.Description) ? string.Empty : contact.Description)));

                    if (contact.AdminEmail > 0)
                    {
                        PerplexMail.Email.SendUmbracoEmail(contact.AdminEmail, listoftags);
                    }

                    if (contact.ConfirmationEmail >= 0)
                    {
                        listoftags.Add(new PerplexMail.EmailTag("[#To#]", contact.cntEmail));
                        PerplexMail.Email.SendUmbracoEmail(contact.ConfirmationEmail, listoftags);
                    }
                }

                ModelState.Clear();
                ViewBag.SuccessMessage = "Thank you for contacting Manasquan Bank. Your message was sent successfully.";
            }
            catch (Exception ex)
            {
                LogHelper.Error(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType, ex.Message, ex.InnerException);
                ViewBag.ErrorMessage = "There is some problem, please try again later";
            }
            }
            else
            {
                ViewBag.ErrorMessage = "We're sorry, an recaptcha error has occured, please reload the page and try again";
            }

            return CurrentUmbracoPage();
        }
    }
}