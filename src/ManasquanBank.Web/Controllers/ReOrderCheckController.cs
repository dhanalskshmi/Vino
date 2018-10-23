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
    public class ReOrderCheckController : SurfaceController
    {
        // GET: ReOrderCheck
        [ValidateInput(false)]
        [HttpPost]
        public ActionResult SubmitForm(ReOrderCheckModel reOrder)
        {
            DataHelper validate = new DataHelper();
            var response = Request["g-recaptcha-response"];
            if (validate.GoogleCaptchaValidate(response))
            {
                try
                {
                    if(reOrder.addressTwo == null)
                    {
                         reOrder.addressTwo = "";
                    }
                    
                    if (reOrder.AdminEmail > 0 || reOrder.ConfirmationEmail >= 0)
                    {
                        
                        List<PerplexMail.EmailTag> listoftags = new List<PerplexMail.EmailTag>();
                        listoftags.Add(new PerplexMail.EmailTag("[#FirstName#]", reOrder.firstName));
                        listoftags.Add(new PerplexMail.EmailTag("[#LastName#]", reOrder.lastName));
                        listoftags.Add(new PerplexMail.EmailTag("[#AccountNo#]", reOrder.accNo));
                        listoftags.Add(new PerplexMail.EmailTag("[#PhoneNo#]", reOrder.cntTelePhone));
                        listoftags.Add(new PerplexMail.EmailTag("[#Email#]", reOrder.cntEmail));
                        listoftags.Add(new PerplexMail.EmailTag("[#AddressOne#]", reOrder.addressOne));
                        listoftags.Add(new PerplexMail.EmailTag("[#AddressTwo#]", reOrder.addressTwo));
                        listoftags.Add(new PerplexMail.EmailTag("[#City#]", reOrder.city));
                        listoftags.Add(new PerplexMail.EmailTag("[#State#]", reOrder.state));
                        listoftags.Add(new PerplexMail.EmailTag("[#Zip#]", reOrder.zip));
                        listoftags.Add(new PerplexMail.EmailTag("[#Country#]", reOrder.country));
                       

                    //listoftags.Add(new PerplexMail.EmailTag("[#AreaofInterest#]", (string.IsNullOrEmpty(contact.AreaofInterest) ? string.Empty : contact.AreaofInterest)));
                    //listoftags.Add(new PerplexMail.EmailTag("[#Description#]", (string.IsNullOrEmpty(contact.Description) ? string.Empty : contact.Description)));

                    if (reOrder.AdminEmail > 0)
                        {
                            PerplexMail.Email.SendUmbracoEmail(reOrder.AdminEmail, listoftags);
                        }

                        if (reOrder.ConfirmationEmail >= 0)
                        {
                            listoftags.Add(new PerplexMail.EmailTag("[#To#]", reOrder.cntEmail));
                            PerplexMail.Email.SendUmbracoEmail(reOrder.ConfirmationEmail, listoftags);
                        }
                    }

                    ModelState.Clear();
                    ViewBag.ReOrderCheckSuccessMessage = "Thank you for contacting Manasquan Bank. Your message was sent successfully.";
                }
                catch (Exception ex)
                {
                    LogHelper.Error(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType, ex.Message, ex.InnerException);
                    ViewBag.ReOrderCheckErrorMessage = "There is some problem, please try again later";
                }
            }
            else
            {
                ViewBag.ReOrderCheckErrorMessage = "We're sorry, an recaptcha error has occured, please reload the page and try again";
            }

            return CurrentUmbracoPage();
        }
    }
}