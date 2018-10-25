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
    public class BusinessManagementController : SurfaceController
    {
        [ValidateInput(false)]
        [HttpPost]
        public ActionResult SubmitForm(BusinessManagementModel business)
        {
            DataHelper validate = new DataHelper();
            var response = Request["g-recaptcha-response"];
            if (validate.GoogleCaptchaValidate(response))
            {
                try
                {
                    if (business.addressTwo == null)
                    {
                        business.addressTwo = "";
                    }
                    if (business.cntComments == null)
                    {
                        business.cntComments = "";
                    }


                    

                    if (business.AdminEmail > 0 || business.ConfirmationEmail >= 0)
                    {

                        List<PerplexMail.EmailTag> listoftags = new List<PerplexMail.EmailTag>();
                        listoftags.Add(new PerplexMail.EmailTag("[#Department#]", business.department));
                        listoftags.Add(new PerplexMail.EmailTag("[#Employee#]", business.employee));
                        listoftags.Add(new PerplexMail.EmailTag("[#FirstName#]", business.firstName));
                        listoftags.Add(new PerplexMail.EmailTag("[#LastName#]", business.lastName));
                        listoftags.Add(new PerplexMail.EmailTag("[#PhoneNo#]", business.cntTelePhone));
                        listoftags.Add(new PerplexMail.EmailTag("[#Email#]", business.cntEmail));
                        listoftags.Add(new PerplexMail.EmailTag("[#AddressOne#]", business.addressOne));
                        listoftags.Add(new PerplexMail.EmailTag("[#AddressTwo#]", business.addressTwo));
                        listoftags.Add(new PerplexMail.EmailTag("[#City#]", business.city));
                        listoftags.Add(new PerplexMail.EmailTag("[#State#]", business.state));
                        listoftags.Add(new PerplexMail.EmailTag("[#Zip#]", business.zip));
                        listoftags.Add(new PerplexMail.EmailTag("[#Country#]", business.country));
                        
                        listoftags.Add(new PerplexMail.EmailTag("[#Message#]", business.cntComments));


                        //listoftags.Add(new PerplexMail.EmailTag("[#AreaofInterest#]", (string.IsNullOrEmpty(contact.AreaofInterest) ? string.Empty : contact.AreaofInterest)));
                        //listoftags.Add(new PerplexMail.EmailTag("[#Description#]", (string.IsNullOrEmpty(contact.Description) ? string.Empty : contact.Description)));

                        if (business.AdminEmail > 0)
                        {
                            PerplexMail.Email.SendUmbracoEmail(business.AdminEmail, listoftags);
                        }

                        if (business.ConfirmationEmail >= 0)
                        {
                            listoftags.Add(new PerplexMail.EmailTag("[#To#]", business.cntEmail));
                            PerplexMail.Email.SendUmbracoEmail(business.ConfirmationEmail, listoftags);
                        }
                    }

                    ModelState.Clear();
                    ViewBag.businessSuccessMessage = "Thank you for contacting Manasquan Bank. Your message was sent successfully.";
                }
                catch (Exception ex)
                {
                    LogHelper.Error(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType, ex.Message, ex.InnerException);
                    ViewBag.businessErrorMessage = "There is some problem, please try again later";
                }
            }
            else
            {
                ViewBag.businessErrorMessage = "We're sorry, an recaptcha error has occured, please reload the page and try again";
            }

            return CurrentUmbracoPage();
        }
    }
}