using Microsoft.Extensions.Configuration;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;
using System.IO;
using System.Threading;
using Xunit;

namespace AppServiceDiagPortalTest
{
    public class AppServiceDiagTest : IDisposable
    {
        private IWebDriver Driver;
        private IConfiguration Config { get; }
        private string ResourceUri = "";
        private string Email = "";
        private string Password = "";
        private string Slot = "";
        private string Region = "";
        public AppServiceDiagTest()
        {
            var builder = new ConfigurationBuilder()
               .SetBasePath(Directory.GetCurrentDirectory())
               .AddJsonFile("appsettings.test.json", optional: false, reloadOnChange: true)
               .AddEnvironmentVariables();

            Config = builder.Build();

            Email = Config["Email"];
            Password = Config["Password"];
            ResourceUri = Config["ResourceUri"];

            Slot = Environment.GetEnvironmentVariable("Slot");
            Region = Environment.GetEnvironmentVariable("Region");


            SetupTest();
        }

        public void Dispose()
        {
            //Driver.Quit();
        }

        [Fact]
        public void TestMethod()
        {
            //TestDiagPortal();
            TestCaseSubmission();
        }

        private void SetupTest()
        {
            var option = new ChromeOptions();
            var path = $"{Directory.GetCurrentDirectory()}\\windows10.crx";
            option.AddExtension(path);
            Driver = new ChromeDriver(option);
            Driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(2);
        }

        private void LogIn()
        {
            try
            {
                Driver.FindElement(By.Id("i0116")).SendKeys(Email);
                Driver.FindElement(By.Id("i0116")).SendKeys(Keys.Enter);
                Thread.Sleep(1000 * 10);

                Driver.FindElement(By.XPath("//span[text()='Password']")).Click();
                Thread.Sleep(500);
                Driver.FindElement(By.Id("passwordInput")).SendKeys(Password);
                Driver.FindElement(By.Id("submitButton")).Click();
            }
            catch (Exception e)
            {

            }


        }

        private void TestDiagPortal()
        {
            string url = $"https://ms.portal.azure.com/#@microsoft.onmicrosoft.com/resource{ResourceUri}/troubleshoot";
            Driver.Navigate().GoToUrl(url);
            LogIn();
            //2FA
            Thread.Sleep(1000 * 30);

            var currentIframe = GetIframeElement(0);
            Driver.SwitchTo().Frame(currentIframe);

            //Test Risk Alert
            Driver.FindElement(By.CssSelector(".risk-tile")).Click();
            Assert.True(Driver.FindElement(By.CssSelector("detector-view")).Displayed, "Risk Alert Test");

            //Test avi&perf
            Driver.FindElement(By.XPath("//h3[text()='Availability and Performance']")).Click();
            Thread.Sleep(1000 * 5);
            currentIframe = GetIframeElement(1);
            Driver.SwitchTo().Frame(currentIframe);
            //Click Web App down side-nav
            Driver.FindElement(By.XPath("//span[text()='Web App Down']")).Click();
            Assert.True(Driver.FindElement(By.CssSelector("detector-view")).Displayed, "Web App down Test");
            Thread.Sleep(1000 * 20);
            Driver.FindElement(By.XPath("//fab-link/button[text()='View details']")).Click();
            Assert.True(Driver.FindElement(By.CssSelector("detector-view")).Displayed, "Detector Test");
        }

        private void TestCaseSubmission()
        {
            string url = $"https://ms.portal.azure.com/#@microsoft.onmicrosoft.com/resource{ResourceUri}/supportrequest";
            Driver.Navigate().GoToUrl(url);
            LogIn();
            SelectProblemTypeInCaseSubmission("Web app down or reporting errors");

            Thread.Sleep(1000 * 20);
            var currentIFrame = GetIframeElement(0);
            Driver.SwitchTo().Frame(currentIFrame);
            Assert.True(Driver.FindElement(By.CssSelector("detector-view"), 60).Displayed, "Case Submission Detector Displayed");
        }

        private IWebElement GetIframeElement(int index = 0)
        {
            Driver.SwitchTo().ParentFrame();
            var iframes = Driver.FindElements(By.CssSelector("iframe.fxs-part-frame:not(.fxs-extension-frame)"));
            int i = 0;
            IWebElement currentIframe = iframes.GetEnumerator().Current;
            foreach (var iframe in iframes)
            {
                currentIframe = iframe;
                if (i == index) break;
                i++;
            }
            return currentIframe;
        }

        private void SelectProblemTypeInCaseSubmission(string problemSubType)
        {
            //Wait until "select a problem type" dropdown rendered
            Driver.FindElement(By.XPath("//div[starts-with(text(),'Select a problem type')]"), 60);

            Driver.FindElement(By.XPath("//input[@placeholder='Briefly describe your issue']")).SendKeys("test");
            Driver.FindElement(By.XPath("//div[starts-with(text(),'Select a problem type')]")).Click();
            Driver.FindElement(By.XPath("//span[starts-with(text(),'Availability, Performance, and Application Issues')]")).Click();
            Driver.FindElement(By.XPath("//div[starts-with(text(),'Select a problem subtype')]")).Click();
            Driver.FindElement(By.XPath($"//span[starts-with(text(),'{problemSubType}')]")).Click();
            Driver.FindElement(By.XPath("//span[starts-with(text(),'Next')]")).Click();
        }
    }
}
