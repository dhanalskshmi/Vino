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
    public class RequestConsultationsController : SurfaceController
    {
        [ValidateInput(false)]
        [HttpPost]
        public ActionResult SubmitForm(RequestConsultationModel request)
        {
            DataHelper validate = new DataHelper();
            var response = Request["g-recaptcha-response"];
            if (validate.GoogleCaptchaValidate(response))
            {
                try
                {
                    if (request.addressTwo == null)
                    {
                        request.addressTwo = "";
                    }
                    if (request.call == null)
                    {
                        request.call = "";
                    }
                    if (request.cntComments == null)
                    {
                        request.cntComments = "";
                    }

                    if (request.AdminEmail > 0 || request.ConfirmationEmail >= 0)
                    {

                        List<PerplexMail.EmailTag> listoftags = new List<PerplexMail.EmailTag>();
                        listoftags.Add(new PerplexMail.EmailTag("[#PurposeLoan#]", request.loanPurpose));
                        listoftags.Add(new PerplexMail.EmailTag("[#LoanOfficer#]", request.loanOfficer));
                        listoftags.Add(new PerplexMail.EmailTag("[#FirstName#]", request.firstName));
                        listoftags.Add(new PerplexMail.EmailTag("[#LastName#]", request.lastName));
                        listoftags.Add(new PerplexMail.EmailTag("[#PhoneNo#]", request.cntTelePhone));
                        listoftags.Add(new PerplexMail.EmailTag("[#Email#]", request.cntEmail));
                        listoftags.Add(new PerplexMail.EmailTag("[#AddressOne#]", request.addressOne));
                        listoftags.Add(new PerplexMail.EmailTag("[#AddressTwo#]", request.addressTwo));
                        listoftags.Add(new PerplexMail.EmailTag("[#City#]", request.city));
                        listoftags.Add(new PerplexMail.EmailTag("[#State#]", request.state));
                        listoftags.Add(new PerplexMail.EmailTag("[#Zip#]", request.zip));
                        listoftags.Add(new PerplexMail.EmailTag("[#Country#]", request.country));
                        listoftags.Add(new PerplexMail.EmailTag("[#TimeCall#]", request.call));
                        listoftags.Add(new PerplexMail.EmailTag("[#Message#]", request.cntComments));


                        //listoftags.Add(new PerplexMail.EmailTag("[#AreaofInterest#]", (string.IsNullOrEmpty(contact.AreaofInterest) ? string.Empty : contact.AreaofInterest)));
                        //listoftags.Add(new PerplexMail.EmailTag("[#Description#]", (string.IsNullOrEmpty(contact.Description) ? string.Empty : contact.Description)));

                        if (request.AdminEmail > 0)
                        {
                            PerplexMail.Email.SendUmbracoEmail(request.AdminEmail, listoftags);
                        }

                        if (request.ConfirmationEmail >= 0)
                        {
                            listoftags.Add(new PerplexMail.EmailTag("[#To#]", request.cntEmail));
                            PerplexMail.Email.SendUmbracoEmail(request.ConfirmationEmail, listoftags);
                        }
                    }

                    ModelState.Clear();
                    ViewBag.requestSuccessMessage = "Thank you for contacting Manasquan Bank. Your message was sent successfully.";
                }
                catch (Exception ex)
                {
                    LogHelper.Error(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType, ex.Message, ex.InnerException);
                    ViewBag.requestErrorMessage = "There is some problem, please try again later";
                }
            }
            else
            {
                ViewBag.requestErrorMessage = "We're sorry, an recaptcha error has occured, please reload the page and try again";
            }

            return CurrentUmbracoPage();
        }
    }
}