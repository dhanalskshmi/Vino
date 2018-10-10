using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Web.Configuration;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Newtonsoft.Json.Linq;
using Umbraco.Core.Logging;
using Umbraco.Web.Mvc;
using ManasquanBank.Web.Models;
namespace ManasquanBank.Web.Helpers
{
    public class DataHelper
    {
            public bool GoogleCaptchaValidate(string response)
            {
                bool valid = false;
                string secretKey = System.Configuration.ConfigurationManager.AppSettings["recaptchaPrivateKey"];
                HttpWebRequest req = (HttpWebRequest)WebRequest.Create("https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + response);
                try
                {
                    using (WebResponse wResponse = req.GetResponse())
                    {
                        using (StreamReader readStream = new StreamReader(wResponse.GetResponseStream()))
                        {
                            string jsonResponse = readStream.ReadToEnd();
                            JavaScriptSerializer js = new JavaScriptSerializer();
                            RecaptchaResponse data = js.Deserialize<RecaptchaResponse>(jsonResponse);
                            valid = Convert.ToBoolean(data.Success);
                        }
                    }

                    return valid;
                }
                catch (WebException ex)
                {
                    throw ex;
                }
            }
        }
}