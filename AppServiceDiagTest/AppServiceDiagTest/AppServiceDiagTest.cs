using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Threading;

namespace AppServiceDiagTest
{
    [TestClass]
    public class AppServiceDiagTest
    {
        private IWebDriver driver;
        [TestMethod]
        public void TestMethod()
        {
            string url = "https://ms.portal.azure.com/#@microsoft.onmicrosoft.com/resource/subscriptions/1402be24-4f35-4ab7-a212-2cd496ebdf14/resourceGroups/Default-Web-WestUS/providers/Microsoft.Web/sites/buggyapp/supportrequest";
            driver.Navigate().GoToUrl(url);
            //Thread.Sleep(500);
            LogIn();
        }


        [TestInitialize()]
        public void SetupTest()
        {
            driver = new ChromeDriver();
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(1);
        }

        private void LogIn()
        {
            var email = "xiaoxhu@microsoft.com";
            driver.FindElement(By.Id("i0116")).SendKeys(email);
            driver.FindElement(By.Id("i0116")).SendKeys(Keys.Enter);
            //driver.FindElement(By.CssSelector())
        }
    }
}
