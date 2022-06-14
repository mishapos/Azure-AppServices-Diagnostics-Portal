using Microsoft.Extensions.Configuration;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;
using System.Threading;

namespace AppServiceDiagTest
{
    [TestClass]
    public class AppServiceDiagTest
    {
        private IWebDriver driver;
        private IConfiguration config;

        AppServiceDiagTest()
        {
            //var builder = new ConfigurationBuilder().;
        }

        [TestMethod]
        public void TestMethod()
        {
            TestDiagPortal();
        }


        [TestInitialize()]
        public void SetupTest()
        {
            var option = new ChromeOptions();
            //option.AddExtension("D:/Azure-AppServices-Diagnostics-Portal/AppServiceDiagTest/AppServiceDiagTest/extension/windows10.crx");
            driver = new ChromeDriver(option);
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(1);
        }

        private void LogIn()
        {
            //var email = "applensuitest@microsoft.com";
            var email = "xiaoxhu@microsoft.com";
            driver.FindElement(By.Id("i0116")).SendKeys(email);
            driver.FindElement(By.Id("i0116"),10).SendKeys(Keys.Enter);
        }

        private void TestDiagPortal()
        {
            string url = "https://ms.portal.azure.com/#@microsoft.onmicrosoft.com/resource/subscriptions/5abde51d-cc72-4bcc-b0d7-3c86b4db2a7c/resourceGroups/demo-rg/providers/Microsoft.Web/sites/ShekharDemoApp/troubleshoot";
            driver.Navigate().GoToUrl(url);
            LogIn();
            //2FA
            Thread.Sleep(1000 * 30);

            var currentIframe = GetIframeElement(0);
            driver.SwitchTo().Frame(currentIframe);

            //Test Risk Alert
            driver.FindElement(By.CssSelector(".risk-tile")).Click();
            Assert.IsTrue(driver.FindElement(By.CssSelector("notification-rendering")).Displayed,"Risk Alert Test");

            //Test avi&perf
            driver.FindElement(By.XPath("//h3[text()='Availability and Performance']")).Click();
            Thread.Sleep(5000);
            currentIframe = GetIframeElement(1);
            driver.SwitchTo().Frame(currentIframe);
            //Click Web App down side-nav
            driver.FindElement(By.XPath("//span[text()='Web App Down']")).Click();
            Assert.IsTrue(driver.FindElement(By.CssSelector("")).Displayed, "Web App down Test");
            Thread.Sleep(1000 * 20);
            driver.FindElement(By.XPath("//fab-link/button[text()='View details']")).Click();
        }

        private void TestCaseSubmission()
        {
            string url = "https://ms.portal.azure.com/#@microsoft.onmicrosoft.com/resource/subscriptions/1402be24-4f35-4ab7-a212-2cd496ebdf14/resourceGroups/Default-Web-WestUS/providers/Microsoft.Web/sites/buggyapp/supportrequest";
            driver.Navigate().GoToUrl(url);
            //Thread.Sleep(500);
            LogIn();
        }

        private IWebElement GetIframeElement(int index = 0)
        {
            driver.SwitchTo().ParentFrame();
            var iframes = driver.FindElements(By.CssSelector("iframe.fxs-part-frame"));
            int i = 0;
            IWebElement currentIframe = iframes.GetEnumerator().Current;
            foreach(var iframe in iframes)
            {
                currentIframe = iframe;
                if (i == index) break;
                i++;
            }
            return currentIframe;
        }
    }

    public static class WebDriverExtensions
    {
        public static IWebElement FindElement(this IWebDriver driver, By by, int timeoutInSeconds)
        {
            if (timeoutInSeconds > 0)
            {
                var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(timeoutInSeconds));
                return wait.Until(drv => drv.FindElement(by));
            }
            return driver.FindElement(by);
        }
    }
}
